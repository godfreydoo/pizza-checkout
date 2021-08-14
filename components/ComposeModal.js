import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Selection.module.scss';
import { makeStyles, Button, Fade, Modal, Backdrop } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const ComposeModal = (props) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(true);

  return (
    <Modal
      open={showModal}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={showModal}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h1>Choose toppings and pizza size</h1>
            <Button
              endIcon={<CloseIcon />}
              role="button"
              onClick={() => {
                setShowModal(false);
                props.setModalStatus(false);
              }}></Button>
          </div>
          {props.body}
        </div>
      </Fade>
    </Modal>
  );
};

ComposeModal.propTypes = {
  setShowModalStatus: PropTypes.func,
  body: PropTypes.object
};

export default ComposeModal;