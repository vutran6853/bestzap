import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import PlaceMoreInfo from './components/placeMoreInfo/placeMoreInfo';


export default(
  <div>
    <Switch>
      <Route exact path='/' component={ Dashboard }></Route>
      <Route path='/placeMoreInfo/:id' component={ PlaceMoreInfo }></Route>
    </Switch>
  </div>
)