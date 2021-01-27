import React, { ReactChild, ReactChildren } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
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
    textField: {
      width: 40,
    },
  })
);

interface ListItemIntProps {
  value: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  iconComponent?: ReactChild | ReactChildren;
  title: string;
  description: string;
  minValue?: number;
  handleChange?: (value: number) => void;
}

const ListItemInt = ({
  value,
  iconComponent,
  title,
  description,
  minValue,
  handleChange,
}: ListItemIntProps): JSX.Element => {
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
        <TextField
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (handleChange) {
              handleChange(parseInt(event.target.value, 10));
            }
          }}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: {
              min: minValue,
            },
          }}
          margin="none"
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

ListItemInt.defaultProps = {
  iconComponent: undefined,
  minValue: 1,
  handleChange: undefined,
};

export default React.memo(ListItemInt);
