import { useEffect, useContext } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import "./App.css";
import 'antd/dist/antd.css';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Admin from './pages/Admin/Admin';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import { authContext } from "./contexts/AuthContext/AuthProvider";


function App() {
  const { init, userType, isAuthenticated } = useContext(authContext);

  useEffect(() => {
    init();
  }, [init])
  return (
    <div className="App">
      <Switch>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Signin />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/">
          {
            isAuthenticated ? (
              <Home userType={userType} />
            ) : (
                <Redirect to="/login" />
              )
          }
        </Route>
      </Switch>
    </div>
  );
}

export default App;
