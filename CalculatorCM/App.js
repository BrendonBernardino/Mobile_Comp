import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Feather, Entypo } from 'react-native-vector-icons';

const darkTheme = { //Paleta darkMode
  backgroundColor: "#000000",
  color: "#FFFFFF",
  sun:"#5A5D64",
  moon:"#FFFFFF",
  containerColor: "#22252E",
  bottomColor: "#292D36",
  blockColor: "#292A34",
};
const lightTheme = { //Paleta lightMode
  backgroundColor: "#F9F9F9",
  color: "#000000",
  sun:"#000000",
  moon:"#ADADAD",
  containerColor: "#FFFFFF",
  bottomColor: "#F9F9F9",
  blockColor: "#F9F9F9",
};

export default function App() {
  const [themeMode, setThemeMode] = useState(darkTheme);
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [thirdNumber, setThirdNumber] = useState("");

  const stylesTheme = { //Stylesheet de cores dos temas
    container: {
      backgroundColor: themeMode.containerColor,
    },
    sun: {
      color: themeMode.sun,
    },
    moon: {
      color: themeMode.moon,
    },
    operations: {
      backgroundColor: themeMode.bottomColor,
    },
    block: {
      backgroundColor: themeMode.blockColor,
    },
    textblock: {
      color: themeMode.color,
    }
  }

  const stylesKeyboard = { //Stylesheet do display
    displayfirstNumber: {
      fontSize: 50,
      fontWeight: 'bold',
      paddingRight: '4%',
      letterSpacing: 2,
    },
    displaysecondNumber: {
      fontSize: 22,
      fontWeight: 'bold',
      paddingRight: '4%',
    }
  }

  const setLightMode = () => {
    if(themeMode === darkTheme) {
      setThemeMode(lightTheme);
    }
  };
  const setDarkMode = () => {
    if(themeMode === lightTheme) {
      setThemeMode(darkTheme);
    }
  };

  const functionAC = () => { //Regra do AC
    if(firstNumber.length === 0 && secondNumber.length === 0 && operation.length === 0) {
      return <Text style={[[styles.textblock, stylesTheme.textblock], {color: '#20d6a6'}]}>AC</Text>;
    }
    else {
      return <Text style={[[styles.textblock, stylesTheme.textblock], {color: '#20d6a6'}]}>C</Text>;
    }
  }

  const maskOperation = () => { //Correção do caractere de Multiplicação
    if(operation === "*") {
      return <Text style={[[styles.textblock, stylesTheme.textblock], {color: '#FF7878'}]}>x</Text>;
    }
    else {
      return <Text style={[[styles.textblock, stylesTheme.textblock], {color: '#FF7878'}]}>{operation}</Text>;
    }
  }

  const handleNumber = (valueButton) => { //Função chamada ao clicar no botão
    console.log(valueButton);
    if(firstNumber.length < 9) { //Regra do limite de dígitos em 9
      setResult("");
      setFirstNumber(firstNumber + valueButton);
      
      if(secondNumber != "") { //Apenas para mostrar o terceiro numero da operação
        setThirdNumber(firstNumber + valueButton);
      }
    }
  };
  const handleOperation = (valueButton) => { //Função chamada ao clicar em alguma operação
    if(firstNumber === "" && valueButton != "*" && valueButton != "/" && valueButton != "%") { // Caso a primeira tecla apertada seja uma operação ao invés de um numero
      if(valueButton != "+/-") { //Para que não seja possível clicar nessa operação sem digitar um numero antes
        setFirstNumber(valueButton);
      }
    }
    else{
      setOperation(valueButton);
      setSecondNumber(firstNumber);
      setFirstNumber("");
    }
  };
  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult("");

    setThirdNumber("");
  };
  const getResult = () => {
    switch(operation) {
      case "+":
        clear();
        if(secondNumber === "0" && firstNumber === "0") {
          setResult("0");
        }
        else {
          setResult(parseFloat(secondNumber) + parseFloat(firstNumber));
        }
        break;
      case "-":
        clear();
        if(secondNumber === "0" && firstNumber === "0") {
          setResult("0");
        }
        else {
          setResult(parseFloat(secondNumber) - parseFloat(firstNumber));
        }
        break;
      case "*":
        clear();
        if(secondNumber === "0" || firstNumber === "0") {
          setResult("0");
        }
        else {
          setResult(parseFloat(secondNumber) * parseFloat(firstNumber));
        }
        break;
      case "/":
        clear();
        if(secondNumber === "0" || firstNumber === "0") {
          setResult("0");
        }
        else {
          setResult(parseFloat(secondNumber) / parseFloat(firstNumber));
        }
        break;
      case "+/-":
        clear();
        setResult((parseFloat(secondNumber)) * Math.sign(-1));
        break;
      case "%":
        clear();
        if(firstNumber === "") {
          setResult(parseFloat(secondNumber)/100);
        }
        else {
          setResult((parseFloat(secondNumber)/100) * parseFloat(firstNumber));
        }
        break;
      default:
        clear();
        setResult(0);
        break;
    }
  };
  const display = () => {
    if(result != "") {
      return <Text style={result < 99999 ? [stylesKeyboard.displayfirstNumber, stylesTheme.textblock] : [stylesKeyboard.displayfirstNumber, stylesTheme.textblock, {fontSize: 30}]}>{result.toString()}</Text>;
    }
    if(firstNumber && firstNumber.length < 6) {
      return <Text style={[stylesTheme.textblock, stylesKeyboard.displayfirstNumber]}>{firstNumber}</Text>;
    }
    if(firstNumber === "") {
      return <Text style={[stylesTheme.textblock, stylesKeyboard.displayfirstNumber]}>{""}</Text>;
    }
    if(firstNumber.length > 5 && firstNumber.length < 10) {
      return <Text style={[stylesTheme.textblock, stylesKeyboard.displayfirstNumber, {fontSize: 40}]}>{firstNumber}</Text>;
    }
    if(firstNumber.length > 9) {
      return <Text style={[stylesTheme.textblock, stylesKeyboard.displayfirstNumber, {fontSize: 22}]}>{firstNumber}</Text>;
    }
  };

  return (
    <SafeAreaView style={[styles.container, stylesTheme.container]}>
      <View >
        <View style={styles.display}>
          <View style={[styles.themeModeBar, stylesTheme.block]}>
            <TouchableOpacity style={styles.button} onPress={setLightMode}>
              <Feather style={stylesTheme.sun} name="sun" size={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={setDarkMode}>
              <Entypo style={stylesTheme.moon} name="moon" size={25}/>
            </TouchableOpacity>
          </View>
        
          <View style={styles.input}>
            <Text style={[[stylesTheme.textblock, stylesKeyboard.displaysecondNumber]]}>{secondNumber}</Text>
            {maskOperation()}
            <Text style={[stylesTheme.textblock, stylesKeyboard.displaysecondNumber]}>{thirdNumber}</Text>
          </View>
          <View style={styles.output}>
            {display()}
          </View>
        </View>
        <View style={[styles.operations, stylesTheme.operations]}>
          <View style={styles.row}>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={clear} underlayColor="#48D9C0">{functionAC()}</TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleOperation("+/-")} underlayColor="#48D9C0"><MaterialCommunityIcons name="plus-minus" size={30} color="#20d6a6"/></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleOperation("%")} underlayColor="#48D9C0"><Text style={[[styles.textblock, stylesTheme.textblock], {color: '#20d6a6', fontSize: 25}]}>%</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleOperation("/")} underlayColor="red"><MaterialCommunityIcons name="division" size={30} color="#FF7878"/></TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber("7")}><Text style={[styles.textblock, stylesTheme.textblock]}>7</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber("8")}><Text style={[styles.textblock, stylesTheme.textblock]}>8</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber("9")}><Text style={[styles.textblock, stylesTheme.textblock]}>9</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleOperation("*")} underlayColor="red"><Text style={[[styles.textblock, stylesTheme.textblock], {color: '#FF7878', fontSize: 25}]}>x</Text></TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber("4")}><Text style={[styles.textblock, stylesTheme.textblock]}>4</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber("5")}><Text style={[styles.textblock, stylesTheme.textblock]}>5</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber("6")}><Text style={[styles.textblock, stylesTheme.textblock]}>6</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleOperation("-")} underlayColor="red"><Text style={[[styles.textblock, stylesTheme.textblock], {color: '#FF7878', fontSize: 40}]}>-</Text></TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber("1")}><Text style={[styles.textblock, stylesTheme.textblock]}>1</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber("2")}><Text style={[styles.textblock, stylesTheme.textblock]}>2</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber("3")}><Text style={[styles.textblock, stylesTheme.textblock]}>3</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleOperation("+")} underlayColor="red"><Text style={[[styles.textblock, stylesTheme.textblock], {color: '#FF7878', fontSize: 30}]}>+</Text></TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => setFirstNumber(firstNumber.slice(0, -1))}><MaterialCommunityIcons style={[styles.textblock, stylesTheme. textblock]} name="replay"/></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber("0")}><Text style={[styles.textblock, stylesTheme.textblock]}>0</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => handleNumber(".")}><Text style={[[styles.textblock, stylesTheme.textblock], {fontSize: 40}]}>.</Text></TouchableHighlight>
            <TouchableHighlight style={[styles.block, stylesTheme.block]} onPress={() => getResult()} underlayColor="red"><Text style={[[styles.textblock, stylesTheme.textblock], {color: '#FF7878', fontSize: 40}]}>=</Text></TouchableHighlight>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  display: {
    flex: 0.5,
  },
  themeModeBar: {
    flex: 0.3,
    flexDirection: 'row',
    margin: '8%',
    borderRadius: 15,
    marginHorizontal: '36%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
    marginHorizontal: '14%',
  },
  input: {
    flex: 0.3,
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
  operations: {
    flex: 0.7,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: '6%',
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
    marginHorizontal: '3%',
    marginVertical: '1.5%',
  },
  textblock: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    paddingRight: '4%',
  },
});