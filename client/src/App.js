import './App.css';
import {Route , BrowserRouter as Router} from 'react-router-dom'
import Login from './components/Login/login';
import Nav from './components/Nav/nav';
import Home from './components/Home/home';
 
function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path='/'>
              <Login />
          </Route>
          <Route path='/home'>
              <Nav />
              <Home />
          </Route>
      </Router>

    </div>
  );
}

export default App;
