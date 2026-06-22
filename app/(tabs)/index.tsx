import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { usePedometer } from '../../hooks/usePedometer';
import ProgressRing from '../../components/ui/ProgressRing';
import AnimatedCounter from '../../components/ui/AnimatedCounter';
import { Flame, MapPin, Play } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { steps, dailyGoal } = useAppStore();
  usePedometer(); 
  const router = useRouter();

  const progress = steps / dailyGoal;
  const distance = ((steps * 0.7) / 1000).toFixed(2);
  const calories = (steps * 0.04).toFixed(0);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerSubtitle}>WELCOME BACK</Text>
        <Text style={styles.headerTitle}>PULSE<Text style={styles.accentText}>FIT</Text></Text>
      </View>

      <View style={styles.progressWrapper}>
        <View style={styles.progressContainer}>
          
          <ProgressRing size={width * 0.62} strokeWidth={16} progress={progress} />
          <View style={styles.absoluteCenter}>
            <Text style={styles.liveBadge}>LIVE</Text>
           
            <AnimatedCounter value={steps} />
            <Text style={styles.goalText}>of {dailyGoal} steps</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(0, 122, 255, 0.1)' }]}>
            <MapPin size={20} color="#007AFF" />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>{distance} <Text style={styles.unitText}>km</Text></Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(255, 69, 0, 0.1)' }]}>
            <Flame size={20} color="#FF4500" />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Burned</Text>
            <Text style={styles.statValue}>{calories} <Text style={styles.unitText}>kcal</Text></Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={() => router.push('/session')} activeOpacity={0.85}>
        <View style={styles.innerButtonCircle}>
          <Play size={16} color="#FF4500" fill="#FF4500" />
        </View>
        <Text style={styles.startButtonText}>START NEW WORKOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9', paddingHorizontal: 24, justifyContent: 'space-between', paddingTop: 50, paddingBottom: 30 },
  headerContainer: { marginTop: 20, alignItems: 'center' },
  headerSubtitle: { color: '#7D879C', fontSize: 11, fontWeight: '700', letterSpacing: 3, marginBottom: 4 },
  headerTitle: { color: '#1A1F2C', fontSize: 28, fontWeight: '900', letterSpacing: 4 },
  accentText: { color: '#FF4500' },
  progressWrapper: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  progressContainer: { 
    position: 'relative', 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
  },
  absoluteCenter: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  liveBadge: { backgroundColor: '#FF4500', color: '#FFFFFF', fontSize: 10, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, letterSpacing: 1, marginBottom: 4, overflow: 'hidden' },
  goalText: { color: '#7D879C', fontSize: 13, marginTop: 4, fontWeight: '600', letterSpacing: 0.5 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 14, marginBottom: 25 },
  statCard: { 
    backgroundColor: '#FFFFFF', 
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16, 
    paddingHorizontal: 16, 
    borderRadius: 22, 
    borderWidth: 1,
    borderColor: '#E5E9F0',
    shadowColor: '#1A1F2C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  iconBadge: { width: 42, height: 42, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  statTextContainer: { marginLeft: 12, flex: 1 },
  statLabel: { color: '#7D879C', fontSize: 12, fontWeight: '600' },
  statValue: { color: '#1A1F2C', fontSize: 18, fontWeight: '800', marginTop: 2 },
  unitText: { fontSize: 12, color: '#7D879C', fontWeight: '400' },
  startButton: { 
    backgroundColor: '#FF4500', 
    flexDirection: 'row', 
    height: 62, 
    borderRadius: 22, 
    alignItems: 'center', 
    paddingLeft: 8,
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 3,
  },
  innerButtonCircle: { width: 46, height: 46, borderRadius: 16, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  startButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', letterSpacing: 1, marginLeft: 20 },
});