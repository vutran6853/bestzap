import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoriesList, getSelectCategoriesList, getLists } from '../../duck/categoriesListReducer';
import { stringify } from 'querystring';
import css from './dashboard.scss'
import { Link } from 'react-router-dom';
import PlaceMoreInfo from '../placeMoreInfo/PlaceMoreInfo';
import MapContainer from '../googleMap/MapContainer';

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
    let { userInputTerm, userInputLocation } = this.state;
    
    this.props.getLists({term: userInputTerm, location: userInputLocation})
    .then((response) => {
      // console.log(response.value.data)
      this.setState({ lists: response.value.data.businesses })
    })
   .catch((error) => {
     console.log(`Danger! ${ error }`)
   });

  }

  render() {
    let { lists } = this.state
   
      let displayLists = lists.map((value, index) => {
        // console.log(value, index)
        return(
          <div key={ value.id } className='listsBox'>
            <Link to={ `/placeMoreInfo/${ value.id }` }>
              <p>Name: { value.name }</p>
            </Link>
            <p>Phone: { value.phone }</p>
            <p>Rating: { value.rating }</p>
            <img src={ value.image_url } alt='broken' className='imgBox'></img>
            <p>{ value.transactions[0] }</p>
            <MapContainer data={ value }/>
          </div>
        )
      })
  
    

    return (
      <div>
        
        <input placeholder='pizza, spas, burgers' onChange={ (e) => this.handleUserInputTerm(e.target.value) } ></input>
        <input placeholder='Place /City' onChange={ (e) => this.handleUserInputLocation(e.target.value) }></input>
        <button onClick={ () => this.handleSubmitUserInput() } >Seach</button>

        <div>
          { displayLists }
        </div>
        
      
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

