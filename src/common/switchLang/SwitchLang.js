import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  wrapper: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",

      justifyContent: "center"
    }
  }
}));

const AntSwitch = withStyles({
  switchBase: {
    color: "#2196F3",
    "&$checked": {
      color: "#FE6B8B"
    },
    "&$checked + $track": {
      backgroundColor: "#FE6B8B"
    }
  },
  checked: {},
  track: { backgroundColor: "#2196F3" }
})(Switch);

const SwitchLang = props => {
  const { i18n } = useTranslation();
  const classes = useStyles();
  const [lang, setLang] = useState(
    localStorage.getItem("i18nextLng") !== "en-US"
  );

  useEffect(() => {
    lang ? i18n.changeLanguage("ja-JP") : i18n.changeLanguage("en-US");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <Typography component="div">
      <Grid
        component="label"
        container
        alignItems="center"
        spacing={1}
        className={classes.wrapper}
      >
        <Grid item>En</Grid>
        <Grid item>
          <AntSwitch
            checked={lang}
            onChange={() => setLang(!lang)}
            value="lang"
          />
        </Grid>
        <Grid item>日本語</Grid>
      </Grid>
    </Typography>
  );
};
export default SwitchLang;
