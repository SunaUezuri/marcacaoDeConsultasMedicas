import { registerRootComponent } from 'expo';
export { Appointment } from './src/types/appointments';
export { Doctor } from './src/types/doctors';
export { RootStackParamList } from './src/types/navigation';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
