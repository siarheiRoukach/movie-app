import React, { useState } from "react";
import { useDispatch } from "react-redux";

import ListCinemaSessions from "../listCinemaSessions/ListCinemaSessions";
import { bookMovieSession } from "../../redux/modules/purchaseData";

const CinemaSessions = ({ cinemaSessions }) => {
  const dispatch = useDispatch();

  const bookSession = (cinema, time) => {
    setSelected({ cinema: cinema, time: time });
    dispatch(bookMovieSession({ cinema: cinema, time: time }));
  };
  const [selected, setSelected] = useState({});

  const listSessions =
    cinemaSessions &&
    cinemaSessions.map((cinema, index) => {
      return (
        <ListCinemaSessions
          key={index}
          bookSession={bookSession}
          movieSessions={cinema}
          selected={selected}
        />
      );
    });

  return <>{listSessions}</>;
};

export default CinemaSessions;
