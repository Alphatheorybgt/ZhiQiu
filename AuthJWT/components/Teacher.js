import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions'


class Teacher extends Component{
	
	render(){
		return (
		  <div>
		  	I am Teacher! Welcome .
		  	<button onClick={(e) => this.handleClick(e)}>Logout</button>
		  </div>
		)
	}

	handleClick(e) {
		e.preventDefault()
		this.props.logout()
    }
}

Teacher.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(false, { logout })(Teacher)
