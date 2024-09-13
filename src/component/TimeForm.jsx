import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { v4 as uuidv4 } from 'uuid';
import ModalData from './Madal';
import CheckTime from './CalculateTime';
export default function TimeForm() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const timelog = {
		id: uuidv4(),
		in: "00:00",
		out: "00:00"
	}
	const currentDate = new Date();
	
	const defaultData = {
		workingHours: "08:30",
		officeInTime: "00:00",
		totalBreak: "00:15",
		punch: [timelog],
		Today_Date: currentDate.setHours(0, 0, 0, 0)
	}

	const getLocalData = JSON.parse(localStorage?.getItem('timelogs'));
	const [TimeData, setTimeData] = useState(getLocalData != null ? getLocalData : defaultData);
	
	useEffect(() =>{
		if(getLocalData != null && getLocalData?.Today_Date !==  currentDate.setHours(0, 0, 0, 0) ){
			localStorage.removeItem('timelogs');
			setTimeData(defaultData);
		}
	},[]);
	
	const formStyle = {
		minWidth: '35vw',
		minHeight: '35vh',
	}

	const saveData = () => {
		localStorage.setItem('timelogs', JSON.stringify(TimeData));
		handleClose();
	}

	return (
		<div style={formStyle}>
			<div className="fs-4  badge bg-success w-100 text-wrap mb-3" >
				Time Calculation based on  <span className='text-danger'>[24 hrs]</span>
			</div>
			<Form>
				<Form.Group as={Row} className="mb-3">
					<Form.Label column sm="4">
						Working hours:
					</Form.Label>
					<Col sm="8">
						<Form.Control type="time" value={TimeData?.workingHours} onChange={(e) => setTimeData({ ...TimeData, ['workingHours']: e?.target?.value })} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-3">
					<Form.Label column sm="4">
						Office In Time:
					</Form.Label>
					<Col sm="8">
						<Form.Control type="time" value={TimeData?.officeInTime} onChange={(e) => {
							const endTime = e?.target?.value;
							const DefaultTime = CheckTime("00:15", endTime);
							const newdat = [{ ...timelog, ['in']: e?.target?.value, ['out']: DefaultTime }];
							return setTimeData({ ...TimeData, punch: newdat, officeInTime: e?.target?.value })
						}
						} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3">
					<Form.Label column sm="4">
						Total break:
					</Form.Label>
					<Col sm="8">

						<Form.Control value={TimeData?.totalBreak} disabled={TimeData?.punch[0]?.in === "00:00"} readOnly onClick={handleShow} />
					</Col>
				</Form.Group>
				<Button variant="success" type="submit" onClick={() => saveData()} >
					Calculate
				</Button>
			</Form>
			<ModalData handleClose={handleClose} handleShow={handleShow} show={show} setShow setTimeData={setTimeData} TimeData={TimeData} />
		</div>
	)
}
