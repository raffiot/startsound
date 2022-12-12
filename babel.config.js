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
            "@/navigation": "./src/navigation",
            "@/types": "./src/types",
            "@/hooks": "./src/hooks",
            "@/config": "./src/config",
            "@/context": "./src/context",
            "@/graphql": "./src/graphql",
          },
        },
      ],
    ],
  };
};
