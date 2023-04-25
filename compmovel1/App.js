import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.box, styles.box1]}></View>
        <View style={[styles.box, styles.box2]}></View>
        <View style={[styles.box, styles.box3]}></View>
      </View>
      <View>
        <View style={[styles.box, styles.box4]}></View>
        <View style={[styles.box, styles.box5]}><Text style={styles.text}>FLEXBOX</Text></View>
        <View style={[styles.box, styles.box6]}></View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#3C486B',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 500,
    height: 100,
    transform: [{ rotate: '270deg' }], 
    fontSize: 80, 
    letterSpacing: 20, 
    fontWeight: 'bold',
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderWidth: 5,
    borderColor: '#3C486B',
  },
  box1: {
    flex:1,
    backgroundColor: '#8F43EE',
  },
  box2: {
    flex:1,
    backgroundColor: '#62CDFF',
  },
  box3: {
    flex: 2,
    backgroundColor: '#8F43EE',
  },
  box4: {
    flex:1,
    backgroundColor: '#BFDCE5',
  },
  box5: {
    flex: 2.5,
    backgroundColor: '#62CDFF',
  },
  box6: {
    flex: 0.5,
    backgroundColor: '#8a2be2',
  },
});
