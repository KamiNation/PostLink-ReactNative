import React, { Children, PropsWithChildren } from 'react'
import { View, Image } from 'react-native'
import { StyleSheet } from 'react-native';






const UserImage: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <View style={circleImageView.container}>
     <View>
     {
        children ?

          (children) :

          (<Image style={photoImageStyle.container} source={require('../../assets/photo.jpeg')} />
          )
      }
     </View>
    </View>
  )
}

export default UserImage;





export const photoImageStyle = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    marginVertical: 50,
    borderRadius: 50,
  },
});

export const circleImageView = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 20,
  },
});

export const  bgImage = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 200,
    width: 200,
    borderRadius: 200,
    justifyContent: "center"
  } 
})