import React from "react";
import { SearchResponse } from "../api/types";
import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import RepoCard from "./RepoCard";

interface Repos {
  paginatedData: SearchResponse[] | undefined;
}

const RepoCards = React.memo(({ paginatedData }: Repos) => {
  const classes = useStyles();

  // TODO: Handle Not Found & Loading UI
  if (!paginatedData)
    return (
      <Box className={classes.indicator}>
        <CircularProgress color="secondary" size="5rem" />
      </Box>
    );
  if (paginatedData.length === 0) return <div>TODO: not found</div>;

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
