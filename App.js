import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/home.screen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <HomeScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      marginTop:50,
      marginLeft:20,
      flex: 1,
  },
});
