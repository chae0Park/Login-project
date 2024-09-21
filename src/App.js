import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import UserProfile from './components/UserProfile';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
