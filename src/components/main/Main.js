import React from "react";
import MoviesChart from "../moviesChart/MoviesChart";
import "./Main.scss";

const Main = () => {
  return (
    <main>
      <div>Filter bar</div>
      <MoviesChart />
    </main>
  );
};

export default Main;
