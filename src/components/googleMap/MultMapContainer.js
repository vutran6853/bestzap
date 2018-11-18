import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import DisplayMarkerAndInfo from './MarkerAndInfo';

const style = {
  width: '80%',
  height: '80%'
}

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
      centerRegion: {}
    }
    this.handeleOnMarkerClick = this.handeleOnMarkerClick.bind(this);
    this.handeleOnMapClicked = this.handeleOnMapClicked.bind(this);
    this.handleDisplayMarker = this.handleDisplayMarker.bind(this);
    this.handleDisplayInfo = this.handleDisplayInfo.bind(this);
  }

  componentDidMount() {
    console.log('this.props...:', this.props)
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
    console.log(`this.props:`, this.props);
    console.log('marker::', marker.name);
    console.log(`props:: ${ props }`);
    this.setState({ selectedPlace: this.props, activeMarker: marker, showingInfoWindow: true });
  }

  handeleOnMapClicked(props) {
    // console.log(`1::`, this.props);
    if (this.state.showingInfoWindow) {
      this.setState({ showingInfoWindow: false, activeMarker: null })
    }
  };

  handleDisplayMarker() {
    let { coordinates, placeName } = this.state;
    console.log('props:', this.props);
      
    return coordinates.map((value, index) => {
      // console.log(value, index)
      return( <Marker title={ placeName[index] }
                      name={ placeName[index] }
                      position={ { lat: `${ value.latitude }`, lng: `${ value.longitude }` } } 
                      onClick={ this.handeleOnMarkerClick }
              />
           
            
      )     

    });
  };

  handleDisplayInfo() {
    let { placeAddress, placeName, activeMarker } = this.state;
      
    return placeAddress.map((value, index) => {
      console.log(value, index)
      return( 
            <div>
              <h1>{ activeMarker[index] }</h1>
              {/* <h1>{ value.display_address[0]  } { value.display_address[1]  } </h1> */}
            </div>
            )
    });
  }

  render() {
    // console.log("this.props::", this.props);
    // console.log("this.state::", this.state);
    let { placeName, placeAddress, activeMarker, centerRegion } = this.state;

    return (
          <Map  google={ this.props.google }
          style={ style }
          center={ { lat: `${ centerRegion.latitude }`, lng: `${ centerRegion.longitude }` } }
          zoom={ 15 }
          onClick={ () => this.handeleOnMapClicked() } >
          { this.handleDisplayMarker() }
          
          {/* <DisplayMarkerAndInfo data={ this.state } handeleOnMarkerClick={ this.handeleOnMarkerClick }/> */}
          <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            { this.handleDisplayInfo() }
           {/* <h1>{ activeMarker.name }</h1> */}
           {/* <h1>{ placeAddress[0]  } { placeAddress[1]  } </h1> */}
       </InfoWindow>

            
          </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_KEY })(MultMapContainer)