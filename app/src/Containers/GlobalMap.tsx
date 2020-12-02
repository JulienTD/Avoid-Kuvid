//global kakao
import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components/native';

class GlobalMap extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=0536c3cfc1277d089901ef083d56f257&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("Map");
        let options = {
          center: new kakao.maps.LatLng(36.611, 127.286985),
          level: 11
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }
  render() {
    return <GlobalMap Id = "Map"></GlobalMap>;
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
      backgroundColor: 'grey'
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
      backgroundColor: 'white'
  }
});

export default GlobalMap;
