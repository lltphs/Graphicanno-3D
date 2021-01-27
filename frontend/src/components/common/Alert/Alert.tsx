import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

interface AlertProps {
  handleClose: () => void;
  handleSubmit: () => void;
  isOpen: boolean;
  hasTwoButtons: boolean;
  submitButtonText: string;
  title: string;
  text: string;
}

const Alert = (props: AlertProps): JSX.Element => {
  const {
    handleClose,
    handleSubmit,
    isOpen,
    hasTwoButtons,
    submitButtonText,
    title,
    text,
  } = props;

  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {hasTwoButtons ? (
          <Button
            onClick={() => {
              handleClose();
            }}
            variant="contained"
            color="primary"
          >
            CANCEL
          </Button>
        ) : null}
        <Button
          onClick={() => {
            handleSubmit();
          }}
          color="primary"
        >
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(Alert);
