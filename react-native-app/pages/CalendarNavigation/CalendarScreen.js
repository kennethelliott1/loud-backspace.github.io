import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet} from 'react-native';

function CalendarScreen() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>CalendarScreen</Text>
      </View>
    );
  }
  export default CalendarScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#ecba82',
    alignItems: 'center',
    justifyContent: 'center'
  }
});