import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Dialog from 'react-native-popup-dialog';

import DataVisualization from '../Component/DataVisualization';
import ButtonKU from '../Component/ButtonKU';

interface FacilityProps {
    navigation: any,
}

interface FacilityState {
    dataVisualization?: boolean,
}

class Facility extends Component<FacilityProps, FacilityState> {
    constructor(props: FacilityProps) {
        super(props);
        this.state = {
            dataVisualization: false
        }
    }

    dismissPopup = () => {
        this.setState({dataVisualization: false});
        return true;
    }

    handleDataVisualization = () => {
        this.setState({dataVisualization: !this.state.dataVisualization});
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: 'http://builder.hufs.ac.kr/user/hufsenglish/img/dining02.gif'}}
                />
                <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Cafeteria du Chef Dumas</Text>
                        <View style={styles.statusContainer}>
                            <View style={{...styles.circle, backgroundColor: 'green'}}/>
                            <Text style={styles.status}>Open</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>La belle cafeteria du chef dumas en boucle La belle cafeteria du chef dumas en boucle La belle cafeteria du chef dumas en boucle La belle cafeteria du chef dumas en boucle La belle cafeteria du chef dumas en boucle</Text>
                </View>
                <View style={styles.subContainer}>
                    <ButtonKU
                        title="Data Visualization"
                        onPress={() => this.handleDataVisualization()}
                        buttonStyle={{marginBottom: 18}}
                    />
                    {/* <ButtonKU
                        title="Booking"
                        onPress={() => this.handleDataVisualization()}
                    /> */}
                </View>
                <Dialog width={0.8} height={0.8} 
                    visible={this.state.dataVisualization}
                    onTouchOutside={() => this.dismissPopup()}
                    onHardwareBackPress={() => this.dismissPopup()}>
                    <DataVisualization/>
                </Dialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#CDCDCD'
    },
    image: {
        display: "flex",
        flex: 1.25,
        width: '100%',
        height: '100%'
    },
    textContainer: {
        display: 'flex',
        flex: 1.5,
        height: '100%',
        width: '100%',
        justifyContent: 'space-around',
    },
    subContainer: {
        display: 'flex',
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        display: "flex",
        alignSelf: "flex-end",
        marginRight: "10%",
    },
    statusContainer: {
        display: "flex",
        alignSelf: "flex-end",
        alignItems: "center",
        flexDirection: 'row'
    },
    title: {
        marginBottom: 15,
        fontWeight: "bold",
        fontSize: 22
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
    },
    status: {
        marginLeft: 8,
        fontStyle: "italic",
        fontSize: 18
    },
    description: {
        marginHorizontal: '5%'
    }

});

export default Facility;