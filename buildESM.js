const { build } = require("esbuild");
const fs = require("fs");

const createESMBrowserBuild = async (fileName, minify = false) => {
  const outputFileNamePrefix = fileName.split("/")[1];
  const outputFileName = minify
    ? `${outputFileNamePrefix}.bundle.min.js`
    : `${outputFileNamePrefix}.bundle.js`;
  const result = await build({
    entryPoints: [fileName],
    bundle: true,
    format: "esm",
    outfile: `dist/esbuild/${outputFileName}`,
    metafile: true,
    minify,
  });
  fs.writeFileSync("meta.json", JSON.stringify(result.metafile));
};

const fileNames = [
  "examples/pureJSWithNoDeps/index.js",
  "examples/withNonESMDeps/index.js",
];
for (file of fileNames) {
  createESMBrowserBuild(file);
  // with minification
  createESMBrowserBuild(file, true);
}
