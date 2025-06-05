import { MaterialIcons } from '@expo/vector-icons';

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export type AppRoute = 
  | '/(tabs)/' 
  | '/(tabs)/herbs' 
  | '/(tabs)/cleaning' 
  | '/(tabs)/fronts' 
  | '/(tabs)/reading' 
  | '/(tabs)/baths'
  | '/(tabs)/events'
  | '/(tabs)/messages'
  | '/(tabs)/compras'
  | '/(tabs)/vendas'
  | '/(tabs)/users'
  | '/chat';

export interface MenuItem {
  id: string;
  title: string;
  icon: MaterialIconName;
  color: string;
  route: AppRoute;
  image: any;
}

export interface RecentItem {
  id: string;
  title: string;
  type: string;
  icon: MaterialIconName;
  color: string;
}
