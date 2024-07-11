const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
    try {
        const places = await db.Place.find();
        res.render('places/index', { places });
    } catch (err) {
        console.error('Error fetching places:', err);
        res.status(500).render('error404');
    }
});
router.post('/', async (req, res) => {
    try {
        const { pic, city, state } = req.body;
        req.body.pic = pic || undefined;
        req.body.city = city || undefined;
        req.body.state = state || undefined;

        await db.Place.create(req.body);
        res.redirect('/places');
    } catch (err) {
        if (err.name === 'ValidationError') {
            let message = 'Validation Error: ';
            for (let field in err.errors) {
                message += `${field} was ${err.errors[field].value}. ${err.errors[field].message}\n`;
            }
            res.status(400).render('places/new', { message });
        } else {
            console.error('Error creating place:', err);
            res.status(500).render('error404');
        }
    }
});

router.get('/new', (req, res) => {
    res.render('places/new');
});

router.get('/:id', async (req, res) => {
    try {
        const place = await db.Place.findById(req.params.id).populate('comments');
        if (!place) throw new Error('Place not found');
        res.render('places/show', { place });
    } catch (err) {
        console.error('Error fetching place:', err);
        res.status(404).render('error404');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { pic, city, state } = req.body;
        req.body.pic = pic || 'http://placekitten.com/400/400';
        req.body.city = city || 'Anytown';
        req.body.state = state || 'USA';

        const place = await db.Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!place) throw new Error('Place not found');

        res.redirect(`/places/${req.params.id}`);
    } catch (err) {
        console.error('Error updating place:', err);
        res.status(404).render('error404');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.Place.findByIdAndDelete(req.params.id);
        res.redirect('/places');
    } catch (err) {
        console.error('Error deleting place:', err);
        res.status(404).render('error404');
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const place = await db.Place.findById(req.params.id);
        if (!place) throw new Error('Place not found');
        res.render('places/edit', { place });
    } catch (err) {
        console.error('Error fetching place for edit:', err);
        res.status(404).render('error404');
    }
});

router.post('/:id/comment', async (req, res) => {
    try {
        console.log(req.body); 

        req.body.author = req.body.author || undefined;
        req.body.rant = req.body.rant ? true : false; 

        const place = await db.Place.findById(req.params.id);
        if (!place) throw new Error('Place not found');

        const comment = await db.Comment.create(req.body); 
        place.comments.push(comment.id); 
        await place.save(); 

        res.redirect(`/places/${req.params.id}`); 
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).render('error404');
    }
});


router.delete('/:id/comment/:commentId', async (req, res) => {
    try {
        await db.Comment.findByIdAndDelete(req.params.commentId);
        res.redirect(`/places/${req.params.id}`);
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).render('error404');
    }
});

module.exports = router;
