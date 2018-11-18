import React, { Component } from 'react';

class Reviews extends Component {
  constructor(props) {
    super(props) 
    
    this.state = {
      reviews: [],
    }
  }
  componentDidMount() {
    setTimeout(() => {
      let { reviews } = this.props.data;
      this.setState({ reviews: reviews })
    }, 1000)
    
  }

  displayReviews() {
   
   

  }

  render() {
    let { reviews } = this.state;

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
      </div>
    );
  }
}

export default Reviews;