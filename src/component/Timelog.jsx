/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { v4 as uuidv4 } from 'uuid';
import CheckTime,{calculateDuration} from './CalculateTime';
import Validate from './ValidateTime';

export const Timelog = ({ TimeData, setTimeData }) => {

    const [logs, setLogs] = useState();
    const [validated, setValidated] = useState(false);
    const [invalidData, setInvalidData] = useState('')
    const data = TimeData;

   

    useEffect(() => {
        setLogs(data.punch);
    }, [data])

    const calculateTime = async (data) => {
        let totaltime = "00:00";
        const logData = await data?.map((log_time, index) => {
            if (index > 0) {
                let breakstart = data[index - 1]?.out;
                let breakend = data[index]?.in;
                const endTime = calculateDuration(breakstart, breakend);
                const addTime = CheckTime(totaltime, endTime);
                totaltime = addTime;
                return addTime.toString();
            }
        });
        if (logData.length) {
            const breakTime = logData[logData.length - 1];
            setTimeData({ ...TimeData, punch: data, totalBreak: breakTime });
        }
    }

    const addTimeLog = () => {
        const timelog = { id: uuidv4(), in: "00:00", out: "00:00" }
        let newlog = [...logs, timelog];
        setLogs(newlog);
        setTimeData({ ...TimeData, punch: newlog });
    }

    const updateTime = (event, status, log, previous_log) => {
        const { id, value, name } = event.target;
        const startTime = name === 'in' ? previous_log?.out : log.in;
        const endTime =value;
        const DefaultTime = CheckTime("00:05", endTime);
        const valid = Validate(startTime, endTime);
        if (valid) {
            const update_Time = logs?.map((list) => list.id === id  ? name == 'in' ?  { ...list, [name]: value, ['out']:DefaultTime} :  { ...list, [name]: value} : list);
            const removeTimeLogs = logs?.filter((list) => list.id !== id);
            const updateTimeLogs = status ? update_Time : removeTimeLogs
            setLogs(updateTimeLogs);
            setValidated(valid)
            setInvalidData('')
            if (logs.length > 1) {
                calculateTime(updateTimeLogs);
            } else {
                setTimeData({ ...TimeData, punch: updateTimeLogs, totalBreak: "00:00" });
            }
        } else if(!status){
            const removeTimeLogs = logs?.filter((list) => list.id !== id);
            setLogs(removeTimeLogs);
            if (removeTimeLogs.length > 1) {
                calculateTime(removeTimeLogs);
            } else {
                setTimeData({ ...TimeData, punch: removeTimeLogs, totalBreak: "00:00" });
            }
        }
        else  {
            setValidated(!valid)
            setInvalidData(event.target)
        }
    }

    return (
        <>
            <div className='d-flex justify-content-end '>
                <Button onClick={() => addTimeLog()}>+</Button>
            </div>
            {logs?.length ? logs?.map((list, index) => {
                return (
                    <div key={list.id}>
                        <Form >
                            <div className='d-flex justify-content-between m-3' >
                                <Button disabled={index === 0} id={list.id} onClick={(e) => updateTime(e, false, list)} variant='danger'>-</Button>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        &nbsp; &nbsp; In :
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control disabled={index === 0} name="in" id={list.id} onChange={(e) => updateTime(e, true, list, logs[index-1] )} value={list.in || "00:00"} type="time" isInvalid={validated && invalidData.name == 'in' && invalidData.id === list.id} />
                                        <Form.Control.Feedback type="invalid">
                                            Time must be greater than {logs[index - 1]?.out}.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Out :
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control name="out" id={list.id} onChange={(e) => updateTime(e, true, list)} value={list.out || "00:00"} type="time" isInvalid={validated && invalidData.name == 'out' && invalidData.id === list.id} />
                                        <Form.Control.Feedback type="invalid">
                                            Time must be greater than {list.in}.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                            </div>
                        </Form>
                    </div>
                )
            }) : ""}
        </>
    )
}
