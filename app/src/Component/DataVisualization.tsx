import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DialogContent } from 'react-native-popup-dialog';

class DataVisualization extends Component {

    render() {
        return (
            <DialogContent style={styles.container}>
                <View></View>
            </DialogContent>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DataVisualization;