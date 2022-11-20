module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@/design": "./src/design/index.ts",
            "@/components": "./src/design/components",
            "@/screens": "./src/screens",
            "@/navigators": "./src/navigators",
          },
        },
      ],
    ],
  };
};
