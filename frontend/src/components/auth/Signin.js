import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { signin } from '../../actions/auth';


const SignIn = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }


  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signin(formData, props.history));
  }

  const { email, password } = formData;

  return (
    <div className="grid-container">
      <header>
        <a href="/">Amazona</a>
        <div>
          { 
            isAuthenticated ?  
            <Fragment>
              <Link to="/orders" className="header-links">Orders</Link>
              <Link to="/signin" className="header-links">Logout</Link>
              </Fragment>
            :
            <Link to="/signin" className="header-links">Sign In</Link>
          }
        </div>
      </header>
      <main>
        <div className="content">
          <div className="container">
            <h1>Sign In</h1>
            <form onSubmit={e => handleSubmit(e)}>
              <ul className="signin">
                <li>
                  <label htmlFor="email">Email</label>
                  <input
                  type="email" 
                  name="email" 
                  id="email"
                  value={email}
                  onChange={e => handleChange(e)}
                  />
                </li>
                <li>
                  <label htmlFor="password">Password</label>
                  <input
                  type="password" 
                  name="password" 
                  id="password"
                  value={password}
                  onChange={e => handleChange(e)}
                  />
                </li>
                <li>
                  <button type="submit" className="">{ loading ? <Loader type="Oval" height={25} width={25} color="#424242" /> : "Sign In"}</button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </main>
      <footer>
        All right reserved &copy; 2020
      </footer>
    </div>
  );
}

export default SignIn;