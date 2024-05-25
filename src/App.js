import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route,Routes, BrowserRouter} from 'react-router-dom'
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/home" Component={Home}/>
          <Route path="/login" Component={Login}/>
          <Route path="/register" Component={Register}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
