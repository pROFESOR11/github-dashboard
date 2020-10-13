import React from "react";
import { SearchResponse } from "../api/types";
import { Grid } from "@material-ui/core";
import RepoCard from "./RepoCard";

interface Repos {
  paginatedData: SearchResponse[] | undefined;
}

const RepoCards = React.memo(({ paginatedData }: Repos) => {
  // TODO: Handle Not Found & Loading UI
  if (!paginatedData) return <div>loading</div>;
  if (paginatedData.length === 0) return <div>not found</div>;

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
