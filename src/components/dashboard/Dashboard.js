import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoriesList, getLists, getRecommendPLace } from '../../duck/categoriesListReducer';
import css from './dashboard.scss'
import { Input, Button, Row, Col, Container, Card, CardImg } from 'reactstrap';
import rateImage from '../image/image.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      categoriesList: [],
      userInputTerm: '',
      userInputLocation: '',
      lists: [],
      recommendList: [],
      recommendCity: ['austin', 'new york', 'chicago', 'Boston', 'tampa', 'altanta', 'san Francisco'],
      city: '',
     };
     this.handleUserInputTerm = this.handleUserInputTerm.bind(this);
     this.handleUserInputLocation = this.handleUserInputLocation.bind(this);
     this.handleSelectCity = this.handleSelectCity.bind(this);
     this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    this.props.getRecommendPLace('austin')
    .then((response) => {
      // console.log(response.value.data)
      this.setState({ recommendList: response.value.data.businesses.splice(0, 4) })
    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });

    this.setState({ categoriesList: this.props.categoriesList.categoriesList })
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
    if(userInputTerm === '' && userInputLocation === '') {
      return null
    } else {
      this.props.getLists({ term: userInputTerm, location: userInputLocation })
      .then((response) => {
        this.setState({ lists: response.value.data.businesses })
        this.props.history.push('/resultDashboard')
      })
     .catch((error) => {
       console.log(`Danger! ${ error }`)
     });
    }
  }

  handleSelectCity(e, name) {
    this.setState({ city: name })

    this.props.getRecommendPLace(name)
    .then((response) => {
      // console.log(response)
      this.setState({ recommendList: response.value.data.businesses.splice(0, 4) })
    });
  }
  
  ////  If user not select Top City and pick category, it will get random city
  ////  Check if user select Top City + Category, it will get data
  handleSelectCategory(e, name) {
    let { city, recommendCity } = this.state;
    let number = 1
    let finalCity = ''

    if(city === '') {
      for(let i = 0; i < recommendCity.length; i++) {
        // console.log(`recommendCity[${ i }]:`, recommendCity[i]);
        number = Math.floor(Math.random() * Math.floor(i + 1))
      }

      for(let i = 0; i < recommendCity.length; i++) {
        // console.log(`recommendCity[${ i }]:`, recommendCity[i]);
        if(number === i) {
          finalCity = recommendCity[i]
        }
      }

      this.props.getLists({ term: name, location: `${ finalCity }` })
        .then((response) => {
          this.setState({ lists: response.value.data.businesses })
          this.props.history.push('/resultDashboard')
        })
        .catch((error) => {
          console.log(`Danger! ${ error }`)
        });

    } else {
        this.props.getLists({ term: name, location: `${ city }` })
        .then((response) => {
          this.setState({ lists: response.value.data.businesses })
          this.props.history.push('/resultDashboard')
        })
        .catch((error) => {
          console.log(`Danger! ${ error }`)
        });
    }
  }

  ////  Shortcut for user to push enter to search
  keyPress(e) {
    if(e.which === 13) {
      this.handleUserInputTerm()
      this.handleUserInputLocation()
      this.handleSubmitUserInput()
    } else {
      return null
    }
  } 


  render() {
    let { recommendList, categoriesList, recommendCity } = this.state;

    let displayRecommendCity = recommendCity.map((value, index) => {
      // console.log(value, index)
      return(
        <a href='#' onClick={ (e) => this.handleSelectCity(e, e.target.name) } 
                    name={ value } 
                    className='topCity'>{ value }
        </a>
      )
    })

    let displayRecommendList = recommendList.map((value, index) => {
      // console.log(value, index)
      return(
          <Card key={ value.id } id='recommendBox'>
          <p>{ index + 1 }</p>
          <Link to={ `/placeMoreInfo/${ value.id }` }>
            <p>Name: { value.name }</p>
          </Link>
          <p>Phone: { value.phone }</p>
          <p>Rating: { value.rating }</p>
          <img src={ rateImage(value.rating) } alt='rateImage'></img>
          <CardImg src={ value.image_url } alt='broken'></CardImg >
          <p>{ value.transactions[0] }</p>
        </Card>  
      )
    })

    let displayRecommendCategorie = categoriesList.map((value, index) => {
      // console.log(value, index)
      return(
        <a href='#' onClick={ (e) => this.handleSelectCategory(e, e.target.name) } 
                    name={ value } 
                    className='topCity'>{ value }
        </a>
      )
    })

    return (
      <div>
        <Container className='dashboardBox'>
          <Row>
            <Col xs='5'>
              <Input placeholder='pizza, spas, burgers' size='sm' onChange={ (e) => this.handleUserInputTerm(e.target.value) } ></Input>
            </Col>

            <Col xs='5'>
              <Input placeholder='Place /City' size='sm' onChange={ (e) => this.handleUserInputLocation(e.target.value) }  onKeyPress={ (e) => this.keyPress(e) }  ></Input>
            </Col>

            <Col xs='2'>
              <Button outline color='info' size='sm' onClick={ () => { this.handleSubmitUserInput() } }>Seach</Button>
            </Col>
          </Row>
        </Container>

        <div className='browseBox' >
          <p>Browse By Top City</p>
            { displayRecommendCity }
        </div>
        
        <div>
          { displayRecommendList }
        </div>

        <div className='browseBox' >
          <p>Browse Businesses By Category</p>
          <div className='OuterRecommendCategorieBox'>
            { displayRecommendCategorie }
          </div>
        </div>

        <footer>
          <div className='footerBox'>
            <h6 className=' text-center'>Copyright © 2018 Made by Vu Tran</h6>
          </div>
        </footer>

      </div>
    );
  }
}

////  Redux props
function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {  getCategoriesList, getLists, getRecommendPLace })(Dashboard);

