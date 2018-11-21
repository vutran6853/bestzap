import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { postUserReview, getPlaceReview } from '../../duck/userDataReducer';

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

  componentDidUpdate(prevProps, prevState) {
    console.log('prevState:', prevState);
    console.log('prevProps:', prevProps);
    console.log('this.state.reviews:', this.state.reviews);
      if(prevState.reviews !== this.state.reviews) {
        // this.props.getPlaceReview('1')
        console.log(true);
      } else {
        console.log(false)
      }

    
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

    // console.log('reviewsData:', reviewsData);

    axios.post('/api/postInitReview', { reviewsData, placeID })
    .then((response) => {
      // console.log(response)
    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });
  }

  //// User input and set on local state
  handleInputReview(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmitReview() {
    let { text, rate, reviews } = this.state;
    let { id: placeID } = this.props.placeInfo

    this.props.postUserReview(text, rate, placeID)
    .then((response) => {
      // console.log(response)
      reviews.push({ rating: response.value.data[0].user_review_rate, 
                     text:  response.value.data[0].user_review_text,
                     time_created:  response.value.data[0].user_review_time 
                  }) 
      console.log(reviews);
      this.setState({ text: '' })
      this.setState({ rate: '' })


    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });
  }

  render() {
    let { reviews } = this.state;
    console.log(this.state);

    let displayReviews = reviews.map((value, index) => {
      // console.log(`value`, value, 'index', index)
      return(
        <div key={ value.id }>
          <p>Text: { value.text }</p>
          <p>Rate: { value.rating }</p>
          <p>Date: { value.time_created }</p>
        </div>
      )
    });
 
    

    return (
      <div>
        { displayReviews }
        <input name='text' onChange={ (e) => this.handleInputReview(e) } placeholder='text' value={this.state.text}></input>
        <input name='rate' onChange={ (e) => this.handleInputReview(e) } placeholder='Rate' value={this.state.rate}></input>
        <button onClick={ () => this.handleSubmitReview() }>Submit</button>
      </div>
    );
  }
}

function mapToPropsState(state) {
  return state;
}

export default connect(mapToPropsState, { postUserReview, getPlaceReview })(Reviews);