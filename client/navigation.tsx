import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { AuthContextProvider } from "./context/AuthContextApi";
import ScreenNav from "./component/nav/ScreenNav";

const RootNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <AuthContextProvider>
                <ScreenNav />
            </AuthContextProvider>
        </NavigationContainer>
    )
}

export default RootNavigation;



