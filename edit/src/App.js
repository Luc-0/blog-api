import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/" component="" />
          <Route exact path="/comments" component="" />
          <Route exact path="/posts/new" component="" />
          <Route exact path="/login" component="" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
