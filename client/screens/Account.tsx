// Package Import 
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from "@react-navigation/stack";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"





// CSS styles import
import {
  mainScrollView,
  mainView,
  styleText,
  photoImageStyle

} from "./screenStyles/screenStyles";





// {Component} Custom import
import UserInput from "../component/auth/UserInput";
import SubmitButton from "../component/auth/SubmitButton";
import UserImage from "../component/img/UserImage";
import { AuthContext } from "../context/AuthContextApi";





// Define type for navigation props
type RootStackParamList = {
  Home: undefined
  Account: undefined
}





type AccountNavigationProps = StackScreenProps<RootStackParamList, 'Account'>;







// Functional component
const Account: React.FC<AccountNavigationProps> = ({ navigation }) => {



  // State
  const [name, setName] = useState('')

  const [email, setEmail] = useState('');

  const [uploadImage, setUploadImage] = useState("")

  const [image, setImage] = useState({
    url: "",
    public_id: ""
  });

  const [role, setRole] = useState('')

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);




  // Import state from global state
  const { state, setState } = useContext(AuthContext)


  // UseEffect to populate the fields
  // useEffect(() => {
  //   if (state) {
  //     const { name, email, image, role } = state.user;
  //     setName(name)
  //     setEmail(email)
  //     setImage(image)
  //     setRole(role)

  //   }
  // }, [state])





  // Submit button funcion logic
  // const handleSubmit = async () => {
  //   setLoading(true);

  //   // Make an api request using axios to the 
  //   // update-password route
  //   try {
  //     const { data } = axios.post("/update-password", { password });
  //     if (data.error) {
  //       alert(data.error)
  //       setLoading(false)
  //     } else {
  //       alert("Password updated")
  //       setPassword("")
  //       setLoading(false)
  //     }
  //   } catch (error) {
  //     alert("Update Password failed. Try again.")
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };





  // Function logic to handle image upload 
  const handleUpload = async () => {


    let permissionResult = await ImagePicker.requestMediaLibraryPermissionAsync();
    if (permissionResult.granted === false) {
      alert("Camera access is needde")
      return;
    }


    // Get Image from user library
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowEditing: true,
      aspect: [4, 3],
      base64: true,
    });


    // console.log('PICKER RESULT =>', pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }


    // Save to state for preview
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`
    setUploadImage(base64Image)


    // Send to backend for uploading to cloudinary
    const { data } = await axios.post('/upload-image', {
      image: base64Image
    })
    console.log("UPLOADED RESPOMSE DATA =>", data);


    // update user info in the context and async storage
    const as = JSON.parse(await AsyncStorage.getItem("@auth")); // {user: {}, token: ""}})
    as.user = data;
    await AsyncStorage.setItem("@auth", JSON.stringify(as));


    // Update the state context
    setState((prevState) => ({
      ...prevState,
      user: data
    }))


    // set the image state to that of the context
    setImage(data.image)
  }





  return (

    <KeyboardAwareScrollView contentContainerStyle={mainScrollView.container}>

      <View style={mainView.container}>

        <UserImage>
          {/* If (image && image.url){
            <Image style={photoImageStyle.container} source={{ uri: image.url }} />
          } else if ( uploadImage ){
            <Image style={photoImageStyle.container} source={{ uri: uploadImage }} />
          } else {
            <TouchableOpacity onPress={() => handleUpload()}>
                  <FontAwesome5 name="camera" size={25} color="green" />
                </TouchableOpacity>
          }*/}
          {
            image && image.url ?

              (<Image style={photoImageStyle.container} source={{ uri: image.url }} />)
              :
              uploadImage ?
                (<Image style={photoImageStyle.container} source={{ uri: uploadImage }} />)
                :
                (
                  <TouchableOpacity onPress={() => handleUpload()}>
                    <FontAwesome5 name="camera" size={25} color="green" />
                  </TouchableOpacity>
                )
          }
        </UserImage>


        {
          image && image.url ? (
            <TouchableOpacity onPress={() => handleUpload()}>
              <FontAwesome5 name="camera" size={25} color="green"
                style={{ marginTop: -5, marginBottom: 10, alignSelf: "center" }} />
            </TouchableOpacity>
          ) : (
            <>
            </>)
        }


        <Text style={styleText.container}>{name}</Text>
        <Text style={styleText.container}>{email}</Text>
        <Text style={styleText.container}>{role}</Text>



        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
{/* 
        <SubmitButton
          title="Update Password"
          handleSubmit={handleSubmit}
          loading={loading}
        /> */}

      </View>
    </KeyboardAwareScrollView>
  );
};

export default Account;
