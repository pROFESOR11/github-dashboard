import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import ShareIcon from "@material-ui/icons/Share";
import PeopleIcon from "@material-ui/icons/People";
import RepoStat from "./RepoStat";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
});

interface RepoStatsProps {
  stats: {
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
  };
}

export default function RepoStats({ stats }: RepoStatsProps) {
  const classes = useStyles();
  const { stargazers_count, forks_count, watchers_count } = stats;

  const statisticItems = [
    { id: "0", icon: <StarIcon color="action" />, text: stargazers_count },
    { id: "1", icon: <ShareIcon color="action" />, text: forks_count },
    { id: "2", icon: <PeopleIcon color="action" />, text: watchers_count },
  ];
  return (
    <Box className={classes.root}>
      {statisticItems.map((stat) => (
        <RepoStat key={stat.id} icon={stat.icon} text={stat.text.toString()} />
      ))}
    </Box>
  );
}
