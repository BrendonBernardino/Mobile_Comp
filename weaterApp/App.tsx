import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react'
import * as weather from "./data.json"

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

export default function App() {
  const [newCity       , setNewCity]       = useState(0);
  const [city          , setCity]          = useState("");
  const [state         , setState]         = useState("");
  const [date          , setDate]          = useState("");
  const [temperature   , setTemperature]   = useState("");
  const [daily_summary , setDaily_summary] = useState("");
  const [wind          , setwind]          = useState("");
  const [humidity      , sethumidity]      = useState("");
  const [visibility    , setVisibility]    = useState("");

  const json = JSON.stringify(weather);
  let weather2: DataArray = JSON.parse(json);
  
  async function api() {
    const res = await fetch("./data.json");
    console.log(res);
    return res;
  }

  const verifyCity = (datajson: DataArray) => {
    let weatherSelect: Data = datajson[newCity]
      
    // weatherSelect = weather2[newCity]
    setCity(weatherSelect.city)
    setState(weatherSelect.state)
    setDate(weatherSelect.date)       
    setTemperature(weatherSelect.temperature)
    setDaily_summary(weatherSelect.daily_summary)
    setwind(weatherSelect.wind)
    sethumidity(weatherSelect.humidity)
    setVisibility(weatherSelect.visibility)
  }

  useEffect(() => {
    verifyCity(weather2)

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
  }, []);


  return (
    <View style={styles.container}>
      <View style={[styles.linha, styles.localidade]}>
        <Text style={{fontWeight: "bold", fontSize: 23}}>{city} - {state}</Text>
      </View>
      <View style={[styles.linha, styles.data]}>
        <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>{date}</Text>
      </View>
      <View style={[styles.linha, styles.status]}>
        <Text style={{fontSize: 17, fontWeight: "bold"}}>ensolarado</Text>
      </View>
      <View style={[styles.linha, styles.temp]}>
        <Text style={{fontSize: 165, fontWeight: "bold"}}>{temperature}</Text>
      </View>
      <View style={[styles.linha, styles.resumo]}>
        <Text>Resumo diárioS</Text>
        <Text>{daily_summary}</Text>
      </View>
      <View style={[styles.linha, styles.card]}>
        <View style={[styles.coluna, styles.vhv]}>

        </View>
        <View>

        </View>
        <View>

        </View>
        <Text>{wind} - {humidity} - {visibility}</Text>
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
    // backgroundColor: "pink",
    // paddingTop: "5%",
    // width: "50%",
    marginTop: "20%",
    marginBottom: "5%",
    // marginVertical: "5%",
  },
  data: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
    width: "50%",
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
  },
  resumo: {
    flex: 1,
    width: "80%",
  },
  card: {
    flex: 1,
    backgroundColor: "black",
    marginBottom: "15%",
    width: "80%",
    borderRadius: 15,
  },
  coluna: {

  },
  vhv: {

  }
});
