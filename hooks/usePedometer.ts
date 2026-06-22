import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';
import { useAppStore } from '../store/useAppStore';

export function usePedometer() {
  const setSteps = useAppStore((state) => state.setSteps);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let subscription: ReturnType<typeof Pedometer.watchStepCount> | null = null;

    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsAvailable(result);
        if (result) {

            subscription = Pedometer.watchStepCount((result) => {
            setSteps(result.steps);
          });
        }
      },
      () => setIsAvailable(false)
    );

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { isAvailable };
}