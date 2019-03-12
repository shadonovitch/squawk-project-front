import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Authentication from './Authentication';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/auth" component={Authentication} />
    </Switch>
  </div>
);

export default App;
