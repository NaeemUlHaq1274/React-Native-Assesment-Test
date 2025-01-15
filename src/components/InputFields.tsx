// src/components/InputFields.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import TextInputField from "./common/TextInputField";

interface InputFieldsProps {
  inputLat: string;
  setInputLat: (lat: string) => void;
  inputLng: string;
  setInputLng: (lng: string) => void;
  inputName: string;
  setInputName: (name: string) => void;
}

const InputFields: React.FC<InputFieldsProps> = ({
  inputLat,
  setInputLat,
  inputLng,
  setInputLng,
  inputName,
  setInputName,
}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInputField
          placeholder="Latitude"
          keyboardType="numeric"
          value={inputLat}
          onChangeText={setInputLat}
          maxLength={10}
          style={styles.input}
        />
        <TextInputField
          placeholder="Longitude"
          keyboardType="numeric"
          value={inputLng}
          onChangeText={setInputLng}
          maxLength={10}
          style={styles.input}
        />
      </View>
      <TextInputField
        placeholder="Marker Name"
        value={inputName}
        onChangeText={setInputName}
        style={styles.nameInput}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  nameInput: {
    marginBottom: 12,
  },
});

export default InputFields;
