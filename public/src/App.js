
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Loginpage from './Components/Loginpage/Loginpage';
import SingupPage from './Components/SingupPage/SingupPage';
import Navigationbar from './Components/Navigationbar/Navigationbar';
import Home from './Components/Home/Home';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const navigation = useNavigate();

  const [data, setData] = useState('');

  useEffect(() => {
    const item = sessionStorage.getItem('logintocken');
    if (item == null) {
      if (location.pathname !== '/login' && location.pathname !== '/singup') {
        navigation('login');
      }
    }
    setData(item);
  })

  return (
    <>
      {
        data == null
          ?
          <Routes>
            <Route path='/login' element={ <Loginpage /> } />
            <Route path='/singup' element={ <SingupPage /> } />
          </Routes>
          :
          <>
            <Navigationbar />
            <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='/login' element={ <Loginpage /> } />
            </Routes>
          </>
      }
      <Toaster />
    </>
  );
}

export default App;
