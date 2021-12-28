import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Main Page</h1>

      <Switch>
        <Route exact path="/">
          
        </Route>
      </Switch>
    </div>
  );
}

export default App;
