import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import css from './navbar.scss';

let navbar = (props) => {
  return (
    <Container fluid className='navbarBox'>
      <Link to='/'>
        <Button outline color='primary' size='sm' id='navbarBtn'>Home</Button>
      </Link>
      <Link to='/event'>
        <Button outline color='primary' size='sm' id=''>Events</Button>
      </Link>
    </Container>
  );
}

export default navbar;