import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import ActivityCard from '../../components/ui/ActivityCard';
import * as ImagePicker from 'expo-image-picker';
import { Camera, User, Award, Calendar } from 'lucide-react-native';

export default function HistoryScreen() {
  const { history, deleteSession, profileImageUri, setProfileImage } = useAppStore();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const totalWorkouts = history.length;
  const totalKm = history.reduce((sum, item) => sum + parseFloat(String(item.distance || '0')), 0).toFixed(1);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage} activeOpacity={0.85}>
          <View style={styles.avatarBorder}>
            {profileImageUri ? (
              <Image source={{ uri: profileImageUri }} style={styles.avatar} />
            ) : (
              <User size={36} color="#7D879C" />
            )}
          </View>
          <View style={styles.cameraIconBadge}>
            <Camera size={12} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <Text style={styles.username}>PulseFit Athlete</Text>
        <Text style={styles.userRank}>PREMIUM MEMBER</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Award size={18} color="#FF4500" />
          <Text style={styles.summaryValue}>{totalWorkouts}</Text>
          <Text style={styles.summaryLabel}>Workouts</Text>
        </View>
        <View style={styles.summaryCard}>
          <Calendar size={18} color="#007AFF" />
          <Text style={styles.summaryValue}>{totalKm} <Text style={styles.unitMin}>km</Text></Text>
          <Text style={styles.summaryLabel}>Total Dist.</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>WORKOUT LOGS</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityCard session={item} onDelete={deleteSession} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No workouts recorded yet.</Text>
            <Text style={styles.emptySubText}>Your tracked activities will appear here.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9', paddingHorizontal: 24, paddingTop: 60 },
  profileSection: { alignItems: 'center', marginBottom: 25 },
  avatarContainer: { position: 'relative' },
  avatarBorder: { 
    width: 96, 
    height: 96, 
    borderRadius: 48, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#FF4500',
    padding: 3,
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  avatar: { width: '100%', height: '100%', borderRadius: 45 },
  cameraIconBadge: { position: 'absolute', bottom: 2, right: 2, backgroundColor: '#FF4500', width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#F4F6F9' },
  username: { color: '#1A1F2C', fontSize: 20, fontWeight: '800', marginTop: 12, letterSpacing: 0.5 },
  userRank: { color: '#7D879C', fontSize: 10, fontWeight: '700', letterSpacing: 2, marginTop: 4 },
  
  summaryContainer: { flexDirection: 'row', gap: 14, marginBottom: 30 },
  summaryCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E5E9F0' },
  summaryValue: { color: '#1A1F2C', fontSize: 20, fontWeight: '800', marginTop: 6 },
  unitMin: { fontSize: 11, color: '#7D879C', fontWeight: '400' },
  summaryLabel: { color: '#7D879C', fontSize: 11, fontWeight: '600', marginTop: 2 },

  sectionTitle: { color: '#7D879C', fontSize: 12, fontWeight: '700', letterSpacing: 2, marginBottom: 16 },
  listContainer: { paddingBottom: 40 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 50 },
  emptyText: { color: '#1A1F2C', fontSize: 15, fontWeight: '600', textAlign: 'center' },
  emptySubText: { color: '#7D879C', fontSize: 13, textAlign: 'center', marginTop: 6 },
});