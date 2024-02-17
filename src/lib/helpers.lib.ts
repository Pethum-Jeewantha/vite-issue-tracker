import {format} from "date-fns";

export const formatDate = (inputDate: any, type: string) => {
    const date = new Date(inputDate.endsWith('Z') ? inputDate : inputDate + 'Z');
    return format(date, type);
};
