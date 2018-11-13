const axios = require('axios');
axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_YELP_KEY 

let getCategories = (req, res, next) => {
  // console.log(req.params);
  let { userInput } = req.params
  axios.get(`https://api.yelp.com/v3/autocomplete?text=${ userInput }`)
  .then((response) => {
    // console.log(response.data)
    res.status(200).send(response.data)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request', error)
    // console.log(error);
  });

}

let getListItems = (req, res, next) => {
  // console.log('req.body:', req.body);
  let { term, location } = req.body.userInput

  axios.get(`https://api.yelp.com/v3/businesses/search?term=${ term }&location=${ location }`)
  .then((response) => {
    // console.log(response.data)
    res.status(200).send(response.data)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request', error)
    // console.log(error);
  });

}



module.exports = {
  getCategories,
  getListItems
}
