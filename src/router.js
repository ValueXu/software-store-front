import React from "react";
import {
  // HashRouter,
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Welcome from "./pages/welcome/welcome";
import SignIn from "./pages/sign_in/SignIn";
import SignUp from "./pages/sign_up/SignUp";
import HomePage from "./pages/homepage/homepage";
import NoMatch from "./components/404/404";
import Wrapper from "./components/wrapper/Wrapper";
import { connect } from "react-redux";
import Games from "./pages/softwares/games/Games";
import Softwares from "./pages/softwares/softwares/Softwares";
import Others from "./pages/softwares/others/Others";
// import App from "./App";

import "./styles/common.less";
import Detail from "./pages/softwares/detail/Detail";

import { routesConfig } from "./configs/permissionConfig";
import { signIn } from "./redux/action/signActions";

class MyRouter extends React.Component {
  renderSplitedRoute = (type) => {
    let paths = [];
    for (let i = 0; i < routesConfig.length; i++) {
      if (routesConfig[i].type === type) {
        paths = routesConfig[i].paths;
        break;
      }
    }
    let routes = paths.map((item) => {
      return (
        <Route
          exact
          key={item.path}
          path={item.path}
          component={item.component}
        ></Route>
      );
    });
    return routes;
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(signIn(JSON.parse(userInfo)));
    }
  }

  render() {
    return (
      <div className="router">
        <BrowserRouter>
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/signin">
              <Welcome>
                <SignIn />
              </Welcome>
            </Route>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/">
              <Redirect from="/" to="/welcome" />
            </Route>
            <Route
              path="/"
              render={() => {
                return (
                  <Wrapper>
                    <Switch>
                      <Route exact path="/homepage" component={HomePage} />
                      <Route path="/softwares">
                        <Route
                          exact
                          path="/softwares/games"
                          component={Games}
                        />
                        <Route
                          exact
                          path="/softwares/software"
                          component={Softwares}
                        ></Route>
                        <Route
                          exact
                          path="/softwares/others"
                          component={Others}
                        ></Route>
                      </Route>
                      <Route exact path="/detail/:id" component={Detail} />
                      {this.renderSplitedRoute(this.props.userInfo.type)}
                      <NoMatch />
                    </Switch>
                  </Wrapper>
                );
              }}
            />
            <NoMatch />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
const stateToProps = (state) => {
  return {
    userInfo: state.signChangeReducer.userInfo,
  };
};
export default connect(stateToProps)(MyRouter);
