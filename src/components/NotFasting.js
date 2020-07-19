/** @format */

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "constants";
import { toggleReady } from "../redux/actions/timer";
import fastList from "../constants/fastslist";
import { params } from "constants";

const { rem } = params;

class NotFasting extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>You are not fasting</Text>
            <View>
              <Icon name="clock-o" size={100 * rem} style={styles.timer} />
              <Text style={styles.chooseText}>
                Choose a fast from the Quick picker below at tap the button to
                read more.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("FastsScreen")}
              style={styles.fastButton}
            >
              <Text style={styles.fastText}>See All fasts</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>
          <View style={styles.footer}>
            <Text style={{ marginLeft: 15 * rem, fontSize: 14 * rem }}>
              Choose a fast:
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("FastsScreen")}
            >
              <Text
                style={{
                  marginRight: 15 * rem,
                  fontSize: 14 * rem,
                  color: Colors.mainColor
                }}
              >
                See all fasts <Icon name="chevron-right" />
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={fastList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.toggleReady(item.id)}
                style={styles.footerCard}
              >
                <Text
                  style={{
                    fontSize: 16 * rem,
                    color: "#fff",
                    fontWeight: "bold",
                    marginBottom: 5 * rem
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: "#fff", fontSize: 14 * rem, }}>{item.hours} hours</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60 * rem
  },
  title: {
    fontSize: 20 * rem,
    fontWeight: "bold",
    marginBottom: 20 * rem
  },
  fastingNum: {
    fontSize: 14 * rem,
    color: Colors.mainColor,
    fontWeight: "300"
  },
  timer: {
    color: Colors.mainColor,
    margin: 10 * rem,
    alignSelf: "center"
  },
  chooseText: {
    paddingVertical: 10 * rem,
    paddingHorizontal: 60 * rem,
    fontSize: 14 * rem
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
    fontWeight: "500",
    fontSize: 14 * rem
  },
  footerContainer: {
    flex: 0.2
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10 * rem
  },
  footerCard: {
    height: 80 * rem,
    width: 180 * rem,
    padding: 10 * rem,
    backgroundColor: Colors.mainColor,
    borderRadius: 10 * rem,
    margin: 8 * rem
  }
});

const mapStateToProps = state => ({
  isFasting: state.timer.isFasting
});

const mapDispatchToProps = dispatch => ({
  toggleReady: id => dispatch(toggleReady(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotFasting);
