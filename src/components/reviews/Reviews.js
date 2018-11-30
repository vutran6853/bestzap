import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { postUserReview, getPlaceReview } from '../../duck/userDataReducer';
import rateImage from '../image/image';
import { Container,Row, Col } from 'reactstrap';


class Reviews extends Component {
  constructor(props) {
    super(props) 
    
    this.state = {
      reviews: [],
      text: '',
      rate: '',
    }
    this.postInitReview = this.postInitReview.bind(this);
    this.handleInputReview = this.handleInputReview.bind(this);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ reviews: this.props.data.reviews });
      this.postInitReview();
    }, 1000)
    
  }

  //// Post init review to DB from Yelp API
  postInitReview() {
    let { reviews } = this.state;
    let { id: placeID } = this.props.placeInfo
    let reviewsData = []

    let postReviewss = reviews.map((value, index) => {
      // console.log(`value`, value, 'index', index)
      reviewsData.push(value)
    });

    axios.post('/api/postInitReview', { reviewsData, placeID })
    .then((response) => {
      // console.log(response)
      return response
    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });
  }

  ////  User input and set on local state
  handleInputReview(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  ////  Submit user new review (postUserReview)
  ////  then get all review by placeID (getPlaceReview)
  handleSubmitReview() {
    let { text, rate, reviews } = this.state;
    let { id: placeID } = this.props.placeInfo

    this.props.postUserReview(text, rate, placeID)
    .then((response) => {
      this.setState({ text: '' })
      this.setState({ rate: '' })
      
      return response
    })
    .then((response) => {
      this.props.getPlaceReview(placeID)
      .then((response) => {
          this.setState({ reviews: response.value.data.map((value, index) => {
            return { place_id: value.place_id, 
                     rating: value.user_review_rate, 
                     text: value.user_review_text, 
                     time_created: value.user_review_time }
          }) 
        });
       });
    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });
  }

  render() {
    let { reviews } = this.state;

    let displayReviews = reviews.map((value, index) => {
      // console.log(`value`, value, 'index', index)
      return(
        <Container key={ value.id } className='displayReviewBox'>
          <p>Text: { value.text }</p>
          <p>Rate: { value.rating }</p>
          <img src={ rateImage(value.rating) } alt='rateImage'></img>
          <p>Date: { value.time_created }</p>
        </Container>
      )
    });
 
    

    return (
      <div>
        <div>
          { displayReviews }
        </div>
        <div>
          <input name='text' onChange={ (e) => this.handleInputReview(e) } placeholder='text' value={this.state.text}></input>
          <input name='rate' onChange={ (e) => this.handleInputReview(e) } placeholder='Rate' value={this.state.rate}></input>
          <button onClick={ () => this.handleSubmitReview() }>Submit</button>
        </div>
      </div>
    );
  }
}

function mapToPropsState(state) {
  return state;
}

export default connect(mapToPropsState, { postUserReview, getPlaceReview })(Reviews);


