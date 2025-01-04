import React from "react";
import { View, Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Map: undefined;
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Home Screen!</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate("Map")} />
    </View>
  );
}
