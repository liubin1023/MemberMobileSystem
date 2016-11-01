import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {List, InputItem, Button, WhiteSpace, WingBlank, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import {connect} from 'react-redux';

import {showSuccessMessage, showErrorMessage} from '../../action/loginActions';

var GatewayUtils = require('@hec/api-gateway');

const LoginForm = class Login extends Component{
	constructor(props){
		super(props);

    this.state = {
      loginBtnLoading : false
    };

    this.login = this.login.bind(this);
    this.onReset = this.onReset.bind(this);
	}

	login(){
	  var _this = this;
    this.props.form.validateFields({ force: true }, (errors, values) => {
      if(!!errors){
        console.log('登录表单验证未通过');
        if(errors.username) {
          Toast.info(errors.username.errors[0].message);
          return;
        }
        if(errors.password) {
          Toast.info(errors.password.errors[0].message);
          return;
        }
        return;
      }

      _this.setState({
        loginBtnLoading : true
      });
      const formParams = this.props.form.getFieldsValue();
      let params = {
        'username' : formParams.username,
        'password' : formParams.password
      };

      GatewayUtils.PostReqeust({
        'url' : '/login',
        'params' : params
      }, function(json){
        _this.setState({
          loginBtnLoading : false
        });
        if(json.status == 'success'){
          Toast.success(json.message);
        } else {
          Toast.fail(json.message);
        }
      });
    })
  }

  onReset(){
    this.props.form.resetFields();
  }

	render(){
		const {getFieldProps, getFieldError} = this.props.form;
		const {dispatch, msg} = this.props;

		return (
			<div>
        <div>登录</div>
				<List title="登录abc1">
						<InputItem
							clear
							placeholder="请输入用户名"
							{...getFieldProps('username', {
								initialValue : '',
                rules : [{
                  required: true, message: '登录名不能为空'
                }]
							})}
							error={!!getFieldError('username')}
              onErrorClick={() => {
                alert(getFieldError('username').join('、'));
              }}
						>用户名</InputItem>
						<InputItem
							{...getFieldProps('password', {
								initialValue : '',
                rules : [{
                  required: true, message: '密码不能为空'
                }]
							})}
              error={!!getFieldError('password')}
              onErrorClick={() => {
                alert(getFieldError('password').join('、'));
              }}
              format="password"
              clear
              placeholder="请输入密码"
						>密码</InputItem>
				</List>
				<WhiteSpace/>
				<WingBlank size="lg">
          <Button type="primary" onClick={this.login} loading={this.state.loginBtnLoading}>登录</Button>
          <WhiteSpace />
          <Button onClick={this.onReset}>重置</Button>
        </WingBlank>
			</div>
		);
	}
}

const LoginFormFinish = createForm()(LoginForm);

export default connect(state => state)(LoginFormFinish);
