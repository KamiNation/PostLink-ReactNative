import { View } from 'react-native'
import React from 'react'
import { viewFooterTabsStyle } from '../../screens/screenStyles/screenStyles'
import Tab from './Tab'
import { useNavigation, useRoute } from '@react-navigation/native'


import { StackNavigationProp } from "@react-navigation/stack";


// Define type for navigation props
type RootStackParamList = {
  Home: undefined
  PostLinks: undefined
  Links: undefined
  Account: undefined
}

type NavigationProps = StackNavigationProp<RootStackParamList>

// 
export default function FooterTabs() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { name } = route
  console.log("Route =>", route);



  return (
    <View style={viewFooterTabsStyle.container}>
      <Tab text="Home" 
      name="home" 
      handlePress={() => navigation.navigate("Home")} 
      screenName="Home"
      routeName={name}
      />
      <Tab text="Post" 
      name="plus-square" 
      handlePress={() => navigation.navigate("PostLinks")} 
      screenName="PostLinks"
      routeName={name}

      />
      <Tab text="Links" 
      name="list-ol" 
      handlePress={() => navigation.navigate("Links")} 
      screenName="Links"
      routeName={name}

      />
      <Tab text="Account" 
      name="user" 
      handlePress={() => navigation.navigate("Account")} 
      screenName="Account"
      routeName={name}

      />
    </View>
  )
}