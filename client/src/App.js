import React from 'react';
import Home from './routes/home';
import Login from './routes/login';
import Join from './routes/join';

import { Route, Link } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">Head Banner</Link>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={Login}/>
        <Route path="/join" component={Join}/>

      </header>
    </div>
  );
}

export default App;
