import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerActions } from '@react-navigation/native';

// Types
type EventStatus = 'scheduled' | 'cancelled' | 'completed';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  status: EventStatus;
  imageUrl?: string;
}

// Mock data fetch function
const fetchEvents = async (filter: 'upcoming' | 'past' | 'all'): Promise<Event[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockEvents: Event[] = [
        {
          id: '1',
          title: 'Festa de Iemanjá',
          description: 'Celebração anual em homenagem à Rainha do Mar',
          startDate: '2023-12-31T20:00:00',
          location: 'Praia do Leme, Rio de Janeiro',
          status: 'scheduled',
          imageUrl: 'https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg',
        },
        {
          id: '2',
          title: 'Festa de Oxóssi',
          description: 'Homenagem ao Orixá das matas e da caça',
          startDate: '2024-01-20T19:00:00',
          location: 'Mata Atlântica, São Paulo',
          status: 'scheduled',
        },
      ];
      resolve(mockEvents);
    }, 1000);
  });
};

interface EventCardProps {
  event: Event;
  onPress: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  // Determina a cor do status com base no status do evento
  const statusColors = {
    scheduled: '#4CAF50', // Verde para agendado
    cancelled: '#F44336', // Vermelho para cancelado
    completed: '#2196F3', // Azul para concluído
  };

  const eventDate = event.startDate ? new Date(event.startDate) : null;
  const formattedDate = eventDate
    ? eventDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <TouchableOpacity 
      style={styles.eventCard} 
      onPress={() => onPress(event)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              event.imageUrl ||
              'https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg',
          }}
          style={styles.eventImage}
          resizeMode="cover"
        />
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColors[event.status] },
          ]}
        >
          <Text style={styles.statusText}>
            {event.status === 'scheduled'
              ? 'Agendado'
              : event.status === 'cancelled'
                ? 'Cancelado'
                : 'Concluído'}
          </Text>
        </View>
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle} numberOfLines={1} ellipsizeMode="tail">
          {event.title}
        </Text>
        <View style={styles.eventMeta}>
          <MaterialIcons name="event" size={16} color="#666" />
          <Text style={styles.eventDate} numberOfLines={1} ellipsizeMode="tail">
            {formattedDate}
          </Text>
        </View>
        {event.location && (
          <View style={styles.eventMeta}>
            <MaterialIcons name="location-on" size={16} color="#666" />
            <Text
              style={styles.eventLocation}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {event.location}
            </Text>
          </View>
        )}
        <Text
          style={styles.eventDescription}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {event.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const EventsScreen: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');

  const loadEvents = useCallback(async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const fetchedEvents = await fetchEvents(filter);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filter]);

  const handleRefresh = useCallback(() => {
    loadEvents(true);
  }, [loadEvents]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);
  const handleCardPress = useCallback((event: Event) => {
    // Navegar para os detalhes do evento
    console.log('Evento selecionado:', event);
    // Exemplo: router.push(`/events/${event.id}`);
  }, []);

  const navigateToCreateEvent = useCallback(() => {
    // Navegação temporária para a tela de criação de evento
    console.log('Navegar para criação de evento');
    // TODO: Implementar navegação correta quando a rota estiver disponível
    // router.push('/events/create');
  }, []);

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => (navigation as any).openDrawer()}>
              <MaterialIcons
                name="blur-on"
                size={34}
                color="#fff"
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerIcons}>
            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/women/44.jpg',
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Títulos */}
        <View style={styles.titlesContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="chevron-left"
              size={30}
              color="#fff"
              style={{ marginLeft: 1 }}
            />
          </TouchableOpacity>
          <View style={styles.titlesText}>
            <Text style={styles.headerTitle}>Eventos</Text>
            <Text style={styles.headerSubtitle}>Próximas celebrações</Text>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === 'upcoming' && styles.activeFilter,
              ]}
              onPress={() => setFilter('upcoming')}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === 'upcoming' && styles.activeFilterText,
                ]}
              >
                Próximos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === 'past' && styles.activeFilter,
              ]}
              onPress={() => setFilter('past')}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === 'past' && styles.activeFilterText,
                ]}
              >
                Passados
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === 'all' && styles.activeFilter,
              ]}
              onPress={() => setFilter('all')}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === 'all' && styles.activeFilterText,
                ]}
              >
                Todos
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          <FlatList
            data={events}
            renderItem={({ item }) => (
              <EventCard event={item} onPress={handleCardPress} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.eventsList,
              events.length === 0 && { flex: 1, justifyContent: 'center' },
            ]}
            ListEmptyComponent={
              loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#006B3F" />
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  <MaterialIcons name="calendar-today" size={48} color="#9E9E9E" />
                  <Text style={styles.emptyText}>Nenhum evento encontrado</Text>
                </View>
              )
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#006B3F']}
                tintColor="#006B3F"
              />
            }
          />
        </View>

        <TouchableOpacity style={styles.fab} onPress={navigateToCreateEvent}>
          <MaterialIcons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  headerLeft: {
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titlesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  titlesText: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  filtersContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  filtersScroll: {
    paddingHorizontal: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#1E1E1E',
  },
  activeFilter: {
    backgroundColor: '#006B3F',
  },
  filterText: {
    color: '#9E9E9E',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  eventsList: {
    paddingBottom: 24,
  },
  eventCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#9E9E9E',
    marginLeft: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#9E9E9E',
    marginLeft: 4,
    flex: 1,
  },
  eventDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 8,
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#9E9E9E',
    marginTop: 16,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#006B3F',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default EventsScreen;
