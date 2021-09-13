import React from "react";
import PropTypes from "prop-types";
import "./style/MsgModal.css";

import { Modal } from "react-bootstrap";
const MsgModal = (props: {
  show: boolean;
  handleClose: Function;
  title: string;
  msg: any;
  color: string;
  icon: any;
  error:boolean
}) => {
  const { show, handleClose, msg, title, color, icon, error } = props;

  return (
    <div>
      <Modal
        backdropClassName="backdrop-msg-modal"
        contentClassName={`content-msg-modal ${
          msg ? "with-msg" : "without-msg"
        } ${
         error ? "error" : "msg"
        }`}
        dialogClassName="dialog-msg-modal"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header
          style={{ backgroundColor: color }}
          className="modal-header-msg-modal"
        >
          <Modal.Title className="title-header-msg-modal">
            {title} {icon}
          </Modal.Title>
        </Modal.Header>
        {msg && <Modal.Body>{msg}</Modal.Body>}
      </Modal>
    </div>
  );
};

MsgModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  msg: PropTypes.any,
  color: PropTypes.string,
  error: PropTypes.bool
};

export default MsgModal;
