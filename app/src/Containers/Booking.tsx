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
import BookingService from '../Services/Booking/BookingService';

let { width } = Dimensions.get('window');

interface IEvent {
    start: string;
    end: string;
    title: string;
    summary: string;
    color?: string;
}

interface ITimePicker {
    visible: boolean;
    picking: string;
    value: Date;
}

interface IBooking {
    date: string;
    startTime: string;
    endTime: string;
    disabled: boolean;
}

interface IState {
    events: IEvent[];
    visible: boolean;
    timePicker: ITimePicker;
    booking: IBooking;
}

class Booking extends Component<{}, IState> {

    public bookingService!: BookingService;

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            visible: false,
            timePicker: {
                visible: false,
                picking: "",
                value: new Date(0)
            },
            booking: {
                date: "",
                startTime: "01:00:00",
                endTime: "02:00:00",
                disabled: false
            }
        };
    }

    public componentDidMount() {
        const facility = "";

        this.bookingService = new BookingService();
        this.bookingService.fetchSchedule(facility)
        .then((events: IEvent[]) => {
            this.setState({ events });
        })
        .catch((err) => {
            console.error(`Failed to fetch the schedule of the facility: ${facility} !`);
        });
    }

    public render() {
        return (
            <SafeAreaView style={styles.container}>
                <EventCalendar
                    eventTapped={this.onEventClick.bind(this)}
                    onPressHour={this.onScheduleClick.bind(this)}
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
                            disabled={this.state.booking.disabled}
                            text="Book"
                            bordered
                            onPress={() => this.handleBookButton()}
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
                            onPress={() => this.handleStartDateButton()}
                        >
                        <Text style={styles.text}>From: {this.state.booking.startTime}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.handleEndDateButton()}
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

    /**
     * Fired when a click is detect on an hour on the calendar
     * @param data
     */
    private onScheduleClick(data) {
        const date = new Date(data.date);
        const formattedDate = this.createDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

        this.setState({
            booking: {
                date: formattedDate,
                startTime: this.createTime(data.hour, data.minute),
                endTime: this.createTime(data.hour + 1, data.minute),
                disabled: false
            },
            visible: true
        });
    }

    /**
     * Fired when a new time has been chosen via the time selector
     * @param event
     * @param selectedDate
     */
    private onChange(event, selectedDate) {
        const date = new Date(selectedDate);
        const formattedTime = this.createTime(date.getHours(), date.getMinutes());

        this.state.timePicker.value.setHours(date.getHours());
        this.state.timePicker.value.setMinutes(date.getMinutes());

        const newStartTime = (this.state.timePicker.picking === "start") ? formattedTime : this.state.booking.startTime;
        const newEndTime = (this.state.timePicker.picking === "end") ? formattedTime : this.state.booking.endTime;

        this.setState({ booking: {
            date: this.state.booking.date,
            startTime: newStartTime,
            endTime: newEndTime,
            disabled: (this.compareTime(newStartTime, newEndTime) ? true : false)
        }});
    };

    private handleBookButton() {
        const fullStartDate = `${this.state.booking.date} ${this.state.booking.startTime}`;
        const fullEndDate = `${this.state.booking.date} ${this.state.booking.endTime}`;

        this.setState({ visible: false });
        this.setState({ events: [...this.state.events, {
            start: fullStartDate,
            end: fullEndDate,
            title: 'Study room',
            summary: 'Room n°3423-1'
        }]});
        this.bookingService.bookFacility(
            "patrick",
            new Date(Date.parse(fullStartDate)).toUTCString(),
            new Date(Date.parse(fullEndDate)).toUTCString()
        );
    }

    private handleStartDateButton() {
        const date = new Date(0);
        date.setHours(parseInt(this.state.booking.startTime.split(":")[0]), 10);
        date.setMinutes(parseInt(this.state.booking.startTime.split(":")[1]), 10);

        this.setState({ timePicker: {
            value: date,
            picking: "start",
            visible: !this.state.timePicker.visible
        }});
    }

    private handleEndDateButton() {
        const date = new Date(0);
        date.setHours(parseInt(this.state.booking.endTime.split(":")[0]), 10);
        date.setMinutes(parseInt(this.state.booking.endTime.split(":")[1]), 10);

        this.setState({ timePicker: {
            value: date,
            picking: "end",
            visible: !this.state.timePicker.visible
        }});
    }

    /**
     * Fired when a click is detected on an event
     * @param event
     */
    private onEventClick(event) {
        alert(JSON.stringify(event));
    }

    /**
     * Create a formatted date
     * @param year in number
     * @param month in number
     * @param day in number
     */
    private createDate(year: number, month: number, day: number) {
        let result = `${year}-`;

        result += (month < 10) ? `0${month}-` : `${month}-`;
        result += (day < 10) ? `0${day}` : `${day}`;
        return result;
    }

    /**
     * Create a formatted time
     * @param hours in number
     * @param minutes in number
     */
    private createTime(hours: number, minutes: number) {
        let result = ``;

        result += (hours < 10) ? `0${hours}:` : `${hours}:`;
        result += (minutes < 10) ? `0${minutes}:00` : `${minutes}:00`;
        return result;
    }

    /**
     * Check if timeA is later than timeB
     * @param timeA formatted time
     * @param timeB formatted time
     */
    private compareTime(timeA: string, timeB: string) {
        if (timeA === timeB)
            return true;
        const timeAArray = timeA.split(":");
        const timeBArray = timeB.split(":");

        if (parseInt(timeAArray[0], 10) > parseInt(timeBArray[0], 10))
            return true;
        if (parseInt(timeAArray[0], 10) === parseInt(timeBArray[0], 10)
            && parseInt(timeAArray[1], 10) > parseInt(timeBArray[1], 10))
            return true;
        return false;
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
