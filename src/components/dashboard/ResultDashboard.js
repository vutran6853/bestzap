import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MultMapContainer from '../googleMap/MultMapContainer';
import { Container, Card, Button, CardImg, Row, Col } from 'reactstrap';
import css from './dashboard.scss';

class ResultDashboard extends Component {
  constructor(props) {
    super(props);
    
    //// local state if needed
    this.state = {
      lists: [],
      businessesData: [],
      region: [],
    }
  }
  componentDidMount() {
    // console.log(this.props.categoriesList.lists.data);
    this.setState({ lists: this.props.categoriesList.lists.data.businesses })
    this.setState({ businessesData: this.props.categoriesList.lists.data.businesses })
    this.setState({ region: this.props.categoriesList.lists.data.region })

  }

  render() {
    let { lists } = this.state
  
    let displayLists = lists.map((value, index) => {
      // console.log(value, index)
      return(
        <Card key={ value.id } id='listsBox'>
          <p>{ index + 1 }</p>
          <Link to={ `/placeMoreInfo/${ value.id }` }>
            <p>Name: { value.name }</p>
          </Link>
          <p>Phone: { value.phone }</p>
          <p>Rating: { value.rating }</p>
          <CardImg src={ value.image_url } alt='broken' className='imgBox'></CardImg>
          <p>{ value.transactions[0] }</p>
        </Card>
      )
    });

    return (
      <div>

          <Container className='displayListBox mt-2' >
            <Row>
              <Col xs='6'>
                { displayLists }
              </Col>
              <Row className='fixGoogleMapPosition'>
                <MultMapContainer data={ this.state.businessesData } region={ this.state.region } />
              </Row>
            </Row>
            
           
         
              

          </Container>

          <div className='mapBox' >

         

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