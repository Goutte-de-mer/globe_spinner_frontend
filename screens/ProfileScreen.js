import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import GradientFontColor from "../components/GradientFontColor";
// import { Icon } from "react-native-vector-icons/FontAwesome";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import SignModal from "../components/SignModal";
import { useSelector, useDispatch } from "react-redux";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect, disconnect, loadDetails } from "../reducers/userInfo";

import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import { CustomText } from "../components/CustomText";

const { ipAddress, port } = require("../myVariables");

export default function ProfileScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const userInfo = useSelector((state) => state.userInfo.value);
  // const userToken = useSelector((state) => state.userInfo.value.token);

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const dispatch = useDispatch();

  const closeModal = () => {
    setIsSigningIn(false);
    setIsSigningUp(false);
  };

  // const handleSubmit = () => {
  //   navigation.navigate("Suggestions");
  // };

  const signIn = async (email, password) => {
    //console.log("handleSubmitSigninForm");
    // setIsSigningIn(false);
    const data = await fetch(`http://${ipAddress}:${port}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((resp) => resp.json());
    //console.log(data);
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
    // setIsSigningUp(false);
    const data = await fetch(`http://${ipAddress}:${port}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    }).then((resp) => resp.json());
    console.log(data);
    if (data.result) {
      dispatch(connect());
      setIsSigningUp(false);
      //console.log('okkk');
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

  const signinForm = (
    <SigninForm
      submit={(email, password) => signIn(email, password)}
      closeModal={closeModal}
    />
  );

  const signupForm = (
    <SignupForm
      submit={(firstName, lastName, email, password) =>
        signUp(firstName, lastName, email, password)
      }
      closeModal={closeModal}
    />
  );

  const HandlePressLogout = () => {
    // console.log("HandlePressLogout");
    dispatch(disconnect());
  };

  //Charger depuis la db les trips bookmarked et les trips reserved
  // useEffect(() => {
  //   if (userToken) {
  //     fetchSavedTrips(userToken);
  //   }
  // }, [userToken]);

  // function fetchSavedTrips(userToken) {
  //   const url = `http://${ipAddress}:3000/${userToken}/savedTrips`;
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Oops t'as fait de la merde");
  //       }
  //       return response.json();
  //     })
  //     .then((savedTrips) => {
  //       console.log(savedTrips);
  //     });
  // }

  const userDetails = (
    <View style={styles.container}>
      {/* <Text style={{ fontSize: 30, color: "black" }}>User details...</Text> */}
      <GradientFontColor style={styles.hello}>
        Hello {userInfo.firstname} !
      </GradientFontColor>
      <CustomText style={{ color: "black", fontSize: 26, margin: 20 }}>
        My account info
      </CustomText>
      <View style={styles.userDetailsContainer}>
        <CustomText style={styles.userDetail}>
          first name: {userInfo.firstName}
        </CustomText>
        <CustomText style={styles.userDetail}>
          last name: {userInfo.lastName}
        </CustomText>
        <CustomText style={styles.userDetail}>
          email: {userInfo.email}
        </CustomText>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => HandlePressLogout()}
      >
        <Text style={{ fontSize: 16, color: "black" }}>Logout</Text>
        <FontAwesome name="sign-out" size={40} style={styles.logout} />
      </TouchableOpacity>
    </View>
  );

  const modalToShow = () => {
    if (isSigningIn) return signinForm;
    if (isSigningUp) return signupForm;
    if (!userInfo.isConnected) return signModal;
    return userDetails;
  };

  return (
    <SafeAreaView style={[styles.container, { height }]}>
      {modalToShow()}
      <ScrollView contentContainerStyle={[styles.scrollView, { width: width }]}>
        <StatusBar style="auto" />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => HandlePressLogout()}
        >
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
