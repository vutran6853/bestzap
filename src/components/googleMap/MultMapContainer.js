import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';

class MultMapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coordinates: [],
      placeName: [],
      placeAddress: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      centerRegion: {},
      style: { width: '50%', height: '50%', border: '5px solid blue' }
    }
    this.handeleOnMarkerClick = this.handeleOnMarkerClick.bind(this);
    this.handeleOnMapClicked = this.handeleOnMapClicked.bind(this);
    this.handleDisplayMarker = this.handleDisplayMarker.bind(this);
    this.handleDisplayInfo = this.handleDisplayInfo.bind(this);
  }

  componentDidMount() {
    // console.log('this.props...:', this.props)
    this.setState({ coordinates: this.props.data.map((value, index) => {
      // console.log(value, index) 
      return value.coordinates})
    });
    
    this.setState({ placeAddress: this.props.data.map((value, index) => {
      // console.log(value, index) 
      return value.location})
    });

    this.setState({ placeName: this.props.data.map((value, index) => {
      // console.log(value, index) 
      return value.name})
    });

    this.setState({ centerRegion: this.props.region.center });

  }

  handeleOnMarkerClick(props, marker, e) {
    this.setState({ selectedPlace: this.props, activeMarker: marker, showingInfoWindow: true });
  }

  handeleOnMapClicked(props) {
    // console.log(`1::`, this.props);
    if(this.state.showingInfoWindow) {
      this.setState({ showingInfoWindow: true, activeMarker: null })
    }
    else if (!this.state.showingInfoWindow) {
      this.setState({ showingInfoWindow: false, activeMarker: null })
    }  
  };

  handleDisplayMarker() {
    let { coordinates, placeName, placeAddress } = this.state;
    // console.log('props:', this.props);
      
    return coordinates.map((value, index) => {
      // console.log(value, index)
      // console.log(this.props.data[index].id);
      return( <Marker title={ placeName[index] }
                      name={ placeName[index] }
                      id={ this.props.data[index].id }
                      location={ placeAddress[index].display_address[0] }
                      position={ { lat: `${ value.latitude }`, lng: `${ value.longitude }` } } 
                      onClick={ this.handeleOnMarkerClick }
              />
            )     
    });
  };

  handleDisplayInfo() {
    let { placeAddress, placeName, activeMarker } = this.state;
    console.log('activeMarker', activeMarker);
    console.log('placeAddress', placeAddress);
    console.log('placeName', placeName);
    console.log('this.props...:', this.props)

    if(activeMarker === null) {

    } else {
      return( 
      
      <InfoWindow marker={ this.state.activeMarker } visible={ this.state.showingInfoWindow }>
               <a href={ `#/placeMoreInfo/${ activeMarker.id }` }>
               <h3 className='map_h3_font'>{ activeMarker.name }</h3>

               </a>
                <h3 className='map_h3_font'>{ activeMarker.location  }</h3>
              </InfoWindow>
            )
    }
  }

  render() {
    // console.log("this.props::", this.props);
    // console.log("this.state::", this.state);
    let { placeName, placeAddress, activeMarker, centerRegion } = this.state;

    return (
          <Map  google={ this.props.google }
                style={ this.state.style }
                center={ { lat: `${ centerRegion.latitude }`, lng: `${ centerRegion.longitude }` } }
                zoom={ 15 }
                onClick={ () => this.handeleOnMapClicked() } 
          >
            { this.handleDisplayMarker() }
            {/* <Link to='#' > */}
            {/* <div> */}
            { this.handleDisplayInfo() }

            {/* </div> */}

            {/* </Link> */}
          </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_KEY })(MultMapContainer)