import { Slot } from 'expo-router';
import { SessionProvider } from './context/auth';

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}