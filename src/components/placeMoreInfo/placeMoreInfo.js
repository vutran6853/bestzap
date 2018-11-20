import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaceInfo, getPlaceReviews } from '../../duck/categoriesListReducer';
import Reviews from '../reviews/Reviews';
import SingleMapContainer from '../googleMap/SingleMapContainer';

import css from './placeMoreInfo.scss'

class PlaceMoreInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      placeInfo: [],
      photosList: [],
      placeAddress: [],
      placeReviews: [],
    }
    this.placeImageList = this.placeImageList.bind(this);
    this.placeAddress = this.placeAddress.bind(this);
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

   this.props.getPlaceReviews(this.props.match.params.id)
   .then((response) => {
    //  console.log(response.value.data)
     this.setState({ placeReviews: response.value.data })
    })
   .catch((error) => {
     console.log(`Danger! ${ error }`)
   });

   setTimeout(() => {
    this.placeImageList();
    this.placeAddress();
   }, 1000);

  }

  //// Get imagePhoto and store local state
  placeImageList() {
    let { photos } = this.state.placeInfo
    let photosArray = []

    for(let i = 0; i < photos.length; i++) {
      photosArray.push(photos[i])
    }
    this.setState({ photosList: photosArray });
  }

  ////  Get address and store local state
  placeAddress() {
    let { display_address: address } = this.state.placeInfo.location
    this.setState({ placeAddress: address })
  }



  render() {
    // console.log('this.props', this.props.match.params.id);
    let { placeInfo, photosList, placeAddress } = this.state
    // console.log(`placeInfo`, placeInfo);
    let displayphotosList = photosList.map((value, index) => {
      return(
        <img key={value.id} src={ value } alt='broken' className='imgBox1'></img>
      )
    });

    return (
      <div className='placeInfoBox'>
        <p>Name: { placeInfo.alias }</p>
          { displayphotosList }
        <p>Phone: { placeInfo.display_phone }</p>
        <p>Price: { placeInfo.price }</p>
        <p>Rate: { placeInfo.rating }</p>
        <p>Location: { placeAddress[0]} {placeAddress[1]}</p>
        <Reviews data={ this.state.placeReviews } placeInfo={ placeInfo }/>
        <SingleMapContainer data={ this.state.placeInfo }/>
      </div>
    );
  }
}

function mapToPropsState(state) {
  return state
}

export default connect(mapToPropsState, { getPlaceInfo, getPlaceReviews })(PlaceMoreInfo);