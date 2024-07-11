// seeders-comments.js
const db = require('../models');

async function seed() {
    try {
        let place = await db.Place.findOne({ name: 'H-Thai-ML' });

        if (!place) {
            console.log('Place not found');
            process.exit(1);
        }

        let comment = await db.Comment.create({
            author: 'Famished Fran',
            rant: false,
            stars: 5.0,
            content: 'Wow, simply amazing! Highly recommended!'
        });

        place.comments.push(comment.id);
        await place.save();

        console.log('Seed complete');
        process.exit();
    } catch (err) {
        console.error('Error seeding:', err);
        process.exit(1);
    }
}

seed();
