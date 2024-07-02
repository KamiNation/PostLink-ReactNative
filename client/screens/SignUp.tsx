import React, { useContext } from "react";
import { Text, View } from "react-native";
import {
  mainScrollView,
  mainView,
  styleText,
  alreadyJoined,
  signInText,
} from "./screenStyles/screenStyles";
import UserInput from "../component/auth/UserInput";
import { useState } from "react";
import SubmitButton from "../component/auth/SubmitButton";
import axios from "axios";

import UserImage from "../component/img/UserImage";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/AuthContextApi";
import { StackScreenProps } from "@react-navigation/stack";


// Define type for navigation props
type RootStackParamList = {
  SignUp: undefined
  SignIn: undefined
  Home: undefined
}

type SignUpPropsFromApp = StackScreenProps<RootStackParamList, 'SignUp'>;




const SignUp: React.FC<SignUpPropsFromApp> = ({ navigation }) => {
  const [name, setName] = useState("kamiTech");
  const [email, setEmail] = useState("kamiTech@gmail.com");
  const [password, setPassword] = useState("kamitech");
  const [loading, setLoading] = useState(false);

  // Import state from global state
  const { state, setState } = useContext(AuthContext)

  const handleSubmit = async () => {
    setLoading(true);
    // The If statement is to ensure all fields
    // are entered
    if (!name || !email || !password) {
      alert("All fields are required");
      setLoading(false);
      // The return keyword is used to end the
      // if check condition so as to not continue to
      // the try catch block
      return;
    }

    // console.log('SIGNUP REQUEST =>', name, email, password);

    try {
      const { data } = await axios.post(`/signup`, {
        name,
        email,
        password,
      });

      if (data.error) {
        alert(data.error)
        setLoading(false);
      } else {
        // Save respone to global state with destructred setState
        setState(data)
        // Save response to Async storage
        await AsyncStorage.setItem('@auth', JSON.stringify(data))
        setLoading(false);
        console.log("Signup successful =>", data);
        alert("Sign up successful")
        navigation.navigate("Home")
      }

    } catch (error) {
      alert("Signin failed. Try again.")
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={mainScrollView.container}>
      <View style={mainView.container}>
        <UserImage />

        <Text style={styleText.container}>Sign Up</Text>

        <UserInput
          name="NAME"
          value={name}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />

        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />

        <SubmitButton
          title="Sign Up"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <Text style={alreadyJoined.container}>
          Already Joined?
          <Text
            style={signInText.container}
            onPress={() => navigation.navigate('SignIn')}
          > Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
