import { COLOR_PALETTE } from "./colors";
import { version as ReactVersion } from "react";

export const isAndroid = /\b(android)\b/i.test(navigator.userAgent);

export const strokeColor = COLOR_PALETTE[0];

export const checkReactVersion = () => {
  return `React version is ${ReactVersion}`;
};
