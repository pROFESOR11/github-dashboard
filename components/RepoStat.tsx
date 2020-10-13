import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  statText: {
    fontSize: "0.8rem",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function RepoStat({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: String;
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography className={classes.statText} color="textSecondary">
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}
