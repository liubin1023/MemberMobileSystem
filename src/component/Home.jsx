import React, {Component} from 'react';

import {connect} from 'react-redux';

import {showSuccessMessage, showErrorMessage} from '../action/loginActions';

var GatewayUtils = require('@hec/api-gateway');

const Home = class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }


  render() {
    return (
      <div>
        123abc
      </div>
    );
  }
}

export default connect(state => state)(Home);
