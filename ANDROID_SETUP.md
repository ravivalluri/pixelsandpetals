# Android Development Setup

## Option 1: Using Expo Go (Easiest)

1. **Install Expo Go** on your Android phone from Google Play Store
2. **Start development server** (already running): `npx expo start --tunnel`
3. **Scan QR code** from the Expo Dev Tools at http://localhost:8081 or from terminal
4. **Your app will load** in Expo Go

## Option 2: Android Studio & Emulator

### 1. Install Android Studio

```bash
# Download from: https://developer.android.com/studio
# Or using Homebrew:
brew install --cask android-studio
```

### 2. Setup Android SDK

1. Open Android Studio
2. Go to Android Studio > Preferences > Appearance & Behavior > System Settings > Android SDK
3. Install Android SDK Platform 34 (or latest)
4. Install Android SDK Build-Tools
5. Install Android Emulator

### 3. Setup Environment Variables

Add to your `~/.zshrc` or `~/.bash_profile`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 4. Create Virtual Device

1. Open Android Studio
2. Tools > AVD Manager
3. Create Virtual Device
4. Choose Pixel device
5. Select latest Android API (API 34)
6. Finish setup

### 5. Start Emulator & Run App

```bash
# Start emulator
emulator -avd YOUR_AVD_NAME

# Run app (in new terminal)
npm run mobile:android
```

## Option 3: Development Build (Advanced)

For native modules or custom configurations:

### 1. Build Development Client

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Build development client
eas build --platform android --profile development
```

### 2. Install Development Build

1. Download APK from EAS Build
2. Install on device/emulator: `adb install app.apk`
3. Run: `npx expo start --dev-client`

## Current Status

✅ **Expo Go Setup**: Development server running with tunnel at http://localhost:8081

- Scan QR code with Expo Go app
- Works with your current cross-platform Button component
- No additional setup required

Choose **Option 1** for immediate testing, or follow **Option 2** for full Android development setup.