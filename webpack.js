const { execSync } = require("child_process");

const fileNames = [
  "examples/pureJSWithNoDeps/index.js",
  "examples/withNonESMDeps/index.js",
];

for (file of fileNames) {
  const outputFileName = file.split("/")[2];

  execSync(
    `webpack --entry ${file} --output-path ${outputFileName} --config webpack.config.js`
  );
}
