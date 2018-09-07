import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import RemoveButton from './RemoveButton';
import CancelButton from './CancelButton';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#aaa'
  }
};

const RemoveModal = (props) => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.handleCancel}
    style={customStyles}
  >
    <div className="bg-dark text-white p-5">
      <h3 className="text-center p-2">{props.title}</h3>
      <h5 className="text-muted"><i className="fas fa-exclamation-triangle"></i> {props.info}</h5>
      <div className="d-flex justify-content-around">
        <RemoveButton onClick={props.handleRemove} />
        <CancelButton onClick={props.handleCancel} />
      </div>
    </div>
  </Modal>
);

RemoveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  info: PropTypes.string.isRequired,
}

export default RemoveModal;