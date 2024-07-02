import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack"


import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";
import Home from "../../screens/Home";
import HeaderTab from "./HeaderTab";
import { AuthContext } from "../../context/AuthContextApi";
import Account from "../../screens/Account";
import Links from "../../screens/Links";
import ForgotPassword from "../../screens/ForgotPassword";
import PostLinks from "../../screens/PostLinks";

type RootStackParamList = {
    SignUp: undefined;
    SignIn: undefined;
    Home: undefined;
    Account: undefined
    Links: undefined
    ForgotPassword: undefined
    PostLinks: undefined
};

const Stack = createStackNavigator<RootStackParamList>();

const ScreenNav: React.FC = () => {

    const { state } = useContext(AuthContext)

    // This var holds the state of the state for when it is empty and 
    // not empty
    // When empty the tenary operator below shows the SignIn screem
    // When with value the home screen is displayed
    const authenticated = state && state.token !== "" && state.user !== null;

    return (

        <Stack.Navigator
            initialRouteName="Home"
        // screenOptions={{ headerShown: false }}
        >
            {
                authenticated ? (<>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            title: "Links Daily",
                            headerRight: () => <HeaderTab />
                        }}
                    />

                    <Stack.Screen
                        name="Account"
                        component={Account}

                    />

                    <Stack.Screen
                        name="Links"
                        component={Links}

                    />

                    <Stack.Screen
                        name="PostLinks"
                        component={PostLinks}
                        options={{
                            title: "Post",
                            headerRight: () => <HeaderTab />,
                            headerShown: true
                        }}
                    />

                </>
                )
                    :
                    (

                        <>

                            <Stack.Screen
                                name="Home"
                                component={Home}
                                options={{
                                    title: "Links Daily",
                                    headerRight: () => <HeaderTab />
                                }}
                            />

                            <Stack.Screen
                                name="Account"
                                component={Account}

                            />


                            <Stack.Screen
                                name="Links"
                                component={Links}

                            />

                            <Stack.Screen
                                name="ForgotPassword"
                                component={ForgotPassword}

                            />


                            {/* <Stack.Screen
                                name="ForgotPassword"
                                component={ForgotPassword}
                                options={{ headerShown: false }}
                            /> */}

                            <Stack.Screen
                                name="PostLinks"
                                component={PostLinks}
                                options={{
                                    title: "Post Link",
                                    headerRight: () => <HeaderTab />
                                }}
                            />

                            {/* 
                            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} /> */}
                        </>

                    )
            }
        </Stack.Navigator>

    )
}

export default ScreenNav


