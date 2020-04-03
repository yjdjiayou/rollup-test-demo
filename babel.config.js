module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
//        "useBuiltIns": "usage",
//        "corejs": "3",
//        "targets": {
//          "ie": 10
//        }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
        helpers: true,
        regenerator: true,
        useESModules: true,
      }
    ],
    ["import", {
      "libraryName": "antd", "libraryDirectory": "es", "style": true
    }],
  ]
};
