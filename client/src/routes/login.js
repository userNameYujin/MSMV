import React from 'react';
import {Link} from 'react-router-dom';

class Login extends React.Component {
  render () {
    return (
      <div>
        <input placeholder="id"></input>
        <input placeholder="pw"></input>
        <button>Login</button>
        <Link to ="join"><button>Join</button></Link>
      </div>
    )
  }
}

export default Login;