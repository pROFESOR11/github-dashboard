import {
  Container,
  Box,
  makeStyles,
  CircularProgress,
  Button,
  Input,
} from "@material-ui/core";
import React from "react";
import { NextSeo } from "next-seo";
import { QueryCache, useInfiniteQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { getRepos } from "../api/getRepos";

import RepoCards from "../components/RepoCards";
import useIntersectionObserver from "../src/useIntersectionObserver";
import { deleteUndefined } from "../utils/deleteUndefined";

const initialSearchQuery = "front end";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    padding: "1rem",
  },
  header: {
    display: "flex",
    margin: "5rem 0",
  },
  searchInput: {
    margin: "0 2rem 0 0",
  },
  loading: {
    margin: "2rem 0",
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default function Landing() {
  const [queryStr, setqueryStr] = React.useState(initialSearchQuery);
  const [searchStr, setsearchStr] = React.useState(initialSearchQuery);

  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  const {
    data,
    isError,
    fetchMore,
    canFetchMore,
    isFetchingMore,
  } = useInfiniteQuery(["repos", queryStr], getRepos, {
    getFetchMore: (lastPage, allPages) => {
      // meaning there is no more to fetch
      if (!lastPage.hasMore) return false;
      return (
        // group by 40 and get the next 40 items
        allPages.reduce((acc, val) => acc + (val.items.length ?? 0), 0) / 40 +
          1 || 1
      );
    },
  });

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchMore,
    enabled: canFetchMore && !isError,
    threshold: 0, // meaning as soon as even one pixel is visible, the callback will be run
  });

  const classes = useStyles();

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setsearchStr(e.target.value);
  };

  const handleSearch = React.useCallback(() => {
    setqueryStr(searchStr);
  }, [searchStr, setqueryStr]);

  function keyPress(
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    if (event.key == "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <NextSeo
        title={`Github Repo Explorer - ${queryStr}`}
        description="Github Repository Explorer"
      />
      <Container maxWidth="xl" className={classes.root}>
        <Box className={classes.header}>
          <Input
            id="search-repo"
            inputProps={{ "aria-label": "Search for a topic" }}
            onKeyDown={keyPress}
            value={searchStr}
            onChange={handleSearchChange}
            fullWidth
            className={classes.searchInput}
          />

          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <RepoCards paginatedData={data} isError={isError} />
        <div ref={loadMoreRef}>
          {isFetchingMore && (
            <Box className={classes.loading}>
              <CircularProgress size="5rem" />
            </Box>
          )}
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const queryCache = new QueryCache();

  // prefetch first page here
  await queryCache.prefetchQuery(
    ["getRepos", { queryStr: initialSearchQuery, page: 1 }],
    getRepos
  );

  const dehydratedState = dehydrate(queryCache);

  if (!dehydratedState) return null;

  return {
    props: deleteUndefined({
      dehydratedState,
    }),
  };
}
