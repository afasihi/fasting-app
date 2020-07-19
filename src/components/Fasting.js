/** @format */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import BackgroundTimer from "react-native-background-timer";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import { Colors } from "constants";
import { toggleFasting } from "../redux/actions/timer";
import {
  setFast,
  setTimer,
  setDuration,
  getTiming
} from "../redux/actions/countdown";
import fastslist from "../constants/fastslist";
import { ScrollView } from "react-native-gesture-handler";
import { params } from "constants";

const { rem } = params;

let now = moment().valueOf();

class Fasting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      picker: false,
      date: new Date(now)
    };
  }

  componentDidMount() {
    this.props.setFast(fastslist, this.props.id);
    const hours = this.props.fast[0].hours;

    if (this.props.duration === 0) {
      this.props.setDuration(hours * 3600000);
      const dt = new Date();
      this.props.getTiming(dt.getTime());
    }

    this.startTimer();
    this.setState({ isLoading: true });
  }

  componentWillUnmount() {
    BackgroundTimer.clearInterval(this.countdown);
    BackgroundTimer.clearInterval(this.timer);
    this.props.setDuration(0);
    this.props.setTimer(0);
  }

  startTimer = () => {
    this.countdown = BackgroundTimer.setInterval(() => {
      this.decrementClock();
    }, 1000);
    this.timer = BackgroundTimer.setInterval(() => {
      this.incrementClock();
    }, 1000);
  };

  decrementClock = () => {
    const dt = new Date();
    const currentTime = dt.getTime();
    const elapsedTime = currentTime - this.props.time - 1000;
    const duration = this.props.fast[0].hours * 3600000;
    this.props.setDuration(duration - elapsedTime);
    this.setState({
      spinValue:
        100 - (this.props.duration / (this.props.fast[0].hours * 3600000)) * 100
    });
    if (this.props.duration <= 0) {
      this.props.setDuration(0);
      BackgroundTimer.clearInterval(this.countdown);
    }
  };

  incrementClock = () => {
    const dt = new Date();
    const currentTime = dt.getTime();
    const elapsedTime = currentTime - this.props.time;
    this.props.setTimer(elapsedTime);
    if (this.props.duration <= 0) {
      BackgroundTimer.clearInterval(this.timer);
    }
  };

  timeRemaining(duration) {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  timeElapsed(timer) {
    let seconds = parseInt((timer / 1000) % 60);
    let minutes = parseInt((timer / (1000 * 60)) % 60);
    let hours = parseInt((timer / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  getDate = time => ({
    getTime : () => time
  })

  renderPicker = () => {
    if (this.state.picker) {
      return (
        <View>
          <DatePicker
            ref={picker => {
              this.datePicker = picker;
            }}
            date={Platform.OS === "ios" ? this.state.date : moment(this.props.time)}
            onDateChange={date => {
              this.setState({ date });
            }}
            minimumDate={Platform.OS === "ios" ? this.getDate(now - this.props.fast[0].hours * 3600000) : now - this.props.fast[0].hours * 3600000 }
            maximumDate={Platform.OS === "ios" ? this.getDate(now) : now}
            style={{ fontSize: 50 * rem }}
          />
          <View style={styles.dateButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                let test = moment(this.state.date).valueOf();
                console.log(test);

                this.props.getTiming(test);
                this.setState({ picker: !this.state.picker });
              }}
              style={styles.dateButton}
            >
              <Text style={styles.fastText}>Update starting time</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ picker: !this.state.picker });
              }}
              style={styles.dateButton}
            >
              <Text style={styles.fastText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  render() {
    if (!this.state.isLoading) {
      return (
        <ActivityIndicator
          style={styles.container}
          size="large"
          color={Colors.mainColor}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>You are fasting</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("FastsScreen")}
                style={styles.editButton}
              >
                <Text style={{ fontSize: 14 * rem, fontWeight: "600" }}>
                  {`${this.props.fast[0].title.toUpperCase()} `}
                  <Icon name="pencil" size={16 * rem} />
                </Text>
              </TouchableOpacity>
            </View>
            <AnimatedCircularProgress
              size={250 * rem}
              width={25 * rem}
              fill={
                100 -
                (this.props.duration / (this.props.fast[0].hours * 3600000)) *
                  100
              }
              tintColor={Colors.mainColor}
              backgroundColor="lightgrey"
              backgroundWidth={5 * rem}
              rotation={0}
              lineCap="round"
            >
              {fill => (
                <View style={styles.circleContainer}>
                  <Text>Remaining ({Math.ceil(100 - fill)}%)</Text>
                  <Text style={{ fontSize: 30 * rem, fontWeight: "700" }}>
                    {this.timeRemaining(this.props.duration)}
                  </Text>
                  <Text>Elapsed ({Math.floor(fill)}%)</Text>
                  <Text style={{ fontWeight: "600", fontSize: 14 * rem }}>
                    {this.timeElapsed(this.props.elapsedTimer)}
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
            <TouchableOpacity
              onPress={() => {
                this.props.toggleFasting(this.props.id);
              }}
              style={styles.fastButton}
            >
              <Text style={styles.fastText}>End Fast</Text>
            </TouchableOpacity>
            <View style={styles.bottomCountainer}>
              <View style={styles.timeCountainer}>
                <Text style={styles.timeText}>STARTED FASTING</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ picker: !this.state.picker })}
                >
                  <Text style={styles.startedText}>
                    {moment(this.props.time).calendar()}{" "}
                    <Icon name="pencil" size={14 * rem} />
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.timeCountainer}>
                <Text style={styles.timeText}>FAST ENDING</Text>
                <Text style={styles.endText}>
                  {moment(
                    this.props.time + this.props.fast[0].hours * 3600000
                  ).calendar()}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.datePicker}>{this.renderPicker()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60 * rem
  },
  title: {
    fontSize: 20 * rem,
    fontWeight: "bold",
    marginBottom: 5 * rem,
    alignSelf: "center"
  },
  fastingNum: {
    fontSize: 14 * rem,
    color: Colors.mainColor,
    fontWeight: "300",
    alignSelf: "center"
  },
  editButton: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 12 * rem,
    margin: 25 * rem,
    paddingHorizontal: 20 * rem,
    paddingVertical: 10 * rem,
    alignSelf: "center"
  },
  fastButton: {
    backgroundColor: Colors.mainColor,
    margin: 20 * rem,
    borderRadius: 20 * rem,
    paddingVertical: 10 * rem,
    paddingHorizontal: 50 * rem
  },
  fastText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 14 * rem
  },
  bottomCountainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  timeCountainer: {
    margin: 25,
    alignItems: "center"
  },
  timeText: {
    alignItems: "center",
    fontWeight: "600",
    fontSize: 12 * rem
  },
  startedText: {
    fontSize: 14 * rem,
    color: Colors.mainColor
  },
  endText: {
    fontSize: 14 * rem
  },
  circleContainer: {
    alignItems: "center"
  },
  datePicker: {
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center"
  },
  dateButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dateButton: {
    backgroundColor: Colors.mainColor,
    margin: 10 * rem,
    borderRadius: 10 * rem,
    paddingVertical: 5 * rem,
    paddingHorizontal: 15 * rem,
    marginBottom: 30 * rem
  }
});

const mapStateToProps = state => ({
  id: state.timer.id,
  fast: state.countdown.fast,
  duration: state.countdown.duration,
  elapsedTimer: state.countdown.timer,
  time: state.countdown.time
});

const mapDispatchToProps = dispatch => ({
  toggleFasting: id => dispatch(toggleFasting(id)),
  setFast: (fastslist, id) => dispatch(setFast(fastslist, id)),
  setTimer: timer => dispatch(setTimer(timer)),
  setDuration: duration => dispatch(setDuration(duration)),
  getTiming: time => dispatch(getTiming(time))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fasting);
