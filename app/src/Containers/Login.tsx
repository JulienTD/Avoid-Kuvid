import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>You can code Here !</Text>
            </View>
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
        backgroundColor: 'red'
    }
});

export default Login;