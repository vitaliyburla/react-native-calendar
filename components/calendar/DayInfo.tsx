import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { CalendarDay } from '@components/calendar/types/calendar';

type Props = {
    data?: CalendarDay;
};

const DayInfo: FC<Props> = ({ data }) => {
    return (
        <View style={styles.root}>
            <Text>{data?.date}</Text>

            <View style={styles.table}>
                <View>
                    <Text>Total: {data?.total_cal ?? '?'}</Text>
                </View>
                <View>
                    <Text>Burned: {data?.total_cal_burned ?? '?'}</Text>
                </View>
                <View>
                    <Text>Limit: {data?.daily_kcal_limit ?? '?'}</Text>
                </View>
            </View>
        </View>
    );
};

export default DayInfo;

const styles = StyleSheet.create({
    root: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '70%',
        borderRadius: 10,
        borderWidth: 1,
    },
    table: {
        justifyContent: 'space-around',
        flex: 0.8,
    },
});
