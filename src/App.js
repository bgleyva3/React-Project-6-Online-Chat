import './App.css';
import './components/application.css'
import './components/loginRegister.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login';
import Application from './components/Application';
import {useForm} from 'react-hook-form';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const {register, handleSubmit, reset, formState:{errors}} = useForm();
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Login register={register} handleSubmit={handleSubmit} errors={errors} reset={reset}/>}/>
        <PrivateRoute exact path="/App" children={<Application register={register} handleSubmit={handleSubmit} errors={errors} reset={reset}/>}/>
      </Switch>
    </Router>
  );
}

export default App;

