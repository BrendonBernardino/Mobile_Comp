import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons'

export default function App() {
  return (
    <View style={styles.container}>
      
      
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
          <View style={styles.block}><Text style={[styles.textblock, {color: '#20d6a6'}]}>+ou-</Text></View>
          <View style={styles.block}><Text style={[styles.textblock, {color: '#20d6a6'}]}>%</Text></View>
          <View style={styles.block}><Text style={[styles.textblock, {color: '#FF7878'}]}>/</Text></View>
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
    // height: '40%',
  },
  operations: {
    flex: 1,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: '#292D36',//'#292D36',
    // marginVertical: '20%',
    // paddingTop: '10%',
    padding: '6%',
    
  },
  input: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
    width: '100%',
    paddingRight: 30,
    // letterSpacing: 50,
  },
  output: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'purple',
    justifyContent: 'flex-end',
    flexGrow: 0.5,
    width: '100%',
    paddingRight: 30,
    paddingBottom: 30,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    // justifyContent: 'space-around',
  },
  block: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    borderRadius: 20,
    backgroundColor: '#292A34',//#292A34
    marginHorizontal: '3%',
    marginVertical: '1.5%',
    // paddingHorizontal: 10,
  },
  textblock: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    // fontFamily: 
    fontSize: 22,
    fontWeight: 'bold',
    paddingRight: '4%',
  }
});
