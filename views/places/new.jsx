const React = require('react');
const Def = require('../default');

function new_form(data) {
  // Calculate average rating
  let averageRating = 0;
  if (data.place.comments.length > 0) {
    let sumRatings = data.place.comments.reduce((tot, c) => {
      return tot + c.stars;
    }, 0);
    averageRating = sumRatings / data.place.comments.length;
  }

  return (
    <Def>
      <main>
        <h1>Add a New Place</h1>
        <form method="POST" action="/places">
          <div className="form-group">
            <label htmlFor="name">Place Name</label>
            <input className="form-control" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="pic">Place Picture</label>
            <input className="form-control" type="url" id="pic" name="pic" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input className="form-control" id="city" name="city" />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input className="form-control" id="state" name="state" />
          </div>
          <div className="form-group">
            <label htmlFor="cuisines">Cuisines</label>
            <input className="form-control" id="cuisines" name="cuisines" required />
          </div>
          <input className="btn btn-primary" type="submit" value="Add Place" />
        </form>

        {/* average rating */}
        <h2>Rating: {Math.round(averageRating)} stars</h2>
      </main>
    </Def>
  );
}

module.exports = new_form;