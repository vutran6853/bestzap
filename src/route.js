import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import RestaurantMoreInfo from './components/restaurantMoreInfo/restaurantMoreInfo';




export default(
  <div>
    <Switch>
      <Route exact path='/' component={ Dashboard }></Route>
      <Route path='/restaurant/:id' component={ RestaurantMoreInfo }></Route>
    </Switch>
  </div>
)