import React, { useReducer, useState } from 'react';
import signupReducer from '../Components/signupReduser';
import axios from 'axios';
const intialState = {
  username: '',
  email: '',
  password: '',
  confirmpassword: '',
};

export const Signup = () => {
  const [otp, setotp] = useState(false);
  const [otpvalue, setotpvalue] = useState();
  const [otpnotmatch, setotpnotmatch] = useState(false);
  const [passnotmatch, setpassnotmatch] = useState(false);
  const [userexist, setuserexist] = useState(false);
  const [formstate, dispatch] = useReducer(signupReducer, intialState);
  const handleTextChange = (e) => {
    dispatch({
      type: 'Handle Input Change',
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    if (
      (formstate.username.length !== 0) &
      (formstate.password.length !== 0) &
      (formstate.confirmpassword.length !== 0) &
      (formstate.email.length !== 0)
    ) {
      if (formstate.confirmpassword === formstate.password) {
        e.preventDefault();
        const res = await axios.post('/auth/signup', { formstate });
        if (res.data === 'success') {
          setotp(true);
        }
        if (res.data === 'user already registered') {
          setuserexist(true);
        }
      } else {
        e.preventDefault();
        setpassnotmatch(true);
      }
    }
  };
  const handleotpsubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/auth/otp', { otp: otpvalue, formstate });
    if (res.data === 'success') {
      window.location.href = '/Journal';
    }
    if (res.data === 'otp not match') {
      setotpnotmatch(true);
    }
  };

  return (
    <>
      {otp === true ? (
        <div>
          <form>
            {otpnotmatch === true && (
              <div>
                <img
                  alt="error"
                  src="https://media.tenor.com/H9qZ5UCMrOUAAAAS/pomsku-pomsky.gif"
                />
                <p>Oops! Otp didn't matched</p>
              </div>
            )}
            <label>Enter Otp</label>
            <input
              required
              type="number"
              placeholder="enter otp"
              onChange={(e) => {
                setotpvalue(e.target.value);
              }}
            />
            <button onClick={handleotpsubmit}>Submit</button>
          </form>
        </div>
      ) : (
        <form type="submit">
          {passnotmatch === true && (
            <div>
              <img
                alt="error"
                src="https://media.tenor.com/H9qZ5UCMrOUAAAAS/pomsku-pomsky.gif"
              />
              <p>Oops! Password didn't matched</p>
            </div>
          )}
          {userexist === true && (
            <div>
              <img
                alt="error"
                src="https://media.tenor.com/H9qZ5UCMrOUAAAAS/pomsku-pomsky.gif"
              />
              <p>Yeah! email already registered let's login</p>
            </div>
          )}
          <label>Username</label>
          <input
            type="text"
            placeholder="enter username"
            required
            name="username"
            value={formstate.username}
            onChange={(e) => {
              handleTextChange(e);
            }}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="enter email"
            required
            name="email"
            value={formstate.email}
            onChange={(e) => {
              handleTextChange(e);
            }}
          />
          <label>Password</label>
          <input
            // autoComplete="new-password"
            type="password"
            placeholder="enter password"
            required
            name="password"
            value={formstate.password}
            onChange={(e) => {
              handleTextChange(e);
            }}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="enter password again"
            required
            name="confirmpassword"
            value={formstate.confirmpassword}
            onChange={(e) => {
              handleTextChange(e);
            }}
          />
          <button type="submit" onClick={handleSubmit}>
            Let's Go
          </button>
        </form>
      )}
    </>
  );
};
