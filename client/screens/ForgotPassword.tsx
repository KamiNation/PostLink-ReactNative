




import React, { useContext } from "react";
import { Text, ScrollView, View } from "react-native";
import {
    mainScrollView,
    mainView,
    styleText,
    alreadyJoined,
    forgetPass,
} from "./screenStyles/screenStyles";
import UserInput from "../component/auth/UserInput";
import { useState } from "react";
import SubmitButton from "../component/auth/SubmitButton";
import axios from "axios";


import UserImage from "../component/img/UserImage";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { StackScreenProps } from "@react-navigation/stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../context/AuthContextApi";

// Define type for navigation props
type RootStackParamList = {
    SignUp: undefined
    SignIn: undefined
    Home: undefined
    ForgotPassword: undefined
}

type ForgotPasswordPropsFromApp = StackScreenProps<RootStackParamList, 'ForgotPassword'>;


const ForgotPassword: React.FC<ForgotPasswordPropsFromApp> = ({ navigation }) => {




    const [email, setEmail] = useState("kamiTech@gmail.com");

    const [password, setPassword] = useState("kamitech");

    const [loading, setLoading] = useState(false);

    const [visible, setVisible] = useState(false)
    // const [visible, setVisible] = useState(true)


    const [resetCode, setResetCode] = useState("")

    // Import state from global state
    const { state, setState } = useContext(AuthContext)


    const handleSubmit = async () => {
        setLoading(true);
        // The If statement is to ensure all fields
        // are entered
        if (!email) {
            alert("Email is required");
            setLoading(false);
            return;
        }
        try {
            const { data } = await axios.post(`/forgot-password`, {
                email,
            });
            if (data.error) {
                alert(data.error)
                setLoading(false);
            } else {
                // Save respone to global state with destructred setState
                // setState(data)
                // Save response to Async storage
                // await AsyncStorage.setItem('@auth', JSON.stringify(data))
                setLoading(false);
                setVisible(true);
                alert("Enter the password sent to your email!!!");
                console.log("RESET PASSWORD RESPONSE", data);
                // Redirect to Home
                // navigation.navigate("Home")
            }
        } catch (error) {
            alert("Error sending Email.. Try again.")
            console.log(error);
            setLoading(false);
        }
    };


    const handlePasswordReset = async () => {
        // console.log("HANDLE PASSWORD RESET =>", email, password, resetCode);
        try {
            const { data } = await axios.post("/reset-password", {
                email,
                password,
                resetCode
            });
            console.log("RESET PASSWORD => ", data);

            if (data.error) {
                alert(data.erro)
                setLoading(false)
            } else {
                alert("You can login with your new pasword")
                navigation.navigate("SignIn")
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            alert("Password reset failed... Try again")
        }
    }


    return (
        <KeyboardAwareScrollView contentContainerStyle={mainScrollView.container}>
            <View style={mainView.container}>
                <UserImage />

                <Text style={styleText.container}>Forgot Password</Text>

                <UserInput
                    name="EMAIL"
                    value={email}
                    setValue={setEmail}
                    autoCompleteType="email"
                    keyboardType="email-address"
                />

                {
                    visible &&
                    (
                        <>
                            <UserInput
                                name="NEW PASSWORD"
                                value={password}
                                setValue={setPassword}
                                secureTextEntry={true}
                                autoCompleteType="password"
                            />

                            <UserInput
                                name="PASSWORD RESET CODE"
                                value={resetCode}
                                setValue={setResetCode}
                                secureTextEntry={true}
                            />
                        </>
                    )
                }



                <SubmitButton
                    title={visible ? "Reset Password" : "Request Reset Code"}
                    handleSubmit={visible ? handlePasswordReset : handleSubmit}
                    loading={loading}
                />



                <Text onPress={() => navigation.navigate("SignIn")} style={forgetPass.container}>Sign In</Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPassword;
