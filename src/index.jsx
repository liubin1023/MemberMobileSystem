// require.ensure([], (require) => {
// 	const React = require('react');
// 	const {render} = require('react-dom');
// 	console.log(12);
// 	const LoginFormFinish = require('./Login');
// 	console.log(34);
// 	render(<LoginFormFinish/>, document.getElementById('app'));
// })

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux'

import {Router, browserHistory, hashHistory} from 'react-router'
import {Provider} from 'react-redux';

import routes from './routes'
import * as reducers from './reducer';

let store = createStore(combineReducers(reducers));

ReactDOM.render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('app')
);
