import Routes from '../Routes/Routes';
import MainFrame from '../Components/Frames/MainFrame';
import MainNavBar from '../Components/NavBar/MainNavBar';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenFromLocalStorage } from '../Actions/tokenActionMaker';
import { useEffect } from 'react';
import { loginUserByToken } from '../Actions/userActionMaker';

function App() {

  const dispatch = useDispatch()
  useEffect(()=> {
    const getUserFromLocal = async () => {
      const token = localStorage.getItem("jwToken")
      if(token) {
        dispatch(getTokenFromLocalStorage())
        dispatch(loginUserByToken(token))
      }
    }
    getUserFromLocal()
  },[])

  return (
    <div className="App">
      <MainNavBar/>
      <MainFrame>
        <Routes/>
      </MainFrame>
    </div>
  );
}

export default App;