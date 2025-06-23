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
  | '/(tabs)/shopping'
  | '/(tabs)/sales'
  | '/(tabs)/add_frente'
  | '/(tabs)/fronts_detail/bara_detail'
  | '/(tabs)/fronts_detail/xapana_detail'
  | '/(tabs)/herb_detail/lavender_detail'
  | '/(tabs)/settings_new'
  | '/(tabs)/superadmin'
  | '/(tabs)/users'
  | '/(auth)/login'
  | '/(auth)/register'
  | '/(auth)/forgot-password'
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
