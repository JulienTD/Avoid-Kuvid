import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

class GlobalMap extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <TextInput style={styles.textInput}/>
                </View>
                <View style={styles.map}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    search: {
        display: 'flex',
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    textInput: {
        display: 'flex',
        height: '60%',
        width: '70%',
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'white'
    },
    map: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: 'blue'
    }
});

export default GlobalMap;

