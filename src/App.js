import React from "react";
import "./styles.css";
import Home from "./Home";
import StoresList from "./StoresList";
import StoreDetails from "./StoreDetails";
import { Link, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <Switch>
        <Route exact path="/shop/store-detail-:storeId/">
          <StoreDetails />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/shop/:country">
          <StoresList />
        </Route>
        <Route exact path="/shop/:country/:city">
          <StoresList />
        </Route>
      </Switch>
    </div>
  );
}
