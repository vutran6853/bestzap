import React, { Component } from 'react';
import { connect } from 'react-redux';
import MultMapContainer from '../googleMap/MultMapContainer';
 
let MainDashboardMap = (props) => {
  // console.log('region::', props.categoriesList.lists.data.region);
  // console.log('businesses::', props.categoriesList.lists.data.businesses);
  let region = props.categoriesList.lists.data.region;
  let businessesData = props.categoriesList.lists.data.businesses;

  // let getLocationData = businessesData.map((value, index) => {
  //   console.log(value, index)
  // })





    return(
      <div>
        <p>MainDashboardMap</p>
        <MultMapContainer data={ businessesData } region={ region } />
      </div>
    )
 
}

function mapToPropsState(state) {
  return state
}

export default connect(mapToPropsState, {  })(MainDashboardMap);