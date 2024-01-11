import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
} from "react-native";

import GradientFontColor from "../components/GradientFontColor";
import { CustomText } from "../components/CustomText";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";

import { useSelector } from "react-redux";
const { ipAddress, port } = require("../myVariables");

export default function UserDetails({ logout }) {
  const userInfo = useSelector((state) => state.userInfo.value);
  const { height, width } = useWindowDimensions();
  const [savedTrips, setSavedTrips] = useState([]);
  const isFocused = useIsFocused();

  const getSavedTrips = async () => {
    const savedTripsReceived = await fetch(
      `http://${ipAddress}:${port}/users/${userInfo.token}/savedTrips`
    ).then((resp) => resp.json());
    setSavedTrips(savedTripsReceived);
  };

  useEffect(() => {
    getSavedTrips();
    console.log(savedTrips);
  }, [isFocused]);

  const savedTripsJSX = savedTrips.map((trip, i) => {
    const startDate = trip.outboundJourney.transportSlot.departure.date;
    const endDate = trip.inboundJourney.transportSlot.arrival.date;
    const nbDays = moment(endDate).diff(moment(startDate), "days");
    return (
      <View key={i}>
        <CustomText style={styles.savedTripText}>
          - {trip.destination.name}, {trip.destination.country} ({nbDays} days)
        </CustomText>
      </View>
    );
  });

  return (
    <SafeAreaView style={[styles.container, { height }]}>
      <ScrollView contentContainerStyle={[styles.scrollView, { width: width }]}>
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <FontAwesome name="sign-out" size={40} />
        </TouchableOpacity>
        <GradientFontColor style={styles.hello}>
          Hello {userInfo.firstname} !
        </GradientFontColor>
        <View style={styles.userDetailsContainer}>
          <CustomText style={styles.text}>My account info : </CustomText>
          <CustomText style={styles.text}>
            first name: {userInfo.firstName}
          </CustomText>
          <CustomText style={styles.text}>
            last name: {userInfo.lastName}
          </CustomText>
          <CustomText style={styles.text}>email: {userInfo.email}</CustomText>
        </View>
        <CustomText>Saved trips</CustomText>
        <>
          {savedTrips.length === 0 ? (
            <CustomText>No trips saved yet</CustomText>
          ) : (
            savedTripsJSX
          )}
        </>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  scrollView: {
    alignItems: "center",
  },
  hello: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    fontFamily: "KronaOne_400Regular",
    fontSize: 40,
  },
  text: {
    color: "black",
    fontSize: 26,
    margin: 20,
  },
  logoutButton: {
    // backgroundColor: "red",
    width: 60,
    height: 60,
    position: "absolute",
    right: -10,
    marginTop: 20,
  },

  userDetailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 60,
  },
});
