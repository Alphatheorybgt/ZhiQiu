import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
import { login } from '../actions'
import { routerActions } from 'react-router-redux'
import * as style from '../styles/Login.css';

const FormItem = Form.Item;
class NormalLoginForm  extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { isAuthenticated, replace, redirect } = this.props
    if (isAuthenticated) {
      replace(redirect)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, replace, redirect } = nextProps
    const { isAuthenticated: wasAuthenticated } = this.props
    if (!wasAuthenticated && isAuthenticated) {
      replace(redirect)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.login({
          username:values.userName,
          password:values.password
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    )
  }
}
const LoginForm = Form.create()(NormalLoginForm)

const mapStateToProps = (state,ownProps) => {
  //console.log('Current props of form: ', ownProps)
  const remember_user = state.user.username || ''
  const isAuthenticated = state.user.username || false
  const redirect = ownProps.location.query.redirect || '/'                                                           
  return {
    isAuthenticated,
    redirect,
    remember_user
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect()(App) 中；
export default connect(mapStateToProps,{login,replace: routerActions.replace})(LoginForm)