import Routes from '../../Routes/Routes';
import MainFrame from '../Frames/MainFrame';
import MainNavBar from '../NavBar/MainNavBar';
import './App.css';

function App() {
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
