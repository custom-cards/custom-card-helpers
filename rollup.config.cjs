const typescript = require("@rollup/plugin-typescript");
const pkg = require("./package.json");

const externalPackages = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const isExternal = (id) =>
  externalPackages.some(
    (packageName) => id === packageName || id.startsWith(`${packageName}/`)
  );

const globals = {
  "@formatjs/intl-utils": "intlUtils",
  "home-assistant-js-websocket": "homeAssistantJsWebsocket",
  "intl-messageformat": "intlMessageformat",
  lit: "lit",
  "lit/directive.js": "litDirective",
  superstruct: "superstruct",
};

module.exports = {
  input: "src/index.ts",
  external: isExternal,
  plugins: [
    typescript({
      declaration: false,
      target: "ES6",
      module: "ESNext",
    }),
  ],
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/index.m.js",
      format: "es",
      sourcemap: true,
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "customCardHelpers",
      sourcemap: true,
      globals,
      exports: "named",
    },
  ],
};
