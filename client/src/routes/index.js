import React, { Component } from "react";
import Details from "./Details/Details";
import MainPage from "./MainPage/MainPage";
import Review from "./Review/Review";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import setAuthToken from "../utils/setAuthToken";
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token

  // Set user

  // Check for expired token
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{ margin: -20 }}>
            <Route exact path="/" component={MainPage} />
            <Route path="/about" component={Details} />
            <Route path="/review" component={Review} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
