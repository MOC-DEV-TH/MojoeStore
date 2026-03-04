module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@features': './src/features',
          '@navigations': './src/navigations',
          '@providers': './src/providers',
          '@services': './src/services',
          '@redux': './src/redux',
          '@slices': './src/redux/slices',
          '@sagas': './src/redux/sagas',
          '@common': './src/common',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@constants': './src/assets/constants',
          '@images': './src/assets/images',
          '@svgs': './src/assets/svgs',
        },
      },
    ],
  ],
};
