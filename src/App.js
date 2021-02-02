import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
      </Router>
    </div>
  );
}

export default App;
