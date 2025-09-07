// 2025-01-01
const pad2 = (num: number): string => num.toString().padStart(2, '0');

const YYYYMMDD = (date: Date) : string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = pad2(date.getMonth() + 1);
    const day = pad2(date.getDate());
    return `${year}-${month}-${day}`;
}

// 2025-01-01 12:00:00
const YYYYMMDDHHMMSS = (date: Date) : string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = pad2(date.getMonth() + 1);
    const day = pad2(date.getDate());
    const hours = pad2(date.getHours());
    const minutes = pad2(date.getMinutes());
    const seconds = pad2(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 오후 12:00
const AM_PM_HHMM = (date: Date) : string => {
    if (!date) return "";
    const hours24 = date.getHours();
    const minutes = pad2(date.getMinutes());
    const period = hours24 < 12 ? "오전" : "오후";
    let hour12 = hours24 % 12;
    if (hour12 === 0) hour12 = 12;
    const hours = pad2(hour12);
    return `${period} ${hours}:${minutes}`;
}

export default {
    YYYYMMDD,
    YYYYMMDDHHMMSS,
    AM_PM_HHMM,
}