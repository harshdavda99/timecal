import { useEffect, useState } from 'react'
import CheckTime, { calculateDuration } from './CalculateTime';
import Validate from './ValidateTime';
export default function TimeDetails() {
    const getLocalData = JSON.parse(localStorage?.getItem('timelogs'));
    const [MyTime, setMyTime] = useState({
        currentTime: "00:00",
        leaveTime: "00:00",
        status: false,
        timeleft: "00:00",
        overTime: false
    });

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    useEffect(() => {
        printTime();
    }, [])

    function remainingTime(endTime, activeTime) {
        // const leavedOffice = getLocalData?.punch[getLocalData?.punch.length - 1];
        const isvalid = Validate(endTime, activeTime);
        if (!isvalid) {
            return {
                status: isvalid,
                timeLog: calculateDuration(activeTime, endTime),
                overTime: false
            }
        } else {
            return {
                status: Validate(endTime, activeTime),
                timeLog: calculateDuration(endTime, activeTime),
                overTime: Validate(endTime, activeTime),
            }
        }
    }

    function printTime() {
        const activeTime = getCurrentTime();
        if (getLocalData !== null) {
            if (getLocalData.officeInTime !== "00:00") {
                const leaveTime = CheckTime(CheckTime(getLocalData?.workingHours, getLocalData?.officeInTime), getLocalData.totalBreak)
                const check_Time = remainingTime(leaveTime, activeTime)
                setMyTime({ ...MyTime, currentTime: activeTime, overTime: check_Time.overTime, leaveTime: leaveTime, timeleft: check_Time?.timeLog, status: check_Time.status })
            } else {
                console.log('your are not in the office')
            }
        } else {
            setMyTime({ ...MyTime, currentTime: activeTime })
        }
    }

    setInterval(printTime, 30000);

    const styleTimeDetails = {
        minWidth: '17rem'
    }
    return (
        <div style={styleTimeDetails} >
            <div className="fs-6  badge bg-light w-100 text-dark " >
                Time Completed ? <span className={`badge fs-6 ${MyTime?.status ? 'bg-success' : 'bg-danger'}`}>{MyTime?.status ? 'Yes' : 'No'}</span>
            </div>
           
            <div className="container text-center">
                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6"> <span className="badge bg-success fs-4">Current Time</span></div>
                    <div className="col-sm-6" > <span className="badge bg-success fs-4">{MyTime?.currentTime}</span></div>
                    <div className="col-sm-6 mt-5"><span className="badge bg-success fs-4">Time to leave</span></div>
                    <div className="col-sm-6 mt-5"><span className="badge bg-success fs-4">{MyTime?.leaveTime}</span></div>
                </div>
            </div>
            {(MyTime?.timeleft != "00:00" && MyTime.status == false) ?
                <div className="fs-4 m-3 text-start  badge bg-light w-100 text-dark " >
                    Still need to cover  <span className={`badge fs-6 ${MyTime?.status ? 'bg-success' : 'bg-danger'}`}>{MyTime?.timeleft}</span>
                </div>
                :
                <div className="fs-4 m-3 text-start  badge bg-light w-100 text-dark " >
                    હવે તો ઘરે જા  <span className={`badge fs-6 ${MyTime?.status ? 'bg-success' : 'bg-danger'}`}>{MyTime?.timeleft}</span> <img className='m-2' src="/assets/smile.gif" />
                </div>
            }
          
        </div>
    )
}
