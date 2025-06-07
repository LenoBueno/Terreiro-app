import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  '/(tabs)': undefined;
  '/(tabs)/herbs': undefined;
  '/(tabs)/cleaning': undefined;
  '/(tabs)/fronts': undefined;
  '/(tabs)/fronts_detail/bara_detail': { id: string; name?: string };
  '/(tabs)/fronts_detail/xapana_detail': { id: string; name?: string };
  '/(tabs)/add_frente': undefined;
  '/(tabs)/reading': undefined;
  '/(tabs)/baths': undefined;
  '/(tabs)/events': undefined;
  '/(tabs)/messages': undefined;
  '/(tabs)/purchases': undefined;
  '/(tabs)/sales': undefined;
  '/(tabs)/users': undefined;
  '/(tabs)/chat': undefined;
  '/users/[id]': { id: string };
  '/users/create': undefined;
};
