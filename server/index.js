require('dotenv').config();
const express = require('express');
const cors = require('cors');
const massive = require('massive');
const { json } = require('body-parser');
const port = process.env.SERVER_PORT || 3002;
const app = express();

const { getCategories, getListItems, getPlaceInfo, getPlaceReviews, getRecommendPlace } = require('./controllers/searchData');
const { postInitReview, postUserReview, getPlaceReview } = require('./controllers/review');

app.use(cors());
app.use(json());

////  Massive connect to SQL system functionality
massive(process.env.CONNECTION_STRING)
.then(dbInstace => {
  // console.log(`copy of dbInstace`, dbInstace)
  app.set('db', dbInstace)
})
.catch(error => console.log('DANGER! : ', error));


//// Yelp API Endpoint
app.get('/api/getCategories/', getCategories)
app.post('/api/getList', getListItems)
app.get('/api/getPlaceInfo/:id', getPlaceInfo)
app.get('/api/getPlaceReviews/:id/reviews', getPlaceReviews)
app.get('/api/getRecommendPlace/:location', getRecommendPlace)

////  Reviews Endpoint
app.post('/api/postInitReview', postInitReview)
app.post('/api/postUserReview', postUserReview)
app.get('/api/placeReview/:id', getPlaceReview)

app.listen(port, () => {
  console.log(`Server is UP and listen to port: ${ port }`)
});