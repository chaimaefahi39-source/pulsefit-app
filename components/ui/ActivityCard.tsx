import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { Calendar, Timer, MapPin, Trash2 } from 'lucide-react-native';
import { WorkoutSession } from '../../store/useAppStore';

interface CardProps {
  session: WorkoutSession;
  onDelete: (id: string) => void;
}

export default function ActivityCard({ session, onDelete }: CardProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <Animated.View 
      entering={FadeInUp.duration(400)} 
      layout={Layout.springify()} 
      style={styles.card}
    >
      <View style={styles.topRow}>
        <View style={styles.dateGroup}>
          <Calendar size={16} color="#8B949E" />
          <Text style={styles.dateText}>{session.date}</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(session.id)}>
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.dataItem}>
          <MapPin size={16} color="#007AFF" />
          <Text style={styles.valueText}>{session.distance.toFixed(2)} km</Text>
        </View>
        <View style={styles.dataItem}>
          <Timer size={16} color="#FF5E3A" />
          <Text style={styles.valueText}>{formatTime(session.duration)}</Text>
        </View>
        <Text style={styles.calText}>{session.calories} kcal</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#161B22', borderRadius: 16, padding: 16, marginBottom: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  dateGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { color: '#8B949E', fontSize: 14 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dataItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  valueText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  calText: { color: '#FF5E3A', fontSize: 16, fontWeight: 'bold' },
});