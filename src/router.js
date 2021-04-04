import React from "react";
import {
  // HashRouter,
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Welcome from "./pages/welcome/welcome";
import SignIn from "./pages/sign_in/sign_in";
import SignUp from "./pages/sign_up/sign_up";
import HomePage from "./pages/homepage/homepage";
import NoMatch from "./components/404/404";
import Wrapper from "./components/wrapper/Wrapper";
import { connect } from "react-redux";
// import App from "./App";

class MyRouter extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/welcome" component={Welcome} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
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
const stateToProps = (param) => {
  return param.state;
};
export default connect(stateToProps)(MyRouter);
