export const isWeb = true;
export const isIOS = false;
export const isAndroid = false;
export const isNative = false;

export function platformSelect<T>(platforms: {
  web?: T;
  native?: T;
  ios?: T;
  android?: T;
  default?: T;
}): T | undefined {
  if (platforms.web !== undefined) return platforms.web;
  return platforms.default;
}