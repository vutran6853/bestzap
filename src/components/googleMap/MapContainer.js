import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
const style = {
  width: '50%',
  height: '50%'
}
class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coordinates: [],
      placeName: [],
      placeAddress: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    this.handeleOnMarkerClick = this.handeleOnMarkerClick.bind(this);
    this.handeleOnMapClicked = this.handeleOnMapClicked.bind(this);
    this.handelePlaceAddress = this.handelePlaceAddress.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      // console.log('this.props...:', this.props.data.coordinates)
      this.setState({ coordinates: this.props.data.coordinates })
    }, 2000);

    setTimeout(() => {
      // console.log('this.props...:', this.props.data.name)
      this.setState({ placeName: this.props.data.name })
    }, 2000);

    setTimeout(() => {
      this.handelePlaceAddress();
    }, 3000)

  }

  handeleOnMarkerClick(props, marker, e) {
    console.log(`this.props:`, this.props);
    console.log('marker::', marker);
    console.log(`props:: ${ props }`);
    this.setState({ selectedPlace: this.props, activeMarker: marker, showingInfoWindow: true });
  }

  handeleOnMapClicked(props){
    console.log(`1::`, this.props);
    if (this.state.showingInfoWindow) {
      this.setState({ showingInfoWindow: false, activeMarker: null })
    }
  };

  handelePlaceAddress() {
    let { display_address: address } = this.props.data.location
    this.setState({ placeAddress: address })
  }

  // handeleOnMarkerClick = (props, marker, e) =>
  //   this.setState({
  //     selectedPlace: this.props.data.name,
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   });
 
  //   handeleOnMapClicked = (props) => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     })
  //   }
  // };


 render() {
  console.log("this.props::", this.props);
  console.log("this.state::", this.state);
 
  let { coordinates, placeName, placeAddress } = this.state;

    

    return (
      <Map  google={ this.props.google }
            style={ style }
            center={ { lat: `${ coordinates.latitude }`, lng: `${ coordinates.longitude }` } }
            zoom={ 15 }
            onClick={ () => this.handeleOnMapClicked() } >

      <Marker title={ placeName }
              name={ placeName }
              position={ { lat: `${ coordinates.latitude }`, lng: `${ coordinates.longitude }` } } 
              onClick={ this.handeleOnMarkerClick }
      />
      
  

          <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
           
              <h1>{ placeName }</h1>
              <h1>{ placeAddress[0]  } { placeAddress[1]  } </h1>
          </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_KEY })(MapContainer)