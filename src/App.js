import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './App.css';
import Authentication from './connection/Authentication';
import Register from './connection/Register';
import Home from './home/Home';

const App = () => {
  document.body.style = 'background: darkgray';
  document.title = 'Dird Project';
  return (
    <div className="App">
      <CookiesProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Authentication} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </CookiesProvider>
    </div>
  );
};

export default App;
