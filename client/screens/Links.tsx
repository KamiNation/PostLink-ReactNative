import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { viewHomeStyle, textScreenHome } from './screenStyles/screenStyles'
import FooterTabs from '../component/nav/FooterTab'

export default function Links() {
  return (
    <SafeAreaView style={viewHomeStyle.container}>
            <Text style={textScreenHome.container}>Links Screens</Text>
        <View style={{flex:1, justifyContent:"flex-end"}}>
          <FooterTabs />
        </View>
      </SafeAreaView>
  )
}