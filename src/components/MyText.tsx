import React, { ReactNode } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

type MyTextProps = {
  children: ReactNode;
  style?: TextStyle;
};

export default function MyText({ children, style }: MyTextProps) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: 16, color: "#2c3e50" },
});
