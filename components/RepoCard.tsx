import React from "react";
import { Repo } from "../api/types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar, CardHeader, Box } from "@material-ui/core";
import RepoStats from "./RepoStats";
import UpdateIcon from "@material-ui/icons/Update";
import WithTooltip from "./WithTooltip";

const RepoCard = React.memo(({ repo }: { repo: Repo }) => {
  const {
    id,
    name,
    full_name,
    html_url,
    description,
    created_at,
    updated_at,
    homepage,
    stargazers_count,
    forks_count,
    watchers_count,
  } = repo;
  const { login, avatar_url, html_url: ownerUrl } = repo.owner;

  const classes = useStyles();

  const repoName = full_name.split("/")[1];

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <WithTooltip url={ownerUrl} tooltip={`Go to ${login} profile`}>
            <Avatar src={avatar_url} alt={login} />
          </WithTooltip>
        }
        title={
          <WithTooltip
            url={html_url}
            tooltip="Open Repo"
            tooltipProps={{
              arrow: true,
              placement: "bottom-start",
            }}
          >
            <Typography>{repoName}</Typography>
          </WithTooltip>
        }
        subheader={
          <Box className={classes.subHeader}>
            <Typography>{login}</Typography>
            <Box className={classes.subHeaderRight}>
              <UpdateIcon />
              <WithTooltip tooltip="Last update">
                <Typography className={classes.updatedText} variant="subtitle2">
                  {new Date(updated_at).toLocaleDateString()}
                </Typography>
              </WithTooltip>
            </Box>
          </Box>
        }
      />

      <Box className={classes.spaceBetween}>
        <CardContent className={classes.body}>
          <Typography color="textSecondary" gutterBottom>
            {description}
          </Typography>
        </CardContent>
        <Box className={classes.footer}>
          <RepoStats
            stats={{ stargazers_count, forks_count, watchers_count }}
          />
        </Box>
      </Box>
    </Card>
  );
});

export default RepoCard;

const useStyles = makeStyles({
  root: {
    backgroundColor: "#2a2a72",
    height: "20rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
  },
  spaceBetween: {
    display: "flex",
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  body: {
    overflow: "scroll",
    maxHeight: "12rem",
  },
  header: {
    borderBottom: "1px dotted grey",
    overflow: "hidden",
  },
  subHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeaderRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    minHeight: "3rem",
    display: "flex",
    borderTop: "1px solid grey",
    textAlign: "center",
    verticalAlign: "center",
  },
  updatedText: {
    marginLeft: "0.15rem",
  },
});
