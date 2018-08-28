import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import AdditionalEquipments from './components/additional-equipment/AdditionalEquipments';
import AdditionalEquipment from './components/additional-equipment/AdditionalEquipment';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/additional-equipment/add" component={AdditionalEquipment} exact />
              <Route path="/additional-equipment" component={AdditionalEquipments} exact />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
