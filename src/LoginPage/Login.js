import React, { Fragment,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Login=(props)=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password
    };
    axios.post('http://localhost:9000/user/login',user).then(function (response) {
      if (response.status === 200) {
        localStorage.setItem('isLoggedIn',true);
        localStorage.setItem("role",response.data.data.role);
        localStorage.setItem("uID",response.data.data.userID);
        console.log(localStorage.getItem("role"));
        setEmail('');
        setPassword('');
        history.go('/posts');
      }

    }).catch(error => console.log(error));
   
  };
return(
    <Fragment >
        <div className="card mt-5" style={{width:"500px",margin:"auto"}}>
        <div className="container">
       <form onSubmit={handleSubmit}  className="mt-5 mb-5 ml-1 mr-1" >
        <h3 className="text-center">Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
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
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <div className="text-center mt-5">

Not registered yet?{" "}
<span className="link-primary" >
<Link to="/signup" >Sign Up</Link>
</span>
</div>
      </form>
      </div>
      </div>
    </Fragment>
 
)
}

export default Login;