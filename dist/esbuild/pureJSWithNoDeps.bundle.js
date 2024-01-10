// examples/pureJSWithNoDeps/colors.js
var COLOR_PALETTE = [
  "cyan",
  "blue",
  "violet",
  "grape",
  "pink",
  "green",
  "teal",
  "yellow",
  "orange",
  "red"
];

// examples/pureJSWithNoDeps/constants.js
var isAndroid = /\b(android)\b/i.test(navigator.userAgent);
var strokeColor = COLOR_PALETTE[0];

// examples/pureJSWithNoDeps/index.js
console.log("HELLO IS ANDROID", isAndroid);
