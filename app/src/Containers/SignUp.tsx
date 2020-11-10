import React, { Component } from 'react';
import { View, StyleSheet, Text,TextInput, Button, Alert, SafeAreaView, Image } from 'react-native';

const Email_TextInput = () => {
    const [value, onChangeText] = React.useState();
    return(
    <TextInput
    placeholder="Type here"
    style={{ height: 40,width:250, borderColor: 'gray', borderWidth: 2,margin:10}}
    onChangeText={text => onChangeText(text)}
    value={value}
  />
    );
}
const CodeTextInput = () => {
    const [value_c, onChangeText_c] = React.useState();
    return(
    <TextInput
    placeholder= "Type here"
    secureTextEntry={true}
    style={{ height: 40,width:250, borderColor: 'gray', borderWidth: 2,margin:10}}
    onChangeText={text => onChangeText_c(text)}
    value={value_c}
  />
    );
}
const Separator = () => (
    <View style={styles.separator}/>
)


class Signup extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <View>
            <Image
                style={styles.Logo}
                source={require('../Containers/KU_Logo.png')}
            />
            <Text style={{margin:10,marginTop:50}}>ID : Mail Address</Text>
            <Email_TextInput style={styles.Inputstyles}></Email_TextInput>
            <Text style={{margin:10}}>Password</Text>
            <CodeTextInput style={styles.Inputstyles}></CodeTextInput>
            <Text style={{margin:10}}>Confirm password</Text>
            <CodeTextInput style={styles.Inputstyles}></CodeTextInput>
            </View>
            <Separator />
            <View>
            <Button
                title="Create account"
                color="#841584"
                onPress={()=>Alert.alert('Account Creation')}
                />
            </View>
            </SafeAreaView>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        display: 'flex',
        height:'100%',
        width:'100%',
        backgroundColor: 'white'
    },
    Logo:{
        marginLeft: 150,
        width: 100,
        height: 100
    },
    separator:{
        marginVertical: 8,
        borderBottomColor: "black",
    },
    Inputstyles:{
        display: 'flex',
        width: '100%'
    }
});
 
export default Signup;