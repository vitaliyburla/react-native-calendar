import { DateTime } from 'luxon';

export const getDaysInMonthByDate = (date: DateTime) => {
    const start = date.startOf('month').startOf('week');
    const countOfDays = date
        .endOf('month')
        .diff(start, ['days'])
        .toObject()
        .days!.toFixed();

    return [...Array(+countOfDays)].map((_, i) => start.plus({ days: i }));
};
