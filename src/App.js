import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Login from './LoginPage/Login';
import SignUp from './SignUp/SignUp'
import User from './UserPage/User';
import Posts from "./PostPage/Post"

function App() {
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );
  // eslint-disable-next-line
  const [role, setRole] = useState(
    localStorage.getItem('role')
  );
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          {isLoggedIn ? <Redirect to="/posts" /> : <Login />}
        </Route>
        <Route path="/users" exact>
          {isLoggedIn && role === "admin" ? <User/> : <Redirect to="/login" />}
        </Route>
        <Route path="/posts" exact>
          {isLoggedIn ? <Posts/> : <Redirect to="/login" />}
        </Route>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/signup">
      <SignUp></SignUp>
      </Route>
      </Switch>
    </Router>
    );
}

export default App;
