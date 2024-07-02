import React, { useEffect, useState, createContext, PropsWithChildren } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../config';

// This type AuthContetxObj is for the provider value
type AuthContetxObj = {
    state: {
        user: string | null;
        token: string;
    };
    setState: React.Dispatch<React.SetStateAction<{
        user: string | null;
        token: string;
    }>>
}

// This is the interface for the state
interface contextStateInterface {
    user: string | null,
    token: string

}


// Creating context
export const AuthContext = createContext<AuthContetxObj>({
    state: {
        user: null,
        token: ""
    },
    setState: () => { }
});

const { Provider } = AuthContext


export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [state, setState] = useState<contextStateInterface>({
        user: null,
        token: ""
    });

    // Configure Axios baseURL
    const token  = state && state.token ? state.token : "";
    axios.defaults.baseURL = API
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    // Load the user and token from AyncStorage by default
    useEffect(() => {
        const loadFromAsyncStorage = async () => {
            try {
                let data: string | null = await AsyncStorage.getItem('@auth')
               if (data){
                const as = JSON.parse(data);
                setState((prevState) => ({
                    ...prevState,
                    user: as.user,
                    token: as.token
                }));
               }
            } catch (error) {
                console.log("Failed to load data from Async storage", error);
            }
        };
        loadFromAsyncStorage();
    }, [])

    return (
        <Provider value={{state, setState}}>
            {children}
        </Provider>
    )

}
