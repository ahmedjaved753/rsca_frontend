import { useEffect, useContext } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import "./App.css";
// <<<<<<< HEAD
// import 'antd/dist/antd.css';
// import Signup from './pages/Signup/Signup';
// import Signin from './pages/Signin/Signin';
// import Admin from './pages/Admin/Admin';
// import Home from './pages/Home/Home';
// import Search from './pages/Search/Search';
// =======
import "antd/dist/antd.css";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Navbar from './components/Navbar/Navbar'
import PostMapPage from "./pages/PostsPage/PostMapPage";
import { PostsContextProvider } from "./contexts/PostsContext/postContext";
import ROISearch from "./pages/ROISearch/ROISearch";

import { authContext } from "./contexts/AuthContext/AuthProvider";


function App() {
  const { init, userType, isAuthenticated } = useContext(authContext);

  useEffect(() => {
    init();
  }, [init]);
  return (
    <PostsContextProvider>
      <div className="App">
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Signin />
          </Route>
          <Route exact path="/roi">
            <ROISearch />
          </Route>
          <Route exact path="/posts">
            <PostMapPage />
          </Route>
          <Route exact path="/admin">
            <Admin userType={userType} />
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
    </PostsContextProvider>
    // <Navbar />
  );
}

export default App;
