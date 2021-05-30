import React from 'react';
import axios from 'axios';

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: '',
      Password: '',
      Nickname: '',
    };
  };

  inputId = (e) => {
    this.setState({
      ID : e.target.value
    })
  }

  inputPassword = (e) => {
    this.setState({
      Password : e.target.value
    })
  }

  render () {
    return (
      <div>
        <h1>Join page</h1>

        <input onChange={this.inputId} type="text" name="id" placeholder="ID"></input>
        <br></br>
        <input onChange={this.inputPassword} type="password" name="pwd" placeholder="PASSWORD"></input>
        <br></br>

        <p1>ID : {this.state.ID}</p1>
        <br></br>
        <p1>PW : {this.state.Password}</p1>

      </div>
    )
  }

  
};

export default Join;