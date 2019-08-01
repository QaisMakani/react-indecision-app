import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel="SelectedOption"
        onRequestClose={props.clearSelectedOption}      //To handle clicking outside or pressing esc key
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">Selected Option</h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button className="button" onClick={props.clearSelectedOption}>Okay</button>
    </Modal>
);

export default OptionModal;