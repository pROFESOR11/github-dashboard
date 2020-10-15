import { Box, makeStyles, Tooltip } from "@material-ui/core";
import React from "react";

interface ClickableNavigatorProps {
  url: string;
  tooltip?: string | React.ReactNode;
}

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
  },
  tooltip: {
    backgroundColor: "white",
    color: "#2a2a72",
    fontWeight: "bold",
  },
});

const ClickableNavigator: React.FC<ClickableNavigatorProps> = ({
  url,
  tooltip,
  children,
}) => {
  const classes = useStyles();

  const handleClick = React.useCallback(() => {
    window.open(url, "_blank");
  }, [url]);

  const clickableComponent = (
    <Box className={classes.root} onClick={handleClick}>
      {children}
    </Box>
  );

  if (tooltip) {
    return (
      <Tooltip
        classes={{
          tooltip: classes.tooltip,
        }}
        title={tooltip}
      >
        {clickableComponent}
      </Tooltip>
    );
  }

  return clickableComponent;
};

export default ClickableNavigator;
