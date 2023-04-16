import React, { useReducer, useState } from 'react';
import signupReducer from '../Components/signupReduser';
import axios from 'axios';
const intialState = {
  email: '',
  password: '',
};
export const Login = () => {
  const [submiterror, setsubmiterror] = useState(false);
  const [formstate, dispatch] = useReducer(signupReducer, intialState);
  const handleTextChange = (e) => {
    dispatch({
      type: 'Handle Input Change',
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    if ((formstate.password.length !== 0) & (formstate.email.length !== 0)) {
      e.preventDefault();
      const res = await axios.post('/auth/login', { formstate });
      if (res.data === 'success') {
        window.location.href = '/journal';
      } else {
        setsubmiterror(res.data);
      }
    }
  };

  return (
    <>
      <form type="submit">
        {submiterror !== false && <div>{submiterror}</div>}
        <label>Email</label>
        <input
          type="email"
          required
          name="email"
          value={formstate.email}
          onChange={(e) => {
            handleTextChange(e);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={formstate.password}
          onChange={(e) => {
            handleTextChange(e);
          }}
        />

        <button type="submit" onClick={handleSubmit}>
          Let's Go
        </button>
      </form>
    </>
  );
};
