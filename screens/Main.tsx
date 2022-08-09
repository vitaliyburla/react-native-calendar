import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Calendar from '@components/calendar/Calendar';

const Main = () => {
    return (
        <View style={styles.root}>
            <Calendar />
        </View>
    );
};

export default Main;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
    },
});
