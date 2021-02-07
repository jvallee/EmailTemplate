import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type ModalProps = {
  clickDraftHandler: () => void;
  clickSavedHandler: () => void;
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { clickDraftHandler, clickSavedHandler, isOpen } = props;

  return (
    <div>
      <Dialog
        fullScreen={false}
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Would you like to view Draft or Published Templated"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have an unpublished draft would you like to view it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={clickDraftHandler} color="primary">
            Use Draft
          </Button>
          <Button onClick={clickSavedHandler} color="primary" autoFocus>
            Use Published
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
