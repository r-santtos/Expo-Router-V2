import { Redirect, Tabs} from 'expo-router';
import { Text } from 'react-native';

import { useSession } from '../context/auth';

export default function TabRoutesLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/public_screens/signin" />;
  }

  return (
    <Tabs>
      <Tabs.Screen 
        name="index"
        options={{
          title: "Dashboard"
        }}
      />

      <Tabs.Screen 
        name="profile"
        options={{
          title: "Profile"
        }}
      />
    </Tabs>
  )
}