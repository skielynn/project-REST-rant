const React = require('react');
const Def = require('../default');

function new_form(data) {

  let averageRating = 0;
  if (data.place.comments.length > 0) {
    let sumRatings = data.place.comments.reduce((tot, c) => {
      return tot + c.stars;
    }, 0);
    averageRating = Math.round(sumRatings / data.place.comments.length);
  }

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < averageRating; i++) {
      stars.push(<span key={i}>⭐️</span>);
    }
    return stars;
  };

  let ratingDisplay = (
    <h2>
      Rating: {renderStars()}
    </h2>
  );

  let message = '';
  if (data.message) {
    message = (
      <h4 className="alert-danger">
        {data.message}
      </h4>
    );
  }

  let comments = (
    <h3 className="inactive">
      No comments yet!
    </h3>
  );
  if (data.place.comments.length > 0) {
    comments = data.place.comments.map(c => (
      <div className="border" key={c._id}>
        <h2 className="rant">{c.rant ? 'Rant! 😡' : 'Rave! 😄'}</h2>
        <h4>{c.content}</h4>
        <h3>
          <strong>- {c.author}</strong>
        </h3>
        <h4>Rating: {c.stars}</h4>
      </div>
    ));
  }

  return (
    <Def>
      <main>
        <h1>Add a new place</h1>
        {message}
        <div className="row">
          <div className="col-sm-6">
            <img src={data.place.pic} alt={data.place.name} />
            <h3>
              Located in {data.place.city}, {data.place.state}
            </h3>
          </div>
          <div className="col-sm-6">
            {/* existing content */}
          </div>
        </div>
        <hr />
        {/* stars based on average rating */}
        {ratingDisplay}
        <h2>Comments</h2>
        {comments}
      </main>
    </Def>
  );
}

module.exports = new_form;
