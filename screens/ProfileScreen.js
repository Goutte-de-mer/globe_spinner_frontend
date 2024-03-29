import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, useWindowDimensions } from "react-native";
import GradientFontColor from "../components/GradientFontColor";
// import { Icon } from "react-native-vector-icons/FontAwesome";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import UserDetails from "../components/UserDetails";
import SignModal from "../components/SignModal";

import { useSelector, useDispatch } from "react-redux";

import { connect, disconnect, loadDetails } from "../reducers/userInfo";

import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import { CustomText } from "../components/CustomText";

const { ipAddress, port } = require("../myVariables");

export default function ProfileScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const userInfo = useSelector((state) => state.userInfo.value);

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const dispatch = useDispatch();

  const closeModal = () => {
    setIsSigningIn(false);
    setIsSigningUp(false);
  };

  const signIn = async (email, password) => {
    const data = await fetch(`http://${ipAddress}:${port}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((resp) => resp.json());
    if (data.result) {
      dispatch(connect(true));
      setIsSigningIn(false);
      dispatch(
        loadDetails({
          token: data.token,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        })
      );
      navigation.navigate("Home");
    }
    return data;
  };

  const signUp = async (firstName, lastName, email, password) => {
    const data = await fetch(`http://${ipAddress}:${port}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    }).then((resp) => resp.json());
    if (data.result) {
      dispatch(connect());
      setIsSigningUp(false);
      dispatch(
        loadDetails({
          token: data.token,
          firstName,
          lastName,
          email,
        })
      );
      navigation.navigate("Home");
    }
    return data;
  };

  const signModal = (
    <SignModal
      closeSignModal={() => navigation.navigate("Home")}
      onSignIn={() => setIsSigningIn(true)}
      onSignUp={() => setIsSigningUp(true)}
    />
  );

  const signinForm = <SigninForm submit={signIn} closeModal={closeModal} />;

  const signupForm = <SignupForm submit={signUp} closeModal={closeModal} />;

  const userDetails = <UserDetails logout={() => dispatch(disconnect())} />;

  const modalToShow = () => {
    if (isSigningIn) return signinForm;
    if (isSigningUp) return signupForm;
    if (!userInfo.isConnected) return signModal;
    return userDetails;
  };

  return (
    <SafeAreaView style={[styles.container, { height }]}>
      {modalToShow()}
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
  text: {
    color: "black",
    fontSize: 26,
    margin: 20,
  },
});
