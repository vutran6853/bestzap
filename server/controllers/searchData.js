const axios = require('axios');
axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_YELP_KEY 

let getCategories = (req, res, next) => {

  let { userInput } = req.params
  
  axios.get(`https://api.yelp.com/v3/autocomplete?text=${ userInput }`)
  .then((response) => {
    res.status(200).send(response.data)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request', error)
  });

}

let getListItems = (req, res, next) => {

  let { term, location } = req.body.userInput

  axios.get(`https://api.yelp.com/v3/businesses/search?term=${ term }&location=${ location }`)
  .then((response) => {
    res.status(200).send(response.data)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request', error)
  });

}

let getPlaceInfo = (req, res, next) => {

  let { id } = req.params
  
  axios.get(`https://api.yelp.com/v3/businesses/${ id }`)
  .then((response) => {
    res.status(200).send(response.data)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request', error)
  });
}

let getPlaceReviews = (req, res, next) => {

  let { id } = req.params
  
  axios.get(`https://api.yelp.com/v3/businesses/${ id }/reviews`)
  .then((response) => {
    res.status(200).send(response.data)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request', error)
  });
}

module.exports = {
  getCategories,
  getListItems,
  getPlaceInfo,
  getPlaceReviews,
}
