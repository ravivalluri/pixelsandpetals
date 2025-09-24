# Cross-Platform UI Component Pattern

This document explains how to create reusable UI components that work across both web (Next.js) and mobile (React Native/Expo) platforms.

## File Structure Pattern

For each component, create three files:

```
components/ComponentName/
├── index.ts          # Default export (points to native)
├── index.web.ts      # Web-specific export
├── index.native.ts   # Native-specific export
├── ComponentName.native.tsx  # React Native implementation
└── ComponentName.web.tsx     # Web implementation
```

## Example: Button Component

### 1. Native Implementation (`Button.native.tsx`)

```tsx
import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing } from '../../tokens';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'subtle';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', style, textStyle }) => {
  return (
    <TouchableOpacity style={[baseStyles, variantStyles[variant], style]} onPress={onPress}>
      <Text style={[baseTextStyles, textVariantStyles[variant], textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
```

### 2. Web Implementation (`Button.web.tsx`)

```tsx
import React from 'react';
import { colors, spacing } from '../../tokens';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'subtle';
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', style, textStyle }) => {
  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant], ...style }}
      onClick={onPress}
    >
      <span style={{ ...baseTextStyles, ...textVariantStyles[variant], ...textStyle }}>
        {title}
      </span>
    </button>
  );
};
```

### 3. Index Files

**`index.ts` (default - points to native):**

```ts
export * from './Button.native';
```

**`index.native.ts`:**

```ts
export * from './Button.native';
```

**`index.web.ts`:**

```ts
export * from './Button.web';
```

## Metro Configuration (React Native)

Ensure your Metro bundler is configured to resolve platform-specific files:

```js
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.watchFolders = [path.resolve(__dirname, '../..')];
config.resolver.platforms = ['native', 'ios', 'android', 'web'];
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../..', 'node_modules'),
];

module.exports = config;
```

## Platform Resolution Order

Metro/Webpack will resolve files in this order:

1. `Component.native.tsx` (for React Native)
2. `Component.ios.tsx` (for iOS specifically)
3. `Component.android.tsx` (for Android specifically)
4. `Component.web.tsx` (for web)
5. `Component.tsx` (fallback)

## Usage in Apps

### Mobile App (React Native/Expo)

```tsx
import { Button, colors, spacing } from '@pixelsandpetals/ui';

export default function App() {
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Button
        title="Mobile Button"
        onPress={() => console.log('Pressed')}
        variant="primary"
      />
    </View>
  );
}
```

### Web App (Next.js)

```tsx
import { Button, colors, spacing } from '@pixelsandpetals/ui';

export default function Page() {
  return (
    <div style={{ backgroundColor: colors.background }}>
      <Button
        title="Web Button"
        onPress={() => alert('Pressed')}
        variant="primary"
      />
    </div>
  );
}
```

## Benefits

1. **Code Reuse**: Same component interface across platforms
2. **Design Consistency**: Shared design tokens ensure visual consistency
3. **Maintenance**: Single source of truth for component behavior
4. **Type Safety**: TypeScript interfaces shared across platforms
5. **Platform Optimization**: Native implementations optimized for each platform

## Design Tokens

Share design tokens across platforms:

```ts
// tokens/colors.ts
export const colors = {
  background: '#fdfdfd',
  accentPop: '#ff6f61',
  darkGray: '#333333',
  // ...
};

// tokens/spacing.ts
export const spacing = {
  4: 16,
  6: 24,
  8: 32,
  // ...
};
```

## Testing

Test components on all platforms:

1. **iOS**: `npm run mobile:ios`
2. **Android**: `npm run mobile:android`
3. **Web**: Visit `http://localhost:3001` - handled by Next.js (separate from mobile)

### Platform-Specific Commands

From the root directory:

- `npm run mobile:ios` - Run on iOS simulator
- `npm run mobile:android` - Run on Android emulator
- `npm run dev:mobile` - Start Metro bundler for mobile development
- `npm run dev` - Start Next.js web development server

### Architecture

- **Mobile App** (`apps/mobile/`): Expo app targeting iOS and Android only
- **Web App** (`apps/web/`): Next.js app for web platform
- **Shared UI** (`packages/ui/`): Cross-platform components with `.native.tsx` and `.web.tsx` variants

This pattern ensures your UI components work seamlessly across both web and mobile platforms while maintaining optimal performance and user experience on each platform.
