import React from 'react';
import './styles.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Header from './components/header';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import AddVacationComponent from './components/add-vacation-component';
import VacationChart from './components/vacations-chart';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(/* logger, */thunk))
)

export default function App() {
  return (
    <div className="background">
      <Provider store={store}>
        <Router>
          <Header />
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/add-vacation' component={AddVacationComponent} />
          <Route path='/vacations-chart' component={VacationChart} />
        </Router>
      </Provider >
    </div>
  )
}