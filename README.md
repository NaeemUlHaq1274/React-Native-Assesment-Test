# React Native Assessment Test

A React Native Expo application that allows users to calculate the distance between two points on a Google Map. The app provides both interactive map selection and manual coordinate input options.

## 🌟 Features

- 📍 Drag and drop markers on an interactive map
- ✏️ Manual coordinate input with validation
- 📏 Real-time distance calculation in meters
- 🗺️ Multiple map view types (Standard, Satellite, Terrain)
- 📱 Fullscreen mode for better map visibility
- 🔍 Zoom controls for precise location selection
- 📍 Current location detection
- ✏️ Custom marker naming
- 💾 Coordinate precision limited to 2 decimal places

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go app on your mobile device (for testing)
- Google Maps API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sfashah96/ReactNativeAssesmentTest.git
cd ReactNativeAssesmentTest
```

2. Install dependencies:
```bash
npx expo install
yarn install
```

3. Start the Expo development server:
```bash
npx expo start
```

4. Run on your device:
- Scan the QR code with Expo Go (Android)
- Scan the QR code with Camera app (iOS)


## 📱 Usage

1. Launch the app on your device using Expo Go
2. Set markers by either:
   - Tapping on the map
   - Dragging existing markers
   - Entering coordinates manually
3. The distance between markers will be displayed automatically
4. Use the map type selector to change the map view
5. Toggle fullscreen mode for better visibility
6. Use zoom controls for precise marker placement

## 📦 Building for Production

1. Install the latest EAS CLI:
```bash
npm install -g eas-cli
```

2. Build for Android:
```bash
eas build --platform android
```

3. Build for iOS:
```bash
eas build --platform ios
```


## 🐛 Troubleshooting

1. Location Permission Issues:
   - Ensure location permissions are enabled on your device
   - Check the app permissions in your device settings

2. Map Not Loading:
   - Check your internet connection
   - Ensure you have the latest version of Expo Go

3. Build Issues:
   - Run `expo doctor` to check for common issues
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## 🙏 Acknowledgments

- [Expo](https://expo.dev/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [React Native Dropdown Picker](https://github.com/hossein-zare/react-native-dropdown-picker)
