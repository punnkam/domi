module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        // Enable `import { CONVEX_URL } from "env";` for accessing .env variables
        'moduleName': 'env',
      }],
    ],
  };
};
