# Quickmi

Quickmi is a role-based parcel delivery mobile app built with **Expo + React Native + Expo Router**.
It includes separate user and agent experiences, onboarding/auth flows, map-based booking/tracking screens, and reusable bottom-sheet driven UI flows.

## Tech Stack

- Expo SDK 54
- React Native 0.81 + React 19
- Expo Router (file-based routing)
- TypeScript
- NativeWind (Tailwind for React Native)
- React Native Maps
- Expo Location
- AsyncStorage
- Gorhom Bottom Sheet

## Features

- Role selection (`user` or `agent`) persisted in local storage.
- 3-step onboarding flow.
- Phone-based auth UI with OTP verification screen.
- User flow:
  - Home with instant/scheduled delivery entry points.
  - Vehicle selection and multi-step booking bottom sheet.
  - History (completed/ongoing/cancelled) and detail pages.
  - Profile, payment, address/place, and shared settings screens.
- Agent flow:
  - Document verification flow.
  - Map-based agent home with live location permission + tracking.
  - Offer/accept/price/trip status bottom sheet states.
- Shared screens for notifications, chat, profile updates, and settings.

## Project Structure

```txt
app/
  _layout.tsx                  # Root stack + custom font loading
  index.tsx                    # Entry redirect logic (role/onboarding/auth)
  role-selection.tsx

  (onboarding)/                # step1 -> step3
  (auth)/                      # signup + verify-code
  (user)/                      # tabs: home, history, profile + booking flow
  (agent)/                     # agent home + profile/ride/wallet
  (agent-verification)/        # KYC/document upload flow
  (shared)/                    # settings, chat, notifications, shared profile screens

components/                    # reusable cards, headers, buttons, booking/ride UI blocks
utils/
  storage.ts                   # AsyncStorage helpers for app state gates
  useUserRole.ts               # role lookup hook
assets/                        # fonts + images/svg
```

## Routing and App Gate Logic

On launch, `app/index.tsx` checks persisted state in `AsyncStorage`:

1. Role selected?
2. Onboarding completed?
3. Auth completed?
4. Selected role = `agent` or `user`?

Navigation result:

- Missing role -> `/role-selection`
- Missing onboarding -> `/(onboarding)/step1`
- Missing auth -> `/(auth)/signup`
- Agent -> `/(agent-verification)`
- User -> `/(user)/home`

## Environment Variables

Create a `.env` file (or copy `.env.example`) and set:

```bash
GOOGLE_MAPS_API_KEY_ANDROID=your_android_maps_key
GOOGLE_MAPS_API_KEY_IOS=your_ios_maps_key
```

These are wired in `app.config.js` for native map configuration.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app

```bash
npm run start
```

Then open in Expo Go / simulator / emulator from the Expo CLI menu.

### Optional native run commands

```bash
npm run android
npm run ios
npm run web
```

## Notes and Current Prototype Behavior

- Many screens currently use mocked/static data (trip details, history cards, some map points).
- OTP verification completes when any 4 digits are entered.
- Social login buttons are present as UI only.
- Some actions are placeholder-only (e.g., share/call stubs, partial settings actions).
- `npm run reset-project` exists in `package.json`, but the referenced script file is not present (`scripts/reset-project.js`).

## Assets

The `media/` folder contains demo materials including screenshots and `quickmi_demo.mp4`.

## Available Scripts

- `npm run start` - start Expo dev server
- `npm run android` - run Android native target
- `npm run ios` - run iOS native target
- `npm run web` - run web target
- `npm run lint` - run Expo lint

