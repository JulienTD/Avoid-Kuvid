import React, { Component } from 'react';
import { View, StyleSheet, Text,TextInput, Button, Alert, SafeAreaView, Image} from 'react-native';


const EmailTextInput = () => {
    const [value, onChangeText] = React.useState();
    return(
    <TextInput
    placeholder= "Type here"
    style={{ height: 40,width:250, borderColor: 'gray', borderWidth: 2,margin:10}}
    onChangeText={text => onChangeText(text)}
    value={value}
  />
    );
}
const PwTextInput = () => {
    const [value, onChangeText] = React.useState();
    return(
    <TextInput
    placeholder= "Type here"
    secureTextEntry={true}
    style={{ height: 40,width:250, borderColor: 'gray', borderWidth: 2,margin:10}}
    onChangeText={text => onChangeText(text)}
    value={value}
  />
    );
}
const Separator = () => (
    <View style={styles.separator}/>
)

class Login extends Component {
    render() {
        return (
           <SafeAreaView style={styles.container}>
            <View>
                <Image
                    style={styles.Logo}
                    source={require('../Containers/KU_Logo.png')}
                />
                <Text style={{margin:10}}>Email</Text>
                <EmailTextInput style={styles.Inputstyles}></EmailTextInput>
                <Text style={{margin:10}}>password</Text>
                <PwTextInput style={styles.Inputstyles}></PwTextInput>
                </View>
              <Separator />
                <View>
                <Button
                title="Connection"
                color="#841584"
                onPress={()=>Alert.alert('Login succes')}
                />
                <Button 
                title="SignUp"
                color="#f194ff"
                onPress={() => Alert.alert('Go to SignUp screen')}
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
    separator:{
        marginVertical: 8,
        borderBottomColor: "black",
    },
    Logo:{
        marginLeft: 150,
        width: 100,
        height: 100
    },
    Inputstyles:{
        display: 'flex',
        width: '100%'
    }
});

export default Login;