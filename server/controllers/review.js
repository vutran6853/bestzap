let postInitReview = (req, res, next) => {

  let dbInstance = req.app.get('db');
  let reviewsData = req.body.reviewsData;
  let placeID = req.body.placeID;

  for(let i = 0; i < reviewsData.length; i++) {

    dbInstance.post_reviews(placeID, reviewsData[i].id, reviewsData[i].rating, reviewsData[i].text, reviewsData[i].url)
    .then((response) => {
      // console.log(response)
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send('Oop, Something have Happen unable to complete this request')
      // console.log(error);  
    });
  }
}

let postUserReview = (req, res, next) => {
  let datePost = ''
  let dbInstance = req.app.get('db');

  dbInstance.post_user_review(req.body.placeID, req.body.rate, req.body.text, datePost)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request')
    // console.log(error);  
  });
}

let getPlaceReview = (req, res, next) => {
  
  let dbInstance = req.app.get('db');

  dbInstance.get_place_review(req.params.id)
  .then((response) => {
    // console.log(response);
    res.status(200).send(response)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request')
    // console.log(error);  
  });
}

module.exports = {
  postInitReview,
  postUserReview,
  getPlaceReview,
}