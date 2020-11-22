import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';

import { Dimensions } from 'react-native';
import EventCalendar from 'react-native-events-calendar'
import DateTimePicker from '@react-native-community/datetimepicker';

let { width } = Dimensions.get('window');

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
          events: [
            {
              start: '2017-09-07 10:00:00',
              end: '2017-09-07 11:00:00',
              title: 'Study room',
              summary: 'Room n°3423-1',
            },
          ],
          visible: false,
          timePicker: {
            visible: false,
            picking: "",
            value: Date.now()
          },
          booking: {
            date: "",
            startTime: "01:00:00",
            endTime: "02:00:00"
          }
        };
      }

      _eventTapped(event) {
        alert(JSON.stringify(event));
      }

      createDate(year, month, day) {
        let result = `${year}-`;

        result += (month < 10) ? `0${month}-` : `${month}-`;
        result += (day < 10) ? `0${day}` : `${day}`;
        return result;
      }

      createTime(hours, minutes) {
        let result = ``;

        result += (hours < 10) ? `0${hours}:` : `${hours}:`;
        result += (minutes < 10) ? `0${minutes}:00` : `${minutes}:00`;
        return result;
      }


      _hourTapped(data) {
        const date = new Date(data.date);
        const formattedDate = this.createDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

        this.setState({ booking: {
          date: formattedDate,
          startTime: this.createTime(data.hour, data.minute),
          endTime: this.createTime(data.hour + 1, data.minute)
        }});
        this.setState({ visible: true });
      }

    onChange(event, selectedDate) {
      const date = new Date(selectedDate);
      const formattedTime = this.createTime(date.getHours(), date.getMinutes());

      this.state.timePicker.value.setHours(date.getHours());
      this.state.timePicker.value.setMinutes(date.getMinutes());

      this.setState({ booking: {
        date: this.state.booking.date,
        startTime: (this.state.timePicker.picking === "start") ? formattedTime : this.state.booking.startTime,
        endTime: (this.state.timePicker.picking === "end") ? formattedTime : this.state.booking.endTime
      }});
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <EventCalendar
                    eventTapped={this._eventTapped.bind(this)}
                    onPressHour={this._hourTapped.bind(this)}
                    events={this.state.events}
                    width={width}
                    initDate={'2017-09-07'}
                    upperCaseHeader
                    uppercase
                    scrollToFirst={true}
                    size={1}
                    />
                <Modal
                  width={0.9}
                  visible={this.state.visible}
                  rounded
                  useNativeDriver={true}
                  actionsBordered
                  onTouchOutside={() => {
                    this.setState({ visible: false });
                  }}
                  modalTitle={
                    <ModalTitle
                      title="Book a facility"
                      align="center"
                      style={styles.text}
                    />
                  }
                  footer={
                    <ModalFooter>
                      <ModalButton
                        text="Cancel"
                        bordered
                        onPress={() => {
                          this.setState({ visible: false });
                        }}
                        key="button-1"
                      />
                      <ModalButton
                        text="Book"
                        bordered
                        onPress={() => {
                          this.setState({ visible: false });
                          this.setState({ events: [...this.state.events, {
                            start: `${this.state.booking.date} ${this.state.booking.startTime}`,
                            end: `${this.state.booking.date} ${this.state.booking.endTime}`,
                            title: 'Study room',
                            summary: 'Room n°3423-1'
                          }]});
                        }}
                        key="button-2"
                      />
                    </ModalFooter>
                  }
                >
                  <ModalContent
                    style={{ backgroundColor: '#fff' }}
                  >
                    <Text style={styles.text}>The {this.state.booking.date}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        const date = new Date(0);
                        date.setHours(this.state.booking.startTime.split(":")[0]);
                        date.setMinutes(this.state.booking.startTime.split(":")[1]);

                        this.setState({ timePicker: {
                          value: date,
                          picking: "start",
                          visible: !this.state.timePicker.visible
                        }});
                      }}
                    >
                      <Text style={styles.text}>From: {this.state.booking.startTime}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        const date = new Date(0);
                        date.setHours(this.state.booking.endTime.split(":")[0]);
                        date.setMinutes(this.state.booking.endTime.split(":")[1]);

                        this.setState({ timePicker: {
                          value: date,
                          picking: "end",
                          visible: !this.state.timePicker.visible
                        }});
                      }}
                    >
                      <Text style={styles.text}>To: {this.state.booking.endTime}</Text>
                    </TouchableOpacity>
                    {this.state.timePicker.visible && <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.timePicker.value}
                      mode={"time"}
                      is24Hour={true}
                      display="default"
                      minuteInterval={30}
                      onChange={this.onChange.bind(this)}
                    />}
                  </ModalContent>
                </Modal>
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
      fontSize: 20
    }
});

export default Booking;
