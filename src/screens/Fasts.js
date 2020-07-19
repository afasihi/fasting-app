/** @format */

import React, { Component } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import { Colors } from "constants";
import fastList from "../constants/fastslist";
import { params } from "constants";

const { rem } = params;

export default class Fasts extends Component {
  static navigationOptions = {
    title: "Fasts"
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={fastList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                this.props.navigation.navigate("FastDetails", { item })
              }
            >
              <Text style={styles.cardText}>{item.hours} HOURS</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.description}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    backgroundColor: Colors.mainColor,
    margin: 10 * rem,
    padding: 15 * rem,
    borderRadius: 10 * rem
  },
  cardTitle: {
    fontSize: 18 * rem,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 5 * rem
  },
  cardText: {
    fontSize: 14 * rem,
    color: "rgba(255, 255, 255, 0.8)"
  }
});
