import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Surface } from 'react-native-paper';

import NewsPaper from '../Component/NewsPaper'; 

class GlobalMap extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Surface style={styles.head}>
                    <Text style={styles.title}>News</Text>
                </Surface>
                <ScrollView style={styles.board}>
                    <NewsPaper/>
                    <NewsPaper/>
                    <NewsPaper/>
                    <NewsPaper/>
                    <NewsPaper/>
                    <NewsPaper/>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: "space-around",
        backgroundColor: "#CDCDCD"
    },
    head: {
        display: 'flex',
        width: '100%',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#A72A1E',
        elevation: 12,
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        color: "#FFFFFF",
    },
    board: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#CDCDCD'
    }
});

export default GlobalMap;