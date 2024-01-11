import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { CustomText } from "../components/CustomText";

export default function PaymentScreen({ navigation, route }) {
  const { trip } = route.params;
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [checked, setChecked] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  const handleSubmit = () => {
    navigation.navigate("RecapHomeStack", {
      trip: trip,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomText style={styles.title}>Card Details</CustomText>
      <View style={styles.formContainer}>
        <CustomText style={styles.label}>Card Number</CustomText>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />

        <CustomText style={styles.label}>Expiry Date (MM/YY)</CustomText>
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

        <CustomText style={styles.label}>CVV</CustomText>
        <TextInput
          style={styles.input}
          placeholder="123"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />

        <CustomText style={styles.label}>Card Holder Name</CustomText>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={cardHolderName}
          onChangeText={setCardHolderName}
        />
      </View>
      <CustomText style={styles.amountText}>Total: {trip.total}€</CustomText>

      <TouchableOpacity style={styles.submitBtn} onPress={() => handleSubmit()}>
        <Text style={styles.submitBtnText}>Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    marginVertical: 30,
    textAlign: "center",
    fontFamily: "KronaOne_400Regular",
  },
  formContainer: {
    width: "100%",
  },
  label: {
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 30,
    padding: 10,
    fontSize: 16,
    borderBottomColor: "#BA99FE",
    borderBottomWidth: 2,
  },
  amountText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  submitBtn: {
    backgroundColor: "#3972D9",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    minWidth: "70%",
  },
  submitBtnText: {
    textTransform: "uppercase",
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
});
