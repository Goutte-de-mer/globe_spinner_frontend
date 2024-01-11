import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import GradientFontColor from "../components/GradientFontColor";
import { CustomText } from "../components/CustomText";
import { ScrollView } from "react-native-virtualized-view";

export default function RecapScreen({ navigation, route }) {
  const { trip } = route.params;
  const destination = `${trip.destination.name}, ${trip.destination.country}`;
  const accommodation = trip.accommodation.accommodationBase.name;
  // const departurePlace;
  // const departureTime;
  // const departureArrivalPlace
  // const departureArrivalTime
  // const transport = "Flight XYZ";
  const activities = trip.activities.map((act, i) => {
    return (
      <CustomText key={i}>
        {act.activityBase.name.replace(/\d/g, "")}
      </CustomText>
    );
  });
  const amountPaid = trip.total;
  const handleOkPress = () => {
    navigation.navigate("HomeStack");
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GradientFontColor style={styles.title}>Recap Trip</GradientFontColor>

      <CustomText style={styles.subtitle}>Where to</CustomText>
      <View style={styles.infoContainer}>
        <CustomText style={styles.info}>{destination}</CustomText>
      </View>

      <CustomText style={styles.subtitle}>Accommodation</CustomText>
      <View style={styles.infoContainer}>
        <CustomText style={styles.info}>{accommodation}</CustomText>
      </View>

      <CustomText style={styles.subtitle}>Transport</CustomText>
      <View style={styles.infoContainer}>
        <CustomText style={styles.info}></CustomText>
      </View>

      <CustomText style={styles.subtitle}>Activities</CustomText>
      <View style={styles.infoContainer}>
        <CustomText style={styles.info}>{activities}</CustomText>
      </View>

      <CustomText style={styles.subtitle}>Amount Paid:</CustomText>
      <View style={styles.infoContainer}>
        <CustomText style={styles.info}>{amountPaid}€</CustomText>
      </View>

      <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
        <CustomText style={styles.okButtonText}>OK</CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    backgroundColor: "white",
  },
  title: {
    marginVertical: 30,
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "KronaOne_400Regular",
  },

  subtitle: {
    fontWeight: "bold",
    marginTop: 20,
    fontFamily: "KronaOne_400Regular",
  },
  infoContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: "#3972D9",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    minWidth: "60%",
  },
  okButtonText: {
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
});
