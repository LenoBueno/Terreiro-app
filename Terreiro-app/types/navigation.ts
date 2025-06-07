import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  '(tabs)': NavigatorScreenParams<TabParamList>;
  '(auth)': undefined;
  '/(tabs)/events': undefined;
  '/(tabs)/messages': undefined;
  '/(tabs)/baths': undefined;
  '/(tabs)/herbs': undefined;
  '/(tabs)/reading': undefined;
  '/(tabs)/settings_new': undefined;
  '/(tabs)/shop': undefined;
  '/(tabs)/explore': undefined;
  '/(tabs)/product/[id]': { id: string };
  // Adicione outras rotas conforme necessário
};

type TabParamList = {
  index: undefined;
  explore: undefined;
  shop: undefined;
  // Outras abas...
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
