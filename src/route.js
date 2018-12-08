import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import PlaceMoreInfo from './components/placeMoreInfo/PlaceMoreInfo';
import ResultDashboard from './components/dashboard/ResultDashboard';
import Event from './components/event/Event';
import EventInfo from './components/event/EventInfo';

export default(
  <div>
    <Switch>
      <Route exact path='/' component={ Dashboard }></Route>
      <Route path='/placeMoreInfo/:id' component={ PlaceMoreInfo }></Route>
      <Route path='/resultDashboard' component={ ResultDashboard }></Route>
      <Route path='/event' component={ Event }></Route>
      <Route path='/eventInfo' component={ EventInfo }></Route>

    </Switch>
  </div>
)