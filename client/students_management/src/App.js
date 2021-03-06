
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ResponsiveAppBar from './Components/Headers';
import Contest from './Components/Contest';
import { AddStudents } from './Components/AddStudents';
import { Students } from './Components/StudentsList';
import { SignIn } from './Components/SignIn';
import { Signup } from './Components/Signup';
import { AddContest } from './Components/AddContest';

if(!localStorage.getItem("b_token")){
  localStorage.setItem("b_token",JSON.stringify(null));
}

function App() {
  return (
    <div>
     
      <ResponsiveAppBar />
      <Switch>
        <Route exact path="/">
        <Contest/>
        </Route>
        <Route exact  path="/addstudent">
        <AddStudents />
        </Route>
        <Route exact  path="/studentlist">
        <Students />
        </Route>
        <Route exact  path="/signIn">
        <SignIn />
        </Route>
        <Route exact  path="/signup">
        <Signup />
        </Route>
        <Route exact  path="/addcontest">
        <AddContest />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
