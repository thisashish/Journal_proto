import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Pagenotfound } from './Pages/Pagenotfound';
import { Signup } from './Pages/Signup';
import { Login } from './Pages/Login';
import { Journal } from './Pages/Journal';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [user, setuser] = useState([]);
  useEffect(() => {
    const fetchuserdata = async () => {
      const userdata = await axios.get('/auth/userdata', {
        withCredentials: true,
        headers: {
          Accept: 'application.json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      setuser(userdata.data);
    };
    fetchuserdata();
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="*" element={<Pagenotfound user={user} />} />
        <Route
          path="/signup"
          element={user.length !== 0 ? <Journal user={user} /> : <Signup />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/journal"
          element={user.length !== 0 ? <Journal user={user} /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
