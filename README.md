# TalkHive Mobile - Companion Social Media Application

TalkHive Mobile is the cross-platform companion mobile application for the **TalkHive** social media ecosystem. Built on top of React Native and Expo, it delivers a smooth, native app experience for iOS and Android users to access their feeds, publish threads, and stay connected on the go.

## 🚀 Tech Stack
- **Mobile Framework:** React Native, Expo SDK.
- **Styling:** NativeWind (Tailwind CSS for React Native layouts).
- **Navigation:** React Navigation (Native Stack & Bottom Tabs).
- **Global State:** Redux Toolkit.
- **Security & Storage:** Expo Secure Store (for secure JWT key management).
- **Features Integration:** Expo Image Picker (for camera/photo access to upload media).

---

## ✨ Key Features
- **Mobile-First Feed:** Fully responsive timeline displaying user threads, images, and interactions optimized for mobile screen ratios.
- **Publish Threads:** Post updates with images directly selected from your device's photo gallery or camera.
- **Real-time Notifications:** Listen for incoming messages and follow updates via WebSockets synchronized with the backend API.
- **State Persistence:** Preserves login session automatically using on-device secure storage for JWT tokens.

---

## 🛠️ Local Installation & Development Setup

### Prerequisites
- Node.js installed (v18 or higher recommended).
- [Expo Go](https://expo.dev/expo-go) app installed on your physical mobile device (Android/iOS) OR an active simulator/emulator (Android Studio or Xcode).
- Running **TalkHive Web & API** backend server (to handle requests).

### 1. Clone the Repository
```bash
git clone https://github.com/roynyk/talkhive-mobile.git
cd talkhive-mobile
