# Define the project root directory
$projectRoot = "./src"

# Define the folder structure
$folders = @(
    "$projectRoot/components",
    "$projectRoot/screens",
    "$projectRoot/navigation",
    "$projectRoot/hooks",
    "$projectRoot/utils",
    "$projectRoot/styles"
)

# Create the folder structure
foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder
}

# Create sample files with initial content
# App.tsx
$appContent = @"
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
        <NavigationContainer>
            <AppNavigator />
        );
    }
}
"@
Set-Content -Path "./App.tsx" -Value $appContent

# AppNavigator.tsx
$appNavigatorContent = @"
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Map' component={MapScreen} />
        </Stack.Navigator>
    );
}
"@
Set-Content -Path "$projectRoot/navigation/AppNavigator.tsx" -Value $appNavigatorContent

# HomeScreen.tsx
$homeScreenContent = @"
import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to Home Screen!</Text>
        </View>
    );
}
"@
Set-Content -Path "$projectRoot/screens/HomeScreen.tsx" -Value $homeScreenContent

# MapScreen.tsx
$mapScreenContent = @"
import React from 'react';
import { View, Text } from 'react-native';

export default function MapScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to Map Screen!</Text>
        </View>
    );
}
"@
Set-Content -Path "$projectRoot/screens/MapScreen.tsx" -Value $mapScreenContent

# Styles example
$colorsContent = @"
export default {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#ecf0f1',
    text: '#2c3e50',
};
"@
Set-Content -Path "$projectRoot/styles/colors.ts" -Value $colorsContent

# Output success message
Write-Host "Project structure created successfully in $PWD/src"
