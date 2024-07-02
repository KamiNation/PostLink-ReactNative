import React from "react";
import { Text, View, TextInput } from "react-native";
import { inputView, textInputStyle } from "../../screens/screenStyles/screenStyles";


interface PropsFromSignUp {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoCompleteType?: 'off' | 'username' | 'password' | 'email' | 'name' | 'tel' | 'street-address' | 'postal-code' | 'cc-number';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search';
  secureTextEntry?: boolean;
}

const UserInput: React.FC<PropsFromSignUp> = ({
  name,
  value,
  setValue,
  autoCapitalize,
  autoCorrect,
  autoCompleteType,
  keyboardType,
  secureTextEntry,
}) => {
  return (
    <View style={inputView.container}>
      <Text>{name}:</Text>

      <TextInput
        style={textInputStyle.container}
        value={value}
        onChangeText={(text) => setValue(text)}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default UserInput;
