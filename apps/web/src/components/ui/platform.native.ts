import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isNative = isIOS || isAndroid;

export function platformSelect<T>(platforms: {
  web?: T;
  native?: T;
  ios?: T;
  android?: T;
  default?: T;
}): T | undefined {
  if (isWeb && platforms.web !== undefined) return platforms.web;
  if (isIOS && platforms.ios !== undefined) return platforms.ios;
  if (isAndroid && platforms.android !== undefined) return platforms.android;
  if (isNative && platforms.native !== undefined) return platforms.native;
  return platforms.default;
}