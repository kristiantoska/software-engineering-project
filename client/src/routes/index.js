import React, { Component } from "react";
import Details from "./Details/Details";
import MainPage from "./MainPage/MainPage";
import Review from "./Review/Review";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducers from "../reducers";

let store = createStore(reducers);

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
