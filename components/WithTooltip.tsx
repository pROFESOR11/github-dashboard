import { Box, makeStyles, Tooltip, TooltipProps } from "@material-ui/core";
import React from "react";

interface WithTooltipProps {
  url?: string;
  tooltip: string | React.ReactNode;
  tooltipProps?: Partial<TooltipProps>;
}

const useStyles = makeStyles({
  pointer: {
    cursor: "pointer",
  },
  help: {
    cursor: "help",
  },
  tooltip: {
    backgroundColor: "white",
    color: "#2a2a72",
    fontWeight: "bold",
  },
});

const WithTooltip: React.FC<WithTooltipProps> = ({
  url,
  tooltip,
  tooltipProps,
  children,
}) => {
  const classes = useStyles();

  const handleClick = React.useCallback(() => {
    if (!url) return;
    window.open(url, "_blank");
  }, [url]);

  const clickableComponent = (
    <Box className={url ? classes.pointer : classes.help} onClick={handleClick}>
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
        {...tooltipProps}
      >
        {clickableComponent}
      </Tooltip>
    );
  }

  return clickableComponent;
};

export default WithTooltip;
