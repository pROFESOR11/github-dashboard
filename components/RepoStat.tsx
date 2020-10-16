import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import WithTooltip from "./WithTooltip";

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
  tooltip,
}: {
  icon: React.ReactNode;
  text: String;
  tooltip: String;
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item>{icon}</Grid>
      <WithTooltip tooltip={tooltip}>
        <Grid item>
          <Typography className={classes.statText} color="textSecondary">
            {text}
          </Typography>
        </Grid>
      </WithTooltip>
    </Grid>
  );
}
