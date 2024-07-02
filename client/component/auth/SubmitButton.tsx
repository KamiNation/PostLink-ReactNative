import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { textSubmit, textOpacity } from "../../screens/screenStyles/screenStyles";

interface PropsFromSignUpForButton {
  title: string;
  handleSubmit: () => void
  loading: boolean
}

const SubmitButton: React.FC<PropsFromSignUpForButton> = ({title, handleSubmit, loading}) => {
  return (
    <TouchableOpacity 
    style={textOpacity.container}
    onPress={handleSubmit}
    >
      <Text style={textSubmit.container}>
        {loading ? "Please wait..." : title}
        </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
