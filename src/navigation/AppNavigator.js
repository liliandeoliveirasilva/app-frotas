import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import ChecklistScreen from '../screens/ChecklistScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import JourneyLogScreen from '../screens/JourneyLogScreen';
import ExternalServicesScreen from '../screens/ExternalServicesScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Controle de Frota' }} 
        />
        <Stack.Screen 
          name="Checklist" 
          component={ChecklistScreen} 
          options={{ title: 'Checklist' }} 
        />
        <Stack.Screen 
          name="TripExpenses" 
          component={TripExpensesScreen} 
          options={{ title: 'Despesas de Viagem' }} 
        />
        <Stack.Screen 
          name="JourneyLog" 
          component={JourneyLogScreen} 
          options={{ title: 'Diário de Bordo' }} 
        />
        <Stack.Screen 
          name="ExternalServices" 
          component={ExternalServicesScreen} 
          options={{ title: 'Serviços Externos' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}