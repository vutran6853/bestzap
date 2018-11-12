import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCategoriesList, getSelectCategoriesList } from '../../duck/categoriesListReducer';
import { stringify } from 'querystring';
import css from './dashboard.scss'
import { Link } from 'react-router-dom';
import RestaurantMoreInfo from '../restaurantMoreInfo/restaurantMoreInfo';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      categoriesList: [],
      selectCategoriesID: '',
      restaurantsList: [],
      restaurantsID: '',
     };

     this.handleSelectCategories = this.handleSelectCategories.bind(this);
     this.handleGetSelectCategories = this.handleGetSelectCategories.bind(this);
     this.handleGetMoreInfo = this.handleGetMoreInfo.bind(this);

  }

  componentDidMount() {
    this.props.getCategoriesList()
    .then((response) => {
      // console.log(response.value.data.categories)
      this.setState({ categoriesList: response.value.data.categories })
    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });
  }

  handleSelectCategories(value) {
    // console.log(`e: ${ value }`);
    this.setState({ selectCategoriesID: value })
  }

  handleGetSelectCategories() {
    // console.log(`selectCategoriesID ${ this.state.selectCategoriesID }`);
    this.props.getSelectCategoriesList(this.state.selectCategoriesID)
    .then((response) => {
      // console.log(response.value.data.restaurants)
      this.setState({ restaurantsList: response.value.data.restaurants })
    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });
  }

  handleGetMoreInfo(value) {
    console.log(`value:: ${ value }`);
    this.setState({ restaurantsID: value })

  }



  render() {
    let { categoriesList, restaurantsList } = this.state;
    // console.log(restaurantsList);

    let displayCategoriesList = categoriesList.map((value, index) => {
      // console.log(value.categories.name, index)
      return(
            <option key={ value.categories.id } value={ value.categories.id } >
              { value.categories.name }
            </option>
      )
    });

    let displayRestaurantsList = restaurantsList.map((value, index) => {
      console.log(value.restaurant, index)
      return(
        <div className='box'>
          <Link to={`/restaurant/${ value.restaurant.id }`}>
            <p onClick={ () => this.handleGetMoreInfo(value.restaurant.id) }>Name: { value.restaurant.name }</p>
          </Link>
          <p>Cuisines: { value.restaurant.cuisines }</p>
          <img src={ value.restaurant.featured_image } style={{ height: 100, width: 100 }} alt='broken'></img>
          <p>user rating: { value.restaurant.user_rating.aggregate_rating }</p>
          <a href={ value.restaurant.photos_url } >value.restaurant.photos_url</a>
          <a href={ value.restaurant.events_url }></a>
        </div>
      )
    });

    return (
      <div>
        <p>Categories: </p>
        <select onChange={ (e) => this.handleSelectCategories(e.target.value) }>
          { displayCategoriesList }
        </select>
        <button onClick={ () => this.handleGetSelectCategories() }>Submit</button>

       <div>
         { displayRestaurantsList }

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

export default connect(mapStateToProps, { getCategoriesList, getSelectCategoriesList })(Dashboard);

