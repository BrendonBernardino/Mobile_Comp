import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react'
import { FontAwesome5 } from 'react-native-vector-icons'
import { SelectList } from 'react-native-dropdown-select-list';
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

export default function App() {
  const [id            , setId]            = useState(0);
  const [date          , setDate]          = useState("");
  const [temperature   , setTemperature]   = useState("");
  const [dailyStatus   , setDailyStatus]   = useState("");
  const [daily_summary , setDaily_summary] = useState("");
  const [wind          , setwind]          = useState("");
  const [humidity      , sethumidity]      = useState("");
  const [visibility    , setVisibility]    = useState("");

  const json = JSON.stringify(weatherData);
  let weather: DataArray = JSON.parse(json);

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

    if(id >= 0 && id < 17) {
      setDate(weatherSelect.date)       
      setTemperature(weatherSelect.temperature)
      setDaily_summary(weatherSelect.daily_summary)
      setwind(weatherSelect.wind)
      sethumidity(weatherSelect.humidity)
      setVisibility(weatherSelect.visibility)

      verifyDailySummary(weatherSelect.daily_summary)
    }
  }

  const data = (localization: DataArray) => [
    {key:'0', value: localization[0].city+" - "+localization[0].state},
    {key:'1', value: localization[1].city+" - "+localization[1].state},
    {key:'2', value: localization[2].city+" - "+localization[2].state},
    {key:'3', value: localization[3].city+" - "+localization[3].state},
    {key:'4', value: localization[4].city+" - "+localization[4].state},
    {key:'5', value: localization[5].city+" - "+localization[5].state},
    {key:'6', value: localization[6].city+" - "+localization[6].state},
    {key:'7', value: localization[7].city+" - "+localization[7].state},
    {key:'8', value: localization[8].city+" - "+localization[8].state},
    {key:'9', value: localization[9].city+" - "+localization[9].state},
    {key:'10', value: localization[10].city+" - "+localization[10].state},
    {key:'11', value: localization[11].city+" - "+localization[11].state},
    {key:'12', value: localization[12].city+" - "+localization[12].state},
    {key:'13', value: localization[13].city+" - "+localization[13].state},
    {key:'14', value: localization[14].city+" - "+localization[14].state},
    {key:'15', value: localization[15].city+" - "+localization[15].state},
    {key:'16', value: localization[16].city+" - "+localization[16].state},
  ];

  useEffect(() => {
    changeCity(weather)
  }, [id]);


  return (
    <View style={styles.container}>
      <View style={[styles.linha, styles.localidade]}>
        <SelectList
          data={data(weather)}
          defaultOption={{key:'0', value:weather[0].city+" - "+weather[0].state}}
          search={false}
          setSelected={setId}
          boxStyles={{borderWidth: 0, top:"0%"}}
          inputStyles={{height: "100%", fontSize: 20, fontWeight: "bold"}}
          dropdownStyles={{height: "70%", bottom: "20%"}}
          arrowicon={<Text></Text>}
        />
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
    justifyContent: 'center',
    alignItens: 'center',
  },
  localidade: {
    flex: 0.7,
    justifyContent: 'center',
    alignItens: 'center',
    marginTop: "10%",
    marginBottom: "5%",
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 23,
    fontWeight: "bold",
  },
  data: {
    flex: 0.40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
    width: "60%",
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
  daily: {
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
    alignItems: 'center',
    justifyContent: 'center',
  }
});
