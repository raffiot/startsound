import "dotenv/config";

export default {
  expo: {
    name: "astrojuke",
    slug: "astrojuke",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.milkapp.astrojuke",
      versionCode: 4,
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "https",
              host: "starsound.fly.dev",
              pathPrefix: "/invite",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    ios: {
      bundleIdentifier: "com.milkapp.astrojuke",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    scheme: "astrojuke",
    extra: {
      // firebaseApiKey: process.env.FIREBASE_API_KEY,
      // firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      // firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      // firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      // firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      // firebaseAppId: process.env.FIREBASE_APP_ID,
      // firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      // firebaseRegion: process.env.FIREBASE_REGION,
      deeplinkUrlPrefix: process.env.DEEPLINK_URL_PREFIX,
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
      graphqlApiUrl: process.env.GRAPHQL_API_URL,
      googleAPIKey: process.env.GOOGLE_API_KEY,
      eas: {
        projectId: "7934425d-ab01-4282-bf34-c95a252c55f2",
      },
    },
  },
};
