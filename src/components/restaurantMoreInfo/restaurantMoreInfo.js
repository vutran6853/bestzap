import React, { Component } from 'react';

class RestaurantMoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    console.log(this.props.match.params);
    return (
      <div>
        <p>restaurant</p>
      </div>
    );
  }
}

export default RestaurantMoreInfo;