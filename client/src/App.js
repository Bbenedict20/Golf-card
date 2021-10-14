import './css/App.css';
import Card from './Card';
import { Switch, Route } from 'react-router-dom';
import Scoreboard from './Scoreboard';
import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Addcourse from './Addcourse';
import View from './View';
import Edit from './Edit';
import ViewRounds from './ViewRounds';
import Addcard from './Addcard';
import Stats from './Stats';
import PrivateRoute from './PrivateRoute';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [myScore, setMyScore] = useState({
    'front': {
      score: 0,
      putts: 0,
      FIR: 0,
      GIR: 0
    },
    'back': {
      score: 0,
      putts: 0,
      FIR: 0,
      GIR: 0
    },
    'total': {
      eighteen: true,
      courseName: '',
      score: 0,
      putts: 0,
      FIR: 0,
      GIR: 0
    }
  });

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Login isLogged={isLogged} setIsLogged={setIsLogged} />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <PrivateRoute isLoggedIn={isLogged} exact path="/home" component={Home} />
        <PrivateRoute isLoggedIn={isLogged} exact path="/home/stats" component={Stats} />
        <PrivateRoute isLoggedIn={isLogged} exact path="/home/addcourse" component={Addcourse} />
        <Route exact path="/home/addcard/newcard" >
          <Card myScore={myScore} setMyScore={setMyScore} />
        </Route>
        {/* <PrivateRoute isLoggedIn={isLogged} exact path="/home/addcard/newcard" component={() => <Card myScore={myScore} setMyScore={setMyScore} />} /> */}
        <PrivateRoute isLoggedIn={isLogged} exact path="/home/addcard/scoreboard" component={() => <Scoreboard myScore={myScore} setMyScore={setMyScore} />} />
        <PrivateRoute isLoggedIn={isLogged} exact path="/home/view" component={View} />
        <PrivateRoute isLoggedIn={isLogged} exact path="/home/viewrounds" component={ViewRounds} />
        <PrivateRoute isLoggedIn={isLogged} exact path="/home/edit" component={Edit} />
        <PrivateRoute isLoggedIn={isLogged} exact path="/home/addcard" component={Addcard} />
      </Switch>
    </div>
  );
}

export default App;
