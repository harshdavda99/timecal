export default function CheckTime(time1, time2) {
    // Split the time strings into hours and minutes
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);

    // Add hours and minutes separately
    let totalHours =  (hours1 + hours2);
    let totalMinutes =  (minutes1 + minutes2) ;

    // If total minutes exceed 60, adjust hours and minutes
    if (totalMinutes >= 60) {
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;
    }

    // Convert hours and minutes to string format
    const formattedHours = String(Math.abs(totalHours)).padStart(2, '0');
    const formattedMinutes = String(Math.abs(totalMinutes)).padStart(2, '0');

    // Return the sum in HH:MM format
    return formattedHours + ":" + formattedMinutes;
}

export function calculateDuration(startTime, endTime) {
    // Parse start and end times
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    // Calculate duration
    let durationMinutes = end.minutes - start.minutes;
    let durationHours = end.hours - start.hours;

    // Handle cases where subtraction results in negative minutes
    if (durationMinutes < 0) {
        durationMinutes += 60;
        durationHours--;
    }

    // Format duration
    let formattedDuration = padZero(durationHours) + ":" + padZero(durationMinutes);

    return formattedDuration;
}

// Function to parse time string and return hours and minutes
function parseTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return { hours, minutes };
}

// Function to pad single digit numbers with leading zero
function padZero(num) {
    return num < 10 ? "0" + num : num;
}

// Example usage
// 
