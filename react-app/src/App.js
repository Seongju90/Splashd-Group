import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Tester from "./components/garbageMaybe/Testing"
import ReviewOneIndex from "./components/ReviewOneIndex"
import OneBeer from "./components/BeerOneIndex";
import ManyBeers from "./components/BeerManyIndex";
import OneBrewery from "./components/BreweryOneIndex";
import MyBadges from "./components/BadgeMyIndex";
import MyBreweries from "./components/BreweryMyIndex";
import MyReviews from "./components/ReviewMyIndex";
import SplashPage from "./components/SplashdLanding";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate())
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  const beer = useSelector((state) => state.onebeer)
  // console.log(beer)
  return (
    <div id='app-js'>
      <Navigation isLoaded={isLoaded} />
      {/* all-content will shift entire content down with top padding to stop nav bar overlap */}
      <div id='all-content' >
      {isLoaded && (

      <Switch>
        <Route exact path="/reviews/:reviewId">
          <ReviewOneIndex />
        </Route>
        <Route path='/beer/:id'>
          <OneBeer beer={beer}/>
        </Route>
        <Route path='/brewery/:id'>
          <OneBrewery></OneBrewery>
        </Route>
        <Route path='/user/badges'>
          <MyBadges/>
        </Route>
        <Route path='/users/:id/brewery'>
          <MyBreweries/>
        </Route>
        <Route path='/users/:id/reviews'>
          <MyReviews/>
        </Route>
        <Route exact path="/">
          <SplashPage/>
        </Route>
        <Route exact path='/beers'>
          <ManyBeers />
        </Route>
        <Route>
          <h1>Sorry! Nothing to see here!</h1>
        </Route>
      </Switch>
      )}
      </div>
    </div>
  );
}

export default App;
