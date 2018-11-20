import React, { Component } from 'react';
import axios from 'axios';

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

    // console.log('reviewsData:', reviewsData);

    axios.post('/api/postInitReview', { reviewsData, placeID })
    .then((response) => {
      // console.log(response)
    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });
  }

  //// User input set on local state
  handleInputReview(e) {
    this.setState({ [e.target.name]: e.target.value })
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
        <input name='text' onChange={ (e) => this.handleInputReview(e) } placeholder='text'></input>
        <input name='rate' onChange={ (e) => this.handleInputReview(e) } placeholder='Rate'></input>
      </div>
    );
  }
}

export default Reviews;