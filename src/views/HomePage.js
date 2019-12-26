import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../components/header/Header";
import DefaultMain from "../components/defaultMain/DefaultMain";
import MovieCard from "../components/movieCard/MovieCard";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={DefaultMain} />
        <Route exact path="/movie/:id" component={MovieCard} />
      </Switch>
      <Footer />
    </>
  );
};

export default HomePage;
