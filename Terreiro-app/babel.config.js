module.exports = function (api) {
  api.cache(true);
  
  const presets = [
    ['babel-preset-expo', {
      jsxImportSource: 'react-native',
      web: { useTransformReactJsxExperimental: true },
    }],
    '@babel/preset-typescript',
  ];

  const plugins = [
    ['module-resolver', {
      root: ['./'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        '@': './',
        '@/components': './components',
        '@/screens': './app',
        '@/hooks': './hooks',
        '@/contexts': './contexts',
        '@/constants': './constants',
        '@/types': './types',
        '@/utils': './utils',
        '@/assets': './assets',
        '@/navigation': './navigation',
      },
    }],
    'react-native-reanimated/plugin',
  ];

  return {
    presets,
    plugins,
  };
};
