import React, { ReactChild, ReactChildren } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { GreyTooltip } from 'components/common/Tooltip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    infoIcon: {
      marginLeft: '5px',
    },
  })
);

interface ListItemBooleanProps {
  value: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  iconComponent?: ReactChild | ReactChildren;
  title: string;
  description: string;
  handleChange?: (value: boolean) => void;
}

const ListItemBoolean = ({
  value,
  iconComponent,
  title,
  description,
  handleChange,
}: ListItemBooleanProps): JSX.Element => {
  const classes = useStyles();

  return (
    <ListItem alignItems="center">
      {iconComponent && <ListItemIcon>{iconComponent}</ListItemIcon>}

      <ListItemText
        primary={
          <Box display="inline-flex" alignItems="center">
            {title}
            <GreyTooltip title={description} placement="top">
              <InfoIcon className={classes.infoIcon} fontSize="small" />
            </GreyTooltip>
          </Box>
        }
      />

      <ListItemSecondaryAction>
        <Switch
          edge="end"
          checked={value}
          onChange={(event, checked) => {
            if (handleChange) {
              handleChange(checked);
            }
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

ListItemBoolean.defaultProps = {
  iconComponent: undefined,
  handleChange: undefined,
};

export default React.memo(ListItemBoolean);
