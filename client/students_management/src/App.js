
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ResponsiveAppBar from './Components/Headers';
function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route exact path="/">
          <ResponsiveAppBar />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
