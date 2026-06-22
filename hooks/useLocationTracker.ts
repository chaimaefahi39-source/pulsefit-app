import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';

interface Coordinates {
  latitude: number;
  longitude: number;
}

function getDistanceKM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useLocationTracker(isActive: boolean) {
  const [distance, setDistance] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const lastLocation = useRef<Coordinates | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    async function startTracking() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 2000,
          distanceInterval: 2,
        },
        (location) => {
          const { latitude, longitude, speed } = location.coords;
          setCurrentSpeed(speed && speed > 0 ? speed * 3.6 : 0); 
          if (lastLocation.current) {
            const d = getDistanceKM(
              lastLocation.current.latitude,
              lastLocation.current.longitude,
              latitude,
              longitude
            );
            if (d > 0.002) { 
              setDistance((prev) => prev + d);
            }
          }
          lastLocation.current = { latitude, longitude };
        }
      );
    }

    if (isActive) {
      startTracking();
    } else {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      lastLocation.current = null;
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, [isActive]);

  const resetTracker = () => {
    setDistance(0);
    setCurrentSpeed(0);
    lastLocation.current = null;
  };

  return { distance, currentSpeed, resetTracker };
}