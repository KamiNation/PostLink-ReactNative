import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

interface propsFromFooterTab {
  text: string
  name: string
  handlePress: () => void
  screenName: string
  routeName: string
}


const Tab: React.FC<propsFromFooterTab> = ({ text, name, handlePress, screenName, routeName }) => {
  const aciveScreenColor: string | boolean = screenName === routeName && "#008000"

  return (
    <TouchableOpacity
    >
      <FontAwesome5
        name={name}
        style={{
          marginBottom: 3,
          alignSelf: 'center'
        }}
        size={25}
        onPress={handlePress}
        color={aciveScreenColor}

      />

      <Text>{text}</Text>

    </TouchableOpacity>
  )
}

export default Tab