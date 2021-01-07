import { useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom'
import "./App.css";
import "antd/dist/antd.css";
import Menu from './components/Menu/Menu'
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Admin from './pages/Admin/Admin';
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
          <Menu />
          <h1>search page</h1>
        </Route>
        <Route exact path="/">
          <h1>homepage is yet to be made, please navigate to other pages for demo</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
