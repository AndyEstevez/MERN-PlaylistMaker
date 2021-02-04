import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/navbar';
import HomePage from './components/home-page';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Route exact path='/' component={HomePage}/>
      </Router>
    </div>
  );
}

export default App;
