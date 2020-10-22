import React from "react";
import { SearchResponse } from "../api/types";
import {
  Box,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import RepoCard from "./RepoCard";

interface Repos {
  paginatedData: SearchResponse[] | undefined;
  isError: Boolean;
}

const RepoCards = React.memo(({ paginatedData, isError }: Repos) => {
  const classes = useStyles();

  if (isError) {
    return (
      <Box className={classes.indicator}>
        <Typography color="textSecondary">Something went wrong</Typography>
      </Box>
    );
  }

  if (!paginatedData)
    return (
      <Box className={classes.indicator}>
        <CircularProgress color="primary" size="5rem" />
      </Box>
    );
  if (paginatedData.length === 0 || paginatedData[0]?.items?.length === 0)
    return (
      <Box className={classes.indicator}>
        <Typography color="textSecondary">
          No repo found with these keywords..
        </Typography>
      </Box>
    );

  return (
    <Grid container spacing={3}>
      {/* paginatedData is an array, each item consists SearchResponse with items in it 
        its size gets bigger with infinite scrolling */}
      {paginatedData.map((searchResponse: SearchResponse) =>
        searchResponse?.items?.map((repo) => (
          <Grid item key={repo.id} xl={3} md={4} sm={6} xs={12}>
            <RepoCard repo={repo} />
          </Grid>
        ))
      )}
    </Grid>
  );
});

export default RepoCards;

const useStyles = makeStyles({
  indicator: {
    margin: "2rem 0",
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
