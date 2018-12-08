import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getEvent } from '../../duck/eventReducer';
import { Container, Card, CardTitle, CardText } from 'reactstrap';
import './event.scss';
const monent = require('moment');

class Event extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      eventData: [],
      eventInfo: [],

     }
     this.handleSelectEventInfo = this.handleSelectEventInfo.bind(this);
  }

  componentDidMount() {
    this.props.getEvent()
    .then((response) => {
      // console.log(response.value.data.events)
      this.setState({ eventData: response.value.data.events })
    })
    

  }

  handleSelectEventInfo(id) {
    axios.get(`/api/getMoreInfoEvent/${ id }`)
    .then((response) => {
      this.setState({ eventInfo: response })
      this.props.history.push('/eventInfo')
    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });
  }


  render() {
    let { eventData } = this.state

    let diplayEvent = eventData.map((value, index) => {
      // console.log(value, index)
      return(
          <Card id='eventCardBox' onClick={ () => this.handleSelectEventInfo(value.id) }>
            <CardTitle>Name : { value.name }</CardTitle>
            <a href={ value.event_site_url } target='blank'>{ value.id }</a>
            <CardText>Description : { value.description }</CardText>
            <p>Time start: { monent(value.time_start).format('MMMM Do YYYY') }</p>
            <p>Time end: { monent(value.time_end).format('MMMM Do YYYY') }</p>
            <p>category: { value.category }</p>
         </Card>
      )
    });
    
    return (
      <Container>
        { diplayEvent }
        <iframe className='iframeBox' src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=amzn_echo_dot_evgrn&banner=15VBNW39NDH85MG30202&f=ifr&linkID=65b700645259ab5206ebb2534ceec402&t=vu09-20&tracking_id=vu09-20"  
             >
        </iframe>
      </Container>
    );
  }
}

function mapToPropState(state) {
  return state
}

export default connect(mapToPropState, { getEvent })(Event);