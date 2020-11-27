import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Surface } from 'react-native-paper';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

interface NewsPaperProps {
}

interface NewsPaperState {
    popup?: boolean,
}

class NewsPaper extends Component<NewsPaperProps, NewsPaperState> {
    constructor(props: NewsPaperProps) {
        super(props);
        this.state = {
            popup: false
        }
    }

    dismissPopup = () => {
        this.setState({popup: false});
        return true;
    }

    handlePopup = () => {
        this.setState({popup: !this.state.popup});
    }

    render() {
        return (
            <Surface style={styles.container}>
                <TouchableOpacity style={styles.subContainer} onPress={() => this.handlePopup()}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="head">Coronavirus Level !</Text>
                    <Text style={styles.date} numberOfLines={1} ellipsizeMode="head">27 November 2020</Text>
                    <Text numberOfLines={7} ellipsizeMode="tail">Contenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte  contenu un peu de texte contenu un peu de texte contenu un peu de textecontenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte</Text>
                </TouchableOpacity>
                <Dialog width={0.8} height={0.8}
                    visible={this.state.popup}
                    onTouchOutside={() => this.dismissPopup()}
                    onHardwareBackPress={() => this.dismissPopup()}>
                    <DialogContent>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{...styles.title, marginTop: 20}}>Coronavirus Level !</Text>
                            <Text style={styles.date}>27 November 2020</Text>
                            <Text>Contenu un peu de texte Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peu Contenu un peu de texte contenu un peude texte contenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte  contenu un peu de texte contenu un peu de texte contenu un peu de textecontenu un peu de texte contenu un peu de texte contenu un peu de texte contenu un peu de texte</Text>
                        </ScrollView>
                    </DialogContent>
                </Dialog>
            </Surface>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '80%',
        height: 200,
        alignSelf: 'center',
        borderRadius: 6,
        elevation: 12,
        marginTop: 12,
        marginBottom: 12,
        padding: 8,
    },
    subContainer: {
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
    date: {
        fontStyle: "italic",
        fontSize: 18,
        marginBottom: 15
    },
});

export default NewsPaper;

