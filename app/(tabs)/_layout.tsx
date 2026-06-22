import { Tabs } from 'expo-router';
import { LayoutDashboard, Activity, User } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        
        tabBarStyle: { 
          backgroundColor: '#FFFFFF',    
          borderTopWidth: 1, 
          borderTopColor: '#E5E9F0',      
          height: 65, 
          paddingBottom: 10, 
          paddingTop: 5,
          shadowColor: '#1A1F2C',         
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.03,
          shadowRadius: 6,
          elevation: 8,
        },
        tabBarActiveTintColor: '#FF4500', 
        tabBarInactiveTintColor: '#7D879C', 
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        }
      }}
    >
   
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Dashboard', 
          tabBarIcon: ({ color }) => <LayoutDashboard size={22} color={color} /> 
        }} 
      />

     
      <Tabs.Screen 
        name="session" 
        options={{ 
          title: 'Tracking', 
          tabBarIcon: ({ color }) => <Activity size={22} color={color} /> 
        }} 
      />

     
      <Tabs.Screen 
        name="history" 
        options={{ 
          title: 'Profile', 
          tabBarIcon: ({ color }) => <User size={22} color={color} /> 
        }} 
      />
    </Tabs>
  );
}