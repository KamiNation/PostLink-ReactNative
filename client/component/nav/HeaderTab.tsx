import React, { useContext } from 'react'
import { View, TouchableOpacity, SafeAreaView, Text } from "react-native"
import { AuthContext } from '../../context/AuthContextApi'
import AsyncStorage from '@react-native-async-storage/async-storage';



const HeaderTab = () => {
    const {  setState } = useContext(AuthContext);

    // signOut logic 
    const signOut = async () => {
        // reset the state of token to an empty string
        // and user to null
        setState({ token: "", user: null })
        // remove the saved asyncStorage ("@auth") from
        //  asyncStorage 
        await AsyncStorage.removeItem("@auth")
    };
    return (
        // Return a icon and use the signout logic function
        // in TouchableOpacity with onPress
        <SafeAreaView>
            <TouchableOpacity onPress={signOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HeaderTab