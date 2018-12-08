const axios = require('axios');

axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_YELP_KEY

let getCategories = (req, res, next) => {
  let { userInput } = req.params

  axios.get(`https://api.yelp.com/v3/businesses/search?location=austin `)
    .then((response) => {
      // console.log(response.data);
      res.status(200).send(response.data)
    })
    .catch((error) => {
      res.status(500).send('Oop, Something have Happen unable to complete this request', error)
    });
}

let getListItems = (req, res, next) => {
  let { term, location } = req.body.userInput

  axios.get(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      res.status(500).send('Oop, Something have Happen unable to complete this request', error)
    });
}

let getPlaceInfo = (req, res, next) => {
  let { id } = req.params

  axios.get(`https://api.yelp.com/v3/businesses/${id}`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      res.status(500).send('Oop, Something have Happen unable to complete this request', error)
    });
}

let getPlaceReviews = (req, res, next) => {
  let { id } = req.params

  axios.get(`https://api.yelp.com/v3/businesses/${id}/reviews`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      res.status(500).send('Oop, Something have Happen unable to complete this request', error)
    });
}

let getRecommendPlace = (req, res, next) => {

  axios.get(`https://api.yelp.com/v3/businesses/search?location=${req.params.location}`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      res.status(500).send('Oop, Something have Happen unable to complete this request', error)
    });
}

let getEvent = (req, res, next) => {
  axios.get('https://api.yelp.com/v3/events')
    .then((response) => {
      // console.log(response.data)
      res.status(200).send(response.data)
    })
    .catch((error) => {
      res.status(500).send('Oop, Something have Happen unable to complete this request', error)
    });
}

let EventInfoData = []

let getEventInfoByID = (req, res, next) => {

  axios.get(`https://api.yelp.com/v3/events/${ req.params.id }`)
  .then((response) => {
    EventInfoData = response.data
    res.status(200).send(response.data)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request', error)
  });
}

let getSingleEventInfo = (req, res, next) => {
  res.status(200).send(EventInfoData)
}

module.exports = {
  getCategories,
  getListItems,
  getPlaceInfo,
  getPlaceReviews,
  getRecommendPlace,
  getEvent,
  getEventInfoByID,
  getSingleEventInfo,
}
