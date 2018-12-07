import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

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
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
      labelIndex: 0,
      style: { width: '50%', height: '50%', border: '5px solid blue', position: 'fixed', left: '1038.5' }
    }
    this.handeleOnMarkerClick = this.handeleOnMarkerClick.bind(this);
    this.handeleOnMapClicked = this.handeleOnMapClicked.bind(this);
    this.handleDisplayMarker = this.handleDisplayMarker.bind(this);
    this.handleDisplayInfo = this.handleDisplayInfo.bind(this);
  }

  componentDidMount() {
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
    if(this.state.showingInfoWindow) {
      this.setState({ showingInfoWindow: true, activeMarker: null })
    }
    else if (!this.state.showingInfoWindow) {
      this.setState({ showingInfoWindow: false, activeMarker: null })
    }  
  };

  handleDisplayMarker() {
    let { coordinates, placeName, placeAddress } = this.state;
    
    return coordinates.map((value, index) => {
      // console.log(value, index)
      return( <Marker title={ placeName[index] }
                      name={ placeName[index] }
                      id={ this.props.data[index].id }
                      location={ placeAddress[index].display_address[0] }
                      position={ { lat: `${ value.latitude }`, lng: `${ value.longitude }` } } 
                      onClick={ this.handeleOnMarkerClick }
                      label={ this.state.labels[index++ % this.state.labels.length] }
              />
            )     
    });
  };

  handleDisplayInfo() {
    let { placeAddress, placeName, activeMarker } = this.state;
    // console.log('activeMarker', activeMarker);
    // console.log('placeAddress', placeAddress);

    if(activeMarker === null) {
      return null
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
    let { placeName, placeAddress, activeMarker, centerRegion } = this.state;
    // console.log(this.props.google);
    return (
          <Map  google={ this.props.google }
                center={ { lat: `${ centerRegion.latitude }`, lng: `${ centerRegion.longitude }` } }
                zoom={ 10 }
                onClick={ () => this.handeleOnMapClicked() } 
            
          >
            { this.handleDisplayMarker() }
            { this.handleDisplayInfo() }
          </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_KEY })(MultMapContainer)