import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    TouchableHighlight,
    Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { getDaysInMonthByDate } from '@utils/date';
import DayCell from '@components/calendar/DayCell';
import { getData } from '@api/index';
import { CalendarData, CalendarDay } from '@components/calendar/types/calendar';
import DayInfo from '@components/calendar/DayInfo';

const Calendar = () => {
    const [data, setData] = useState<CalendarData>();
    const [dateInfo, setDateInfo] = useState<CalendarDay>();

    useEffect(() => {
        setData(getData());
    }, []);

    const [month, setMonth] = useState(4);

    const calendarDateTime = DateTime.local(2022, month, 5);

    const daysInCurrentMonth = getDaysInMonthByDate(calendarDateTime);

    return (
        <View style={styles.root}>
            <View style={styles.pagination}>
                <TouchableHighlight
                    style={styles.paginationButton}
                    activeOpacity={0.1}
                    underlayColor="white"
                    onPress={() => month > 1 && setMonth((prev) => prev - 1)}>
                    <Text>
                        {Platform.OS === 'ios' ? <>&#11013;</> : 'PREV'}
                    </Text>
                </TouchableHighlight>
                <Text>{calendarDateTime.toFormat('LLLL')}</Text>
                <TouchableHighlight
                    style={styles.paginationButton}
                    activeOpacity={0.1}
                    underlayColor="white"
                    onPress={() => month < 12 && setMonth((prev) => prev + 1)}>
                    <Text>
                        {Platform.OS === 'ios' ? <>&#10145;</> : 'NEXT'}
                    </Text>
                </TouchableHighlight>
            </View>
            <View style={styles.calendar}>
                <FlatList
                    scrollEnabled={false}
                    data={daysInCurrentMonth}
                    contentContainerStyle={styles.daysGrid}
                    renderItem={({ item }) => {
                        const isCurrentMonth =
                            item.month == calendarDateTime.month;

                        return (
                            <View
                                style={[
                                    styles.dayCell,
                                    !isCurrentMonth && styles.dayCellDisabled,
                                ]}>
                                {isCurrentMonth && (
                                    <DayCell
                                        date={item}
                                        data={data?.dates.find(
                                            ({ date }) =>
                                                date ===
                                                item.toFormat('yyyy-LL-dd')
                                        )}
                                        setDateInfo={setDateInfo}
                                    />
                                )}
                            </View>
                        );
                    }}
                    numColumns={7}
                    keyExtractor={(item) => item.toString()}
                />
            </View>
            <DayInfo data={dateInfo} />
        </View>
    );
};

export default Calendar;

const styles = StyleSheet.create({
    root: {
        flex: 0.5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    calendar: {
        flex: 0.8,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
    },
    daysGrid: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    dayCell: {
        borderWidth: 1,
        width: 36,
        height: 36,
        margin: 2,
    },
    dayCellDisabled: {
        borderWidth: 0,
    },
    pagination: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    paginationButton: {
        padding: 5,
        backgroundColor: 'whitesmoke',
        borderWidth: 1,
        borderRadius: 5,
    },
});
