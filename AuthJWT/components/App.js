import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions'

function App({ children }) {
  return (
    <div>          
        <div>{children}</div>
    </div>
  )
}

export default connect(false, { logout })(App)
