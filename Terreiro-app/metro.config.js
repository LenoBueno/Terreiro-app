// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the default Metro configuration
export const config = getDefaultConfig(__dirname);

// Add support for .js files with JSX syntax
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json', 'cjs'];

// Add support for absolute imports
config.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (target, name) => {
      if (target.hasOwnProperty(name)) {
        return target[name];
      }
      // Map the alias to the actual path
      const aliasMap = {
        '@': path.resolve(__dirname, './'),
        '@/components': path.resolve(__dirname, './components'),
        '@/screens': path.resolve(__dirname, './app'),
        '@/hooks': path.resolve(__dirname, './hooks'),
        '@/contexts': path.resolve(__dirname, './contexts'),
        '@/constants': path.resolve(__dirname, './constants'),
        '@/types': path.resolve(__dirname, './types'),
        '@/utils': path.resolve(__dirname, './utils'),
        '@/assets': path.resolve(__dirname, './assets'),
        '@/navigation': path.resolve(__dirname, './navigation'),
      };
      return aliasMap[name] || path.join(process.cwd(), `node_modules/${name}`);
    },
  }
);

// Enable CSS modules
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => !['css', 'scss', 'sass'].includes(ext)
);

config.resolver.sourceExts.push('cjs');

module.exports = config;
