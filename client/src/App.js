import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import AdditionalEquipments from './components/additional-equipment/AdditionalEquipments';
import AddAdditionalEquipment from './components/additional-equipment/AddAdditionalEquipment';
import EditAdditionalEquipment from './components/additional-equipment/EditAdditionalEquipment';
import AddServiceType from './components/car-service/AddServiceType';
import CarServices from './components/car-service/CarServices';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/additional-equipment/add" component={AddAdditionalEquipment} exact />
              <Route path="/additional-equipment/:id" component={EditAdditionalEquipment} exact />
              <Route path="/additional-equipment" component={AdditionalEquipments} exact />
              <Route path="/car-service/service-type/add" component={AddServiceType} exact />
              <Route path="/car-service" component={CarServices} exact />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
