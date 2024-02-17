import './App.css';
import React, { Component } from "react";
import ListEtkinlikComponent from './Components/ListEtkinlikComponent';
import { BrowserRouter, Route,Switch  } from 'react-router-dom';
import LoginComponent from './Components/LoginComponent';
import creatEtkinlikComponent from './Components/creatEtkinlikComponent';

import updateEtkinlikComponent from './Components/DetayGosterComponent';

class App extends Component {
  render() {
    return (
      <div>
    
       <BrowserRouter>
     
          <div className= "container">
             <Switch>
             <Route path="/" exact component={LoginComponent}></Route>
               <Route path="/etkinlikler"   component={ListEtkinlikComponent}></Route>
               <Route path="/ektinlik-ekle"   component={creatEtkinlikComponent}></Route>
               <Route path="/ektinlik-detay/:id"   component={updateEtkinlikComponent}></Route>
               <ListEtkinlikComponent/>
              </Switch>
          </div>
       </BrowserRouter>
       <div/>

       </div>
    );
  }
}
export default App;
