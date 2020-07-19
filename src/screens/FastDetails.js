/** @format */

import React, { Component } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import { connect } from "react-redux";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "constants";
import { toggleReady, toggleFasting, setId } from "../redux/actions/timer";
import { setFast } from "../redux/actions/countdown";
import { params } from "constants";

const { rem } = params;

class FastDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.title
  });

  render() {
    const fast = this.props.navigation.state.params.item;
    const fastslist = [fast];

    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <AnimatedCircularProgress
              size={80 * rem}
              width={10 * rem}
              fill={(fast.hours / 24) * 100}
              tintColor={Colors.mainColor}
              backgroundColor="lightgrey"
              rotation={0}
            >
              {() => (
                <Text style={{ fontSize: 16 * rem, fontWeight: "bold" }}>
                  {fast.hours}h
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>
          <View>
            <Text style={styles.instructionText}>{fast.instruction}</Text>
          </View>
          {this.props.isFasting ? (
            <TouchableOpacity
              onPress={() => {
                this.props.setFast(fastslist, fast.id);
                this.props.setId(fast.id);
                this.props.navigation.navigate("Home");
              }}
              style={styles.prepareBotton}
            >
              <Text style={{ color: "#fff", fontWeight: "500", fontSize: 14 * rem }}>
                Change fast
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (!this.props.isReady) {
                  this.props.toggleReady(fast.id);
                } else if (this.props.isFasting) {
                  this.props.toggleFasting(fast.id);
                } else this.props.setId(fast.id);

                this.props.navigation.navigate("Home");
              }}
              style={styles.prepareBotton}
            >
              <Text style={{ color: "#fff", fontWeight: "500", fontSize: 14 * rem }}>
                Prepare fasting
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.instractionCountainer}>
            <Text
              style={{
                fontSize: 14 * rem,
                fontWeight: "500",
                marginBottom: 10 * rem
              }}
            >
              TIPS TO PREPARE FOR THIS FAST:
            </Text>
            <View style={styles.instractionRow}>
              <Icon name="cup-water" style={styles.icon} />
              <Text style={styles.text}>
                Hydrate with water before, during and after the fast.
              </Text>
            </View>
            <View style={styles.instractionRow}>
              <Icon name="food-off" style={styles.icon} />
              <Text style={styles.text}>
                Avoid processed and unhealthy foods before and after fasting.
              </Text>
            </View>
            <View style={styles.instractionRow}>
              <Icon name="food-apple-outline" style={styles.icon} />
              <Text style={styles.text}>
                Prepare healthy, fresh foods for your first meal after fast.
              </Text>
            </View>
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
    marginTop: 50 * rem
  },
  instructionText: {
    fontSize: 14 * rem,
    marginHorizontal: 30 * rem,
    marginVertical: 20 * rem
  },
  prepareBotton: {
    backgroundColor: Colors.mainColor,
    margin: 20 * rem,
    borderRadius: 15 * rem,
    paddingVertical: 10 * rem,
    paddingHorizontal: 30 * rem
  },

  instractionCountainer: {
    margin: 30 * rem,
    padding: 30 * rem,
    borderStyle: "dashed",
    borderColor: Colors.lightGrey,
    borderWidth: 2 * rem,
    borderRadius: 8 * rem
  },
  instractionRow: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  icon: {
    paddingRight: 20 * rem,
    fontSize: 24 * rem
  },
  text: {
    paddingLeft: 10 * rem,
    fontSize: 14 * rem
  }
});

const mapStateToProps = state => ({
  isFasting: state.timer.isFasting,
  isReady: state.timer.isReady
});

const mapDispatchToProps = dispatch => ({
  toggleFasting: id => dispatch(toggleFasting(id)),
  toggleReady: id => dispatch(toggleReady(id)),
  setFast: (fastslist, id) => dispatch(setFast(fastslist, id)),
  setId: id => dispatch(setId(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FastDetails);
