/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Timelog } from './Timelog';

function ModalData({ handleClose, show, TimeData, setTimeData }) {
    const saveData = () => {
        localStorage.setItem('timelogs', JSON.stringify(TimeData));
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Your Break Time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {TimeData?.punch ? <Timelog setTimeData={setTimeData} TimeData={TimeData} /> : ""}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => saveData()}>
                    Save Logs
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalData