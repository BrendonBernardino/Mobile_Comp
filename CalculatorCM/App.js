import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <View style={styles.blockmajor}>
          <View style={styles.input}>
            <Text style={[styles.textblock, {color: 'white'}]}>308</Text>
            <Text style={[styles.textblock, {color: '#FF7878'}]}>x</Text>
            <Text style={[styles.textblock, {color: 'white'}]}>42</Text>
          </View>
          <View style={styles.output}>
            <Text style={[styles.textblock, {color: 'white', fontSize: 50, letterSpacing: 2}]}>12936</Text>
          </View>
        </View>
        <View style={styles.operations}>
          <View style={styles.row}>
            <View style={styles.block}><Text style={[styles.textblock, {color: '#20d6a6'}]}>AC</Text></View>
            <View style={styles.block}><MaterialCommunityIcons name="plus-minus" size={24} color="#20d6a6"/></View>
            <View style={styles.block}><Text style={[styles.textblock, {color: '#20d6a6'}]}>%</Text></View>
            <View style={styles.block}><MaterialCommunityIcons name="division" size={24} color="#FF7878"/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.block}><Text style={styles.textblock}>7</Text></View>
            <View style={styles.block}><Text style={styles.textblock}>8</Text></View>
            <View style={styles.block}><Text style={styles.textblock}>9</Text></View>
            <View style={styles.block}><Text style={[styles.textblock, {color: '#FF7878'}]}>X</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.block}><Text style={styles.textblock}>4</Text></View>
            <View style={styles.block}><Text style={styles.textblock}>5</Text></View>
            <View style={styles.block}><Text style={styles.textblock}>6</Text></View>
            <View style={styles.block}><Text style={[styles.textblock, {color: '#FF7878'}]}>-</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.block}><Text style={styles.textblock}>1</Text></View>
            <View style={styles.block}><Text style={styles.textblock}>2</Text></View>
            <View style={styles.block}><Text style={styles.textblock}>3</Text></View>
            <View style={styles.block}><Text style={[styles.textblock, {color: '#FF7878'}]}>+</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.block}><MaterialCommunityIcons style={styles.textblock} name="replay"/></View>
            <View style={styles.block}><Text style={styles.textblock}>0</Text></View>
            <View style={styles.block}><Text style={styles.textblock}>.</Text></View>
            <View style={styles.block}><Text style={[styles.textblock, {color: '#FF7878'}]}>=</Text></View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22252E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockmajor: {
    flex: 0.8,
  },
  operations: {
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#292D36',
    padding: '6%',
    
  },
  input: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: 30,
  },
  output: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexGrow: 0.5,
    width: '100%',
    paddingRight: 30,
    paddingBottom: 30,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  block: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    borderRadius: 20,
    backgroundColor: '#292A34',
    marginHorizontal: '3%',
    marginVertical: '1.5%',
  },
  textblock: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    paddingRight: '4%',
  }
});
