import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

let DisplayMarkerAndInfo = (props) => {
  console.log('this.props:::', props);
   props.data.coordinates.map((value, index) => {
    console.log(value, index)
    return( 
      
          <Marker title='test1'
                    name='test2'
                    position={ { lat: `${ value.latitude }`, lng: `${ value.longitude }` } } 
                    onClick={ props.handeleOnMarkerClick }
            />
     
  
         
          
    )     

  });
   
  
}

export default DisplayMarkerAndInfo