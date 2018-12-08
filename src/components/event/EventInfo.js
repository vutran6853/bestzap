import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button, Row, Col, Container, Card, CardImg } from 'reactstrap';
const monent = require('moment');

class EventInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      singleEventInfoData: []
    }
  }
  componentDidMount() {
    axios.get('/api/getEventInfo')
    .then((response) => {
      this.setState({ singleEventInfoData: response.data })
    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });
  }

  render() {
    let { singleEventInfoData: event } = this.state
    // console.log(event);
    // console.log(monent(event.time_start).format('MMMM Do YYYY')  )
    return (
      <Container>
        <Card>
          <p>name: { event.name }</p>
          <p>categorey: { event.category }</p>
          <img width="25%" src={ event.image_url } alt='broken'></img>
          <p>{ event.description }</p>
          <a href={ event.event_site_url } target='_blank'>{ event.name }</a>
          <p>time_start: { monent(event.time_start).format('MMMM Do YYYY') }</p>
          <p>time_end: { monent(event.time_end).format('MMMM Do YYYY') }</p>
        </Card>
      </Container>
    );
  }
}


export default EventInfo;