import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react'
import { FontAwesome5 } from 'react-native-vector-icons'
import * as weatherData from "./data.json"

type DataArray = Data[]

interface Data {
  state: string;
  city: string;
  date: string;
  temperature: string;
  daily_summary: string;
  wind: string;
  humidity: string;
  visibility: string;
}

/*
ensolarado, sol
nublado, encoberto
chuvoso, chuva forte
*/

export default function App() {
  const [newCity       , setNewCity]       = useState("");
  const [id            , setId]            = useState(0);
  const [city          , setCity]          = useState("");
  const [state         , setState]         = useState("");
  const [date          , setDate]          = useState("");
  const [temperature   , setTemperature]   = useState("");
  const [dailyStatus   , setDailyStatus]   = useState("");
  const [daily_summary , setDaily_summary] = useState("");
  const [wind          , setwind]          = useState("");
  const [humidity      , sethumidity]      = useState("");
  const [visibility    , setVisibility]    = useState("");

  const json = JSON.stringify(weatherData);
  let weather: DataArray = JSON.parse(json);
  
  async function api() {
    const res = await fetch("./data.json");
    console.log(res);
    return res;
  }

  const verifyCity = (inputCity: String) => {
    if(inputCity.startsWith("Fortal")||inputCity.startsWith("fortal"))
      setId(0);
    if(inputCity.startsWith("São")||inputCity.startsWith("são")||inputCity.startsWith("Sao")||inputCity.startsWith("sao")||inputCity.startsWith("SP")||
      inputCity.startsWith("sp"))
      setId(1);
    if(inputCity.startsWith("Rio")||inputCity.startsWith("rio")||inputCity.startsWith("RJ")||inputCity.startsWith("rj"))
      setId(2);
    if(inputCity.startsWith("Salva")||inputCity.startsWith("salva"))
      setId(3);
    if(inputCity.startsWith("Belo")||inputCity.startsWith("belo")||inputCity.startsWith("BH")||inputCity.startsWith("bh"))
      setId(4);
    if(inputCity.startsWith("Porto A")||inputCity.startsWith("porto A")||inputCity.startsWith("Porto a")||inputCity.startsWith("porto a"))
      setId(5);
    if(inputCity.startsWith("Cur")||inputCity.startsWith("cur"))
      setId(6);
    if(inputCity.startsWith("Rec")||inputCity.startsWith("rec"))
      setId(7);
    if(inputCity.startsWith("Man")||inputCity.startsWith("man"))
      setId(8);
    if(inputCity.startsWith("Flori")||inputCity.startsWith("flori"))
      setId(9);
    if(inputCity.startsWith("Goi")||inputCity.startsWith("goi"))
      setId(10);
    if(inputCity.startsWith("Vit")||inputCity.startsWith("vit"))
      setId(11);
    if(inputCity.startsWith("Bél")||inputCity.startsWith("bél")||inputCity.startsWith("Bel")||inputCity.startsWith("bel"))
      setId(12);
    if(inputCity.startsWith("Cui")||inputCity.startsWith("cui"))
      setId(13);
    if(inputCity.startsWith("Mac")||inputCity.startsWith("mac"))
      setId(14);
    if(inputCity.startsWith("Jo")||inputCity.startsWith("jo"))
      setId(15);
    if(inputCity.startsWith("Porto V")||inputCity.startsWith("porto V")||inputCity.startsWith("Porto v")||inputCity.startsWith("porto v"))
      setId(16);
    else {
      setId(-1);
    }
  }

  const verifyDailySummary = (summary: String) => {
    if(summary.indexOf("ensolarado") != -1 || 
      summary.indexOf("sol") != -1 ||
      summary.indexOf("34º") != -1 ||
      summary.indexOf("Sol") != -1 ||
      summary.indexOf("calor") != -1){
      setDailyStatus("ensolarado")
    }
    if(summary.indexOf("nublado") != -1 || 
      summary.indexOf("encoberto") != -1 ||
      summary.indexOf("nuvens") != -1) {
      setDailyStatus("nublado")
    }
    if(summary.indexOf("chuva forte") != -1) {
      setDailyStatus("chuvoso")
    }
  }
  
  const changeCity = (datajson: DataArray) => {
    let weatherSelect: Data = datajson[id]
    // weatherSelect = weather2[inputCity]
    if(id === -1) {
      <Text>Essa cidade não está disponível.</Text>
    }
    else {
      setCity(weatherSelect.city)
      setState(weatherSelect.state)
      setDate(weatherSelect.date)       
      setTemperature(weatherSelect.temperature)
      setDaily_summary(weatherSelect.daily_summary)
      setwind(weatherSelect.wind)
      sethumidity(weatherSelect.humidity)
      setVisibility(weatherSelect.visibility)

      verifyDailySummary(weatherSelect.daily_summary)
    }
  }

  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     // 👇 Get input value
  //     setNewCity(text);
  //   }
  // };

  useEffect(() => {
    verifyCity(newCity);
    changeCity(weather)

    // console.log(weather2[2])
    // console.table(weather2.wind)
    // fetch(require("data.json"))
    //   .then((response) => response.json())
    //   .then((data) => setState(data.state))
    //   .catch(() => console.log("Erro 111"))
    //   .finally(() => console.log(state));

    // setState(weather2.city)
    // setCity(pics.city
    // console.log(state)
  }, [newCity]);


  return (
    <View style={styles.container}>
      <View style={[styles.linha, styles.localidade]}>
        <TextInput style={styles.input} placeholder="Digite uma cidade capital do Brasil" onChangeText={(text) => {setNewCity(text)}} /* onSubmitEditing={() => setNewCity(newCity)}*/>{city} - {state}</TextInput>
      </View>
      <View style={[styles.linha, styles.data]}>
        <Text style={{color: "white", fontWeight: "bold", fontSize: 16, flex: 0.5}}>{date}</Text>
      </View>
      <View style={[styles.linha, styles.status]}>
        <Text style={{fontSize: 17, fontWeight: "bold"}}>{dailyStatus}</Text>
      </View>
      <View style={[styles.linha, styles.temp]}>
        <Text style={{fontSize: 150, fontWeight: "bold"}}>{temperature}</Text>
      </View>
      <View style={[styles.linha, styles.resumo]}>
        <Text style={{fontWeight: "bold"}}>Resumo diário</Text>
        <Text style={styles.daily}>{daily_summary}</Text>
      </View>
      <View style={[styles.linha, styles.card]}>
        <View style={[styles.coluna, styles.vhv]}>
          <FontAwesome5 name="wind" style={{color: "yellow", fontSize: 43}}></FontAwesome5>
          <Text style={{color: "yellow", marginTop: "5%"}}>{wind}</Text>
          <Text style={{color: "yellow", fontSize: 12}}>vento</Text>
        </View>
        <View style={[styles.coluna, styles.vhv]}>
          <FontAwesome5 name="water" style={{color: "yellow", fontSize: 43}}></FontAwesome5>
          <Text style={{color: "yellow", marginTop: "5%"}}>{humidity}</Text>
          <Text style={{color: "yellow", fontSize: 12}}>humidade</Text>
        </View>
        <View style={[styles.coluna, styles.vhv]}>
          <FontAwesome5 name="eye" style={{color: "yellow", fontSize: 43}}></FontAwesome5>
          <Text style={{color: "yellow", marginTop: "5%"}}>{visibility}</Text>
          <Text style={{color: "yellow", fontSize: 12}}>visibilidade</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linha: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItens: 'center'
  },
  localidade: {
    flex: 0.3,
    justifyContent: 'center',
    alignItens: 'center',
    // backgroundColor: "pink",
    // paddingTop: "5%",
    // width: "50%",
    marginTop: "20%",
    marginBottom: "5%",
    // marginVertical: "5%",
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    // alignItens: 'center',
    fontSize: 23,
    fontWeight: "bold",
  },
  data: {
    flex: 0.40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
    width: "60%",
    // marginVertical: "20%",
    borderRadius: 25,
  },
  status: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "5%",
  },
  temp: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "pink",
    // marginHorizontal: "16%",
  },
  resumo: {
    flex: 1,
    width: "80%",
    // backgroundColor: "blue",
  },
  daily: {
    // flex: 1,
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "5%",
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: "row",
    backgroundColor: "black",
    marginBottom: "15%",
    width: "80%",
    borderRadius: 15,
  },
  coluna: {

  },
  vhv: {
    flex: 0.5,
    // flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "gray",
    // marginTop: "5%",
  }
});
