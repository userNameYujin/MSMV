import React from 'react';
import { Link } from 'react-router-dom'; 

class Home extends React.Component {
  render () {
  return (
      <div>
        <h1>MSMV</h1>
        <Link to ="/login"><button>Login</button></Link>
        <p>Home page</p>
      </div>
    );
  }
};

export default Home;