module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        // if your env variables aren't updating,
        // start expo with `--clear` option to clean cache
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: 'secret/.env',
          allowUndefined: false,
        },
      ],
    ],
  };
};
