import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoriesList, getSelectCategoriesList, getLists } from '../../duck/categoriesListReducer';
import { stringify } from 'querystring';
import css from './dashboard.scss'
import { Link } from 'react-router-dom';
import RestaurantMoreInfo from '../restaurantMoreInfo/restaurantMoreInfo';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      categoriesList: [],
      userInputTerm: '',
      userInputLocation: '',
     };

     this.handleUserInputTerm = this.handleUserInputTerm.bind(this);
     this.handleUserInputLocation = this.handleUserInputLocation.bind(this);
  }

  componentDidMount() {
   
  }

  handleUserInputTerm(value) {
    // console.log(`value: ${ value }`);
    this.setState({userInputTerm: value});
  }

  handleUserInputLocation(value) {
    this.setState({ userInputLocation: value })
  }

  ////  get categories by user input 
  handleSubmitUserInput() {
  //   this.props.getCategoriesList(this.state.userInputTerm)
  //  .then((response) => {
  //    console.log(response.value.data)
  //   this.setState({ categoriesList: response.value.data })
  //  })
  //  .catch((error) => {
  //    console.log(`Danger! ${ error }`)
  //  });
    console.log(this.state);
    let { userInputTerm, userInputLocation } = this.state;
    
    this.props.getLists({term: userInputTerm, location: userInputLocation})
    .then((response) => {
      console.log(response)
    })

  }

  render() {
    let { categories  } = this.state.categoriesList
    console.log('categories:', categories);
    
    return (
      <div>
        
        <input placeholder='pizza, spas, burgers' onChange={ (e) => this.handleUserInputTerm(e.target.value) } ></input>
        <input placeholder='Place /City' onChange={ (e) => this.handleUserInputLocation(e.target.value) }></input>
        <button onClick={ () => this.handleSubmitUserInput() } >Seach</button>
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

