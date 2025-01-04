import React from "react";
import { Button, StyleSheet, View, GestureResponderEvent } from "react-native";

type MyButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default function MyButton({ title, onPress }: MyButtonProps) {
  return (
    <View style={styles.container}>
      <Button title={title} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
});
