export default function Validate(start, end ) {
    const inputTime = new Date('2000-01-01T' + start + ':00');
    const compareTime = new Date('2000-01-01T' + end + ':00');

    return inputTime < compareTime;
}