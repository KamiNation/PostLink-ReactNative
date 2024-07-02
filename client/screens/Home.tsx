import { SafeAreaView, Text, View } from 'react-native'
import FooterTabs from '../component/nav/FooterTab'
import { viewHomeStyle, textScreenHome } from './screenStyles/screenStyles'



export default function Home() {
  return (
    <SafeAreaView style={viewHomeStyle.container}>
      <Text style={textScreenHome.container}>Home tab</Text>
      <View style={{flex:1, justifyContent:"flex-end"}}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  )
}