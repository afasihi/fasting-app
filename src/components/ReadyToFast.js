/** @format */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { toggleReady, toggleFasting } from "../redux/actions/timer";
import { Colors } from "constants";
import fastslist from "../constants/fastslist";
import { params } from "constants";

const { rem } = params;

class ReadyToFast extends Component {
  render() {
    const fast = fastslist.filter(({ id }) => id === this.props.id);
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Get Ready to fast</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("FastsScreen")}
              style={styles.editButton}
            >
              <Text style={{ fontSize: 14 * rem, fontWeight: "600" }}>
                {`${fast[0].title.toUpperCase()} `}
                <Icon name="pencil" size={14 * rem} />
              </Text>
            </TouchableOpacity>
          </View>
          <AnimatedCircularProgress
            size={250 * rem}
            width={25* rem}
            fill={0}
            backgroundColor="lightgrey"
          >
            {() => (
              <View style={styles.circleContainer}>
                <Text style={{fontSize: 14 * rem}}>Upcoming fast</Text>
                <Text
                  style={{ fontSize: 30 * rem }}
                >{`${fast[0].hours} hours`}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
          <TouchableOpacity
            onPress={() => this.props.toggleFasting(this.props.id)}
            style={styles.fastButton}
          >
            <Text style={styles.fastText}>
              Start your {fast[0].hours}h fast
            </Text>
          </TouchableOpacity>
          <View style={styles.timeCountainer}>
            <TouchableOpacity
              onPress={() => this.props.toggleReady(this.props.id)}
              style={styles.editButton}
            >
              <Text style={{ fontSize: 14 * rem, fontWeight: "600" }}>
                CANCEL FAST
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    alignItems: "center"
  },
  timeText: {
    alignItems: "center",
    fontWeight: "600",
    fontSize: 12 * rem
  },
  startedText: {
    fontSize: 16 * rem,
    color: Colors.mainColor
  },
  endText: {
    fontSize: 16 * rem
  },
  circleContainer: {
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  id: state.timer.id
});

const mapDispatchToProps = dispatch => ({
  toggleFasting: id => dispatch(toggleFasting(id)),
  toggleReady: id => dispatch(toggleReady(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadyToFast);
