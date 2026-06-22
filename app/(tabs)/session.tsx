import * as Haptics from 'expo-haptics';
import { Activity, Pause, Play, Square } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocationTracker } from '../../hooks/useLocationTracker';
import { useAppStore } from '../../store/useAppStore';

export default function SessionScreen() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addSession = useAppStore((state) => state.addSession);
  const { distance, currentSpeed, resetTracker } = useLocationTracker(isActive);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const handleStartPause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsActive(!isActive);
  };

  const handleStop = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsActive(false);

    if (distance > 0 || seconds > 2) {
      addSession({
        id: Math.random().toString(),
        date: new Date().toLocaleDateString('fr-FR'),
        duration: seconds,
        distance: Number(distance.toFixed(2)),
        calories: 0,
      });
    }
    setSeconds(0);
    resetTracker();
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBadgeContainer}>
        <View style={[styles.statusDot, { backgroundColor: isActive ? '#22C55E' : '#FF4500' }]} />
        <Text style={styles.statusText}>{isActive ? 'LIVE TRACKING ACTIVE' : 'WORKOUT PAUSED'}</Text>
      </View>

      <View style={styles.timerWrapper}>
        <Text style={styles.label}>ELAPSED TIME</Text>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
        <Activity size={24} color={isActive ? '#FF4500' : '#A0AEC0'} style={styles.pulseIcon} />
      </View>

      <View style={styles.grid}>
        <View style={styles.box}>
          <Text style={styles.gridLabel}>DISTANCE</Text>
          <Text style={styles.gridValue}>
            {distance.toFixed(2)} <Text style={styles.unit}>KM</Text>
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.gridLabel}>CURRENT SPEED</Text>
          <Text style={styles.gridValue}>
            {currentSpeed.toFixed(1)} <Text style={styles.unit}>KM/H</Text>
          </Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.controlsRow}>
          <TouchableOpacity style={[styles.btn, isActive ? styles.pauseBtn : styles.startBtn]} onPress={handleStartPause} activeOpacity={0.85}>
            {isActive ? <Pause size={28} color="#1A1F2C" /> : <Play size={28} color="#FFFFFF" fill="#FFFFFF" />}
          </TouchableOpacity>

          {(seconds > 0 || isActive) && (
            <TouchableOpacity style={[styles.btn, styles.stopBtn]} onPress={handleStop} activeOpacity={0.85}>
              <Square size={22} color="#FFFFFF" fill="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9', padding: 24, justifyContent: 'space-between', paddingTop: 60, paddingBottom: 40 },
  topBadgeContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E5E9F0' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusText: { color: '#7D879C', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  timerWrapper: { alignItems: 'center', justifyContent: 'center', flex: 1, marginVertical: 20 },
  label: { color: '#7D879C', fontSize: 12, fontWeight: '700', letterSpacing: 3, marginBottom: 5 },
  timer: { color: '#1A1F2C', fontSize: 76, fontWeight: '900', letterSpacing: 2, textAlign: 'center' },
  pulseIcon: { marginTop: 15 },
  grid: { flexDirection: 'row', gap: 16, width: '100%', marginBottom: 30 },
  box: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 24, paddingVertical: 24, paddingHorizontal: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E5E9F0' },
  gridLabel: { color: '#7D879C', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  gridValue: { color: '#1A1F2C', fontSize: 32, fontWeight: '800', marginTop: 10 },
  unit: { fontSize: 14, color: '#7D879C', fontWeight: '600' },
  controlsContainer: { width: '100%', alignItems: 'center', justifyContent: 'center', height: 100 },
  controlsRow: { flexDirection: 'row', gap: 28, alignItems: 'center' },
  btn: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  startBtn: { backgroundColor: '#FF4500', shadowColor: '#FF4500' },
  pauseBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9F0', shadowColor: '#1A1F2C' },
  stopBtn: { backgroundColor: '#EF4444', shadowColor: '#EF4444' },
});