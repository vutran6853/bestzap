import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaceInfo } from '../../duck/categoriesListReducer';


class PlaceMoreInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      placeInfo: [],
    } 
  }

  componentDidMount() {
    this.props.getPlaceInfo(this.props.match.params.id)
    .then((response) => {
      // console.log(response.value.data)
      this.setState({ placeInfo: response.value.data })
    })
   .catch((error) => {
     console.log(`Danger! ${ error }`)
   });
  }

  displayPlaceImage() {
    let { photos } = this.state.placeInfo;
    console.log(`placeInfo:`, photos);
    console.log(typeof photos);  
    // setTimeout(() => {
    //   for(let i = 0; i < photos.length; i++) {
    //     console.log(photos[i])
    //   }
    // },10000)
  
  }



  render() {
    // console.log('this.props', this.props.match.params.id);
    let { placeInfo } = this.state
    console.log(placeInfo);

    return (
      <div >
        <p>PlaceMoreInfo</p>
        <p>Name: { placeInfo.alias }</p>
        {/* <img src={ '' +  this.displayPlaceImage() } alt='broken' ></img> */}
        <p>Phone: { placeInfo.display_phone }</p>
        <p>Price: { placeInfo.price }</p>
        <p>Rate: { placeInfo.rating }</p>
        
      </div>
    );
  }
}

function mapToPropsState(state) {
  return state
}

export default connect(mapToPropsState, { getPlaceInfo })(PlaceMoreInfo);