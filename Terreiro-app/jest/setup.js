import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';
import { NativeModules } from 'react-native';

// Mock do React Native Gesture Handler
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  
  // Mocks comuns para o Reanimated
  Reanimated.default.call = () => {};
  
  return Reanimated;
});

// Mock do módulo nativo SafeAreaContext
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
}));

// Mock do módulo nativo do React Native
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock do módulo NativeModules
NativeModules.ReanimatedModule = {
  ...NativeModules.ReanimatedModule,
  configureProps: jest.fn(),
  createNode: jest.fn(),
  getValue: jest.fn(),
  setValue: jest.fn(),
};

// Ignorar avisos específicos durante os testes
const originalConsoleWarn = console.warn;
console.warn = (message) => {
  // Ignorar avisos específicos que não são relevantes para os testes
  if (
    message.includes('componentWillReceiveProps') ||
    message.includes('componentWillMount') ||
    message.includes('componentWillUpdate') ||
    message.includes('Require cycle:')
  ) {
    return;
  }
  
  originalConsoleWarn(message);
};

// Configuração do tempo limite dos testes
jest.setTimeout(30000);
