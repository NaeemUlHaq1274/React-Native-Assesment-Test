// src/components/common/TextInputField.tsx

import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { COLORS } from "../../constants";

interface TextInputFieldProps extends TextInputProps {
  // Any additional props can be added here
}

const TextInputField: React.FC<TextInputFieldProps> = (props) => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    fontSize: 14,
  },
});

export default TextInputField;
