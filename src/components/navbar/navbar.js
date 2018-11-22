import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import css from './navbar.scss';

class NavBar extends Component {
  state = {  }
  
  render() {
    return (
      <Container fluid className='navbarBox text-center'>
        <Link to='/'>
          <Button outline color='primary' size='sm'>Home</Button>
        </Link>
      </Container>
    );
  }
}

export default NavBar;