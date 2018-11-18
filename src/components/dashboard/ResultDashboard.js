import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MainDashboardMap from './mainDashboardMap';

class ResultDashboard extends Component {
  constructor(props) {
    super(props);
    
    //// local state if needed
    this.state = {
      lists: [],
    }
  }
  componentDidMount() {
    console.log(this.props.categoriesList.lists.data.businesses);
    this.setState({ lists: this.props.categoriesList.lists.data.businesses })
  }
  render() {
    let { lists } = this.state
  //  console.log(lists);
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
         
        </div>
      )
    });

    return (
      <div>
        <p>ResultDashboard</p>

           <div>
          { displayLists }
          <MainDashboardMap/>
        </div>

      </div>
    );
  }
}

////  Redux props data
function mapStateToProps(state) {
  // console.log(state);
  return state
}

export default connect(mapStateToProps)(ResultDashboard);