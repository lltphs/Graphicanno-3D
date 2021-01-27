import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, ButtonProps } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

interface ReactButtonProps extends ButtonProps {
  active?: boolean;
  variant: 'outlined' | 'contained';
}

const ReactButton = ({
  active,
  variant,
  children,
  ...rest
}: ReactButtonProps): JSX.Element => {
  const classes = useStyles();

  const [isHover, setIsHover] = React.useState(false);

  const reverseVariant = (
    currentVariant: 'outlined' | 'contained'
  ): 'outlined' | 'contained' => {
    if (currentVariant === 'outlined') return 'contained';
    return 'outlined';
  };

  return (
    <Button
      variant={active || !isHover ? variant : reverseVariant(variant)}
      className={classes.margin}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Button>
  );
};

ReactButton.defaultProps = {
  active: false,
};

export default React.memo(ReactButton);
