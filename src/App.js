import { useEffect, useContext } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import "./App.css";
import 'antd/dist/antd.css';
import Menu from './components/Menu/Menu'
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Admin from './pages/Admin/Admin';
import Home from './pages/Home/Home';
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
          <h1>search page is currently in progress</h1>
        </Route>
        <Route exact path="/">
          {
            isAuthenticated ? (
              <Home userType={userType} />
            ) : (
                <Redirect to="/login" />
              )
          }
          {/* <h1>homepage is yet to be made, please use these following buttons to move to other pages</h1>
          <Link to="/signup"><button>signup</button></Link>
          <Link to="/login"><button>login</button></Link> */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
