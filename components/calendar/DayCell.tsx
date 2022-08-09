import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React, { FC } from 'react';
import { DateTime } from 'luxon';
import { CalendarDay } from '@components/calendar/types/calendar';

type Props = {
    date: DateTime;
    data?: CalendarDay;
    setDateInfo?: (date: CalendarDay) => void;
};

const getAlpha = (calories: number, limit: number, isPositive: boolean) => {
    const maxAlpha = 100;
    const alphaScope = 80;
    const caloriesPerAlpha = limit / alphaScope;
    return isPositive
        ? 1 - calories / caloriesPerAlpha / maxAlpha
        : (maxAlpha - alphaScope) / maxAlpha +
              (calories - limit) / caloriesPerAlpha / maxAlpha;
};

const DayCell: FC<Props> = ({ date, data, setDateInfo }) => {
    if (!data)
        return (
            <View style={styles.root}>
                <Text>{date.day}</Text>
            </View>
        );

    const isPositive =
        data.total_cal - data.total_cal_burned < data.daily_kcal_limit;

    const colorAlpha = getAlpha(
        data.total_cal - data.total_cal_burned,
        data.daily_kcal_limit,
        isPositive
    );

    return (
        <TouchableHighlight
            activeOpacity={0.1}
            underlayColor="white"
            onPress={() => setDateInfo?.(data)}
            style={[
                styles.root,
                data && {
                    backgroundColor: isPositive
                        ? `rgba(0,180,0,${colorAlpha})`
                        : `rgba(255,0,0,${colorAlpha})`,
                },
            ]}>
            <Text>{date.day}</Text>
        </TouchableHighlight>
    );
};

export default DayCell;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
    },
    active: {
        flex: 1,
        backgroundColor: 'red',
    },
});
