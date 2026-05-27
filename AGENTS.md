# AGENTS.md

## Cursor Cloud specific instructions

This repository contains `prawaas-app/`, a React Native (Expo) event app built with TypeScript.

### Quick reference
- **Install deps:** `cd prawaas-app && npm install`
- **Dev server (web):** `cd prawaas-app && npx expo start --web --port 8081`
- **Type check:** `cd prawaas-app && npx tsc --noEmit`
- **Architecture:** Config-driven — edit `src/config/eventConfig.ts` to change event data, `src/config/theme.ts` for theming, `src/data/mockData.ts` for content

### Non-obvious caveats
- Expo web mode may log `shadow*` and `pointerEvents` deprecation warnings — these are harmless React Native Web warnings
- The app uses no external images — avatars are generated from initials with deterministic color hashing
- Feature flags in `eventConfig.features` control visibility of UI elements (QR, chat bot, wallet, etc.)
