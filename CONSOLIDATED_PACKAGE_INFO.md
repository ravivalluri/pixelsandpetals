# Pixels & Petals Monorepo Package Configuration

This document consolidates all package.json files in the Pixels & Petals monorepo to provide a complete overview of dependencies and configurations.

## Root Package (`package.json`)

```json
{
  "name": "pixelsandpetals",
  "version": "1.0.0",
  "description": "Official Website for Pixels & Petals Organization",
  "main": "index.js",
  "scripts": {
    "dev": "cd apps/web && next dev --turbopack",
    "build": "cd apps/web && next build --turbopack",
    "start": "cd apps/web && next start",
    "lint": "cd apps/web && eslint"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ravivalluri/pixelsandpetals.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "bugs": {
    "url": "https://github.com/ravivalluri/pixelsandpetals/issues"
  },
  "homepage": "https://github.com/ravivalluri/pixelsandpetals#readme",
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next": "15.5.3",
    "framer-motion": "^12.23.12",
    "qrcode.react": "^4.2.0"
  },
  "devDependencies": {
    "turbo": "^2.5.6",
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.5.3",
    "@eslint/eslintrc": "^3"
  },
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

## Web Application (`apps/web/package.json`)

```json
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@emailjs/browser": "^4.4.1"
  }
}
```

## Mobile Application (`apps/mobile/package.json`)

```json
{
  "name": "mobile",
  "version": "1.0.0",
  "main": "index.ts",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~54.0.7",
    "expo-status-bar": "~3.0.8",
    "react": "19.1.0",
    "react-native": "0.81.4"
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "typescript": "~5.9.2"
  },
  "private": true
}
```

## UI Package (`packages/ui/package.json`)

```json
{
  "name": "@pixelsandpetals/ui",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "types": "index.d.ts",
  "exports": {
    ".": {
      "react-native": "./index.native.js",
      "default": "./index.web.js"
    }
  },
  "scripts": {
    "type-check": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "19.1.0",
    "react-native": "*"
  }
}
```

## Consolidated Dependencies Overview

### Production Dependencies (Across All Packages)
- `react`: 19.1.0 (used in root, web, mobile, ui)
- `react-dom`: 19.1.0 (used in root, web)
- `next`: 15.5.3 (used in root, web)
- `framer-motion`: ^12.23.12 (used in root)
- `qrcode.react`: ^4.2.0 (used in root)
- `@emailjs/browser`: ^4.4.1 (used in web)
- `expo`: ~54.0.7 (used in mobile)
- `expo-status-bar`: ~3.0.8 (used in mobile)
- `react-native`: 0.81.4 (used in mobile)

### Development Dependencies (Across All Packages)
- `turbo`: ^2.5.6 (used in root)
- `typescript`: ^5 (used in root) / ~5.9.2 (used in mobile)
- `@types/node`: ^20 (used in root)
- `@types/react`: ^19 (used in root) / ~19.1.0 (used in mobile)
- `@types/react-dom`: ^19 (used in root)
- `@tailwindcss/postcss`: ^4 (used in root)
- `tailwindcss`: ^4 (used in root)
- `eslint`: ^9 (used in root)
- `eslint-config-next`: 15.5.3 (used in root)
- `@eslint/eslintrc`: ^3 (used in root)

### Peer Dependencies
- `react`: 19.1.0 (required by ui package)
- `react-native`: * (required by ui package)

## Workspace Structure

The monorepo uses Yarn workspaces (configured in root package.json) to manage multiple packages:

```
pixelsandpetals/
├── apps/
│   ├── web/
│   └── mobile/
└── packages/
    ├── shared/
    └── ui/
```

## Key Insights

1. **React Version Consistency**: All packages use React 19.1.0, ensuring compatibility across web and mobile applications.

2. **Tailwind CSS Integration**: The project uses Tailwind CSS v4 with the new `@import "tailwindcss";` syntax in the root package.

3. **Turbo Monorepo**: Turbo is used for managing the monorepo structure and optimizing builds.

4. **Cross-Platform Support**: The UI package is configured to support both web and React Native targets.

5. **Type Safety**: TypeScript is used throughout with appropriate type definitions for all packages.

6. **Modern Tooling**: The project uses modern versions of Next.js (15.5.3), React (19.1.0), and Expo (54.x).

This consolidated view provides a complete picture of the dependency structure and helps identify potential conflicts or inconsistencies across packages.