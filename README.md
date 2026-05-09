# logi (Expo + Firebase Auth)

Simple Expo React Native app with Firebase email/password authentication.

## What was added

- Expo React Native app scaffold
- Firebase SDK integration using environment variables
- Login screen for email/password sign-in
- Auth state handling to switch between login and home screen
- Logout action from the authenticated screen

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file from the example:

   ```bash
   cp .env.example .env.local
   ```

3. Fill `.env.local` with your Firebase Web App config values:

   - `EXPO_PUBLIC_FIREBASE_API_KEY`
   - `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
   - `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `EXPO_PUBLIC_FIREBASE_APP_ID`

4. In Firebase console, ensure Email/Password sign-in is enabled:

   - Authentication -> Sign-in method -> Email/Password -> Enable

5. Start the app:

   ```bash
   npm start
   ```

## Notes for repository owner

- Keep real Firebase values only in local env files (for example `.env.local`) and never commit secrets.
- If env vars are missing, the app shows a setup-required message instead of attempting auth.
