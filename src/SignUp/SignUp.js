import React, { Fragment,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const SignUp=(props)=>{
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password
    };
    axios.post('http://localhost:9000/newUser',user ).then(function (response) {
      if (response.status === 200) {
        setUsername('');
        setEmail('');
        setPassword('');
        history.push('/login');
      }

    }).catch(error => console.log(error));
   
  };
return(
         <Fragment >
        <div className="card mt-5" style={{width:"500px",margin:"auto"}}>
        <div className="container">
    <form onSubmit={handleSubmit} className="mt-5 mb-5 ml-1 mr-1" >
        <h3 className="text-center">Sign Up</h3>
        <div className="mb-3">
          <label>User name</label>
          <input
            type="text"
            className="form-control"
            placeholder="User name"
            value={username}
            onChange={e => setUsername(e.target.value)}
          required
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="email@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-center mt-4">
          Already registered <Link to="/" >Sign in</Link>
        </p>
      </form>
      </div>
      </div>
    </Fragment>
    )
}

export default SignUp;