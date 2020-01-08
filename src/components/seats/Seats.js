import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8)
  }
}));

const Seats = () => {
  const classes = useStyles();

  const purchaseData = useSelector(state => {
    return state.purchaseData.session;
  }, shallowEqual);
  //create redirect
  return (
    <>
      {purchaseData && (
        <div>
          {purchaseData.cinema}:{purchaseData.time}
        </div>
      )}
    </>
  );
};

export default Seats;
