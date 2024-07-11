const express = require('express');
const router = express.Router();

router.get('/places/:id/new_comment', (req, res) => {
  res.render('new_comment_form', { placeId: req.params.id });
});

module.exports = router;
