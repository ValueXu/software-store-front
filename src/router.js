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
// import App from "./App";

class MyRouter extends React.Component {
  routesConfig = [
    {
      type: 0,
      paths: [
        {
          path: "/downloadRecords",
          component: HomePage,
        },
        {
          path: "/softwareAdmin",
          component: HomePage,
        },
        {
          path: "/userAdmin",
          component: HomePage,
        },
        {
          path: "/userCenter/message",
          component: HomePage,
        },
        {
          path: "/userCenter/scored",
          component: HomePage,
        },
      ],
    },
  ];

  renderSplitedRoute = (type) => {
    let paths = [];
    for (let i = 0; i < this.routesConfig.length; i++) {
      if (this.routesConfig[i].type === type) {
        paths = this.routesConfig[i].paths;
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
                      <Route exact path="/softwares">
                        <Route exact path="/softwares/game"></Route>
                        <Route exact path="/softwares/software"></Route>
                        <Route exact path="/softwares/others"></Route>
                      </Route>
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
