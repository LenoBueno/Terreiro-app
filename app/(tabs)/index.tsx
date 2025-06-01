import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { Calendar, User, Bell, MessageCircle } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { EventCard } from '@/components/EventCard';
import { useState, useEffect } from 'react';
import { Event } from '@/types';
import { fetchUpcomingEvents } from '@/services/eventService';

export default function HomeScreen() {
  const { user } = useAuth();
  const { currentTenant } = useTenant();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchUpcomingEvents();
        setUpcomingEvents(events);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={currentTenant?.name || 'Home'} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Olá, {user?.name || 'Visitante'}
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Calendar size={24} color="#000000" />
            <Text style={styles.actionText}>Eventos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <User size={24} color="#000000" />
            <Text style={styles.actionText}>Perfil</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Bell size={24} color="#000000" />
            <Text style={styles.actionText}>Notificações</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={24} color="#000000" />
            <Text style={styles.actionText}>Mensagens</Text>
          </TouchableOpacity>
        </View>
        
        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos Eventos</Text>
          
          {loading ? (
            <Text style={styles.loadingText}>Carregando eventos...</Text>
          ) : upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <Text style={styles.noEventsText}>Nenhum evento programado</Text>
          )}
        </View>
        
        {/* Featured Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destaque</Text>
          
          <View style={styles.featuredCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2310642/pexels-photo-2310642.jpeg' }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Celebração Especial</Text>
              <Text style={styles.featuredDescription}>
                Participe da nossa celebração especial neste final de semana.
              </Text>
              <TouchableOpacity style={styles.featuredButton}>
                <Text style={styles.featuredButtonText}>Saiba mais</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000000',
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#000000',
    marginTop: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 16,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
    textAlign: 'center',
    padding: 16,
  },
  noEventsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
    textAlign: 'center',
    padding: 16,
  },
  featuredCard: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 8,
  },
  featuredDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
    marginBottom: 16,
    lineHeight: 20,
  },
  featuredButton: {
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});