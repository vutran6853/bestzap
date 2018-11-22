import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoriesList, getLists } from '../../duck/categoriesListReducer';
import css from './dashboard.scss'
import { Input, Button, Row, Col, Container } from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      categoriesList: [],
      userInputTerm: '',
      userInputLocation: '',
      lists: [],
     };
     this.handleUserInputTerm = this.handleUserInputTerm.bind(this);
     this.handleUserInputLocation = this.handleUserInputLocation.bind(this);
  }

  handleUserInputTerm(value) {
    this.setState({ userInputTerm: value });
  }

  handleUserInputLocation(value) {
    this.setState({ userInputLocation: value })
  }
  

  ////  get categories by user input 
  handleSubmitUserInput() {
    let { userInputTerm, userInputLocation } = this.state;
    
    this.props.getLists({ term: userInputTerm, location: userInputLocation })
    .then((response) => {
      this.setState({ lists: response.value.data.businesses })
      this.props.history.push('/resultDashboard')
    })
   .catch((error) => {
     console.log(`Danger! ${ error }`)
   });
  }


  render() {
    return (
      <div>
        <Container className='dashboardBox'>
          <Row>
            <Col xs='5'>
              <Input placeholder='pizza, spas, burgers' size='sm' onChange={ (e) => this.handleUserInputTerm(e.target.value) } ></Input>
            </Col>

            <Col xs='5'>
              <Input placeholder='Place /City' size='sm' onChange={ (e) => this.handleUserInputLocation(e.target.value) }></Input>
            </Col>

            <Col xs='2'>
              <Button outline color='info' size='sm' onClick={ () => { this.handleSubmitUserInput() } } >Seach</Button>
            </Col>
          </Row>
        </Container>


      </div>
    );
  }
}

////  Redux props
function mapStateToProps(state) {
  // console.log(`state:: ${ state.categoriesList.selectCategories }`);
  return state
}

export default connect(mapStateToProps, {  getCategoriesList, getLists })(Dashboard);

