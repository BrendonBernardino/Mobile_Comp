import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, Entypo, FontAwesome, AntDesign, SimpleLineIcons, Fontisto, Ionicons } from 'react-native-vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation, route }) {
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [login, setLogin] = useState(null);
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [orgsURL, setOrgsURL] = useState(null);
  const [repoURL, setRepoURL] = useState(null);
  const [followURL, setFollowURL] = useState([]);

  const {id} = route.params;
  const url = "https://api.github.com/users/"

  useEffect(() => {
    fetch(url + id) //"https://api.github.com/users/brendonbernardino"
    .then((response) => response.json())
    .then((data) => {[setAvatar(data.avatar_url), setLogin(data.login), setName(data.name), 
                  setBio(data.bio), setOrgsURL(data.organizations_url), setRepoURL(data.repos_url), setFollowURL(data.followers_url)]
                  setError(0)
                  console.log(id)
                })
    .catch(() => {
      setError(1),
      console.log("Erro")
    })
    .finally(() => console.log("Finalizado"));
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.blocoPerfil}>
        <View style={styles.avatar}>
          <Image style={styles.img} source={{uri:avatar}}/>
          <TouchableOpacity style={styles.lupa} onPress={() =>navigation.navigate("GITHUB Search")}>
            <Entypo name= "magnifying-glass" style={{fontSize: 30, color: "white"}}></Entypo>
          </TouchableOpacity>
        </View>
        <View style={styles.nome}><Text style={{fontWeight: "bold", fontSize: 23}}>{name}</Text></View>
        <View style={styles.arroba}><Text style={{fontSize: 17, color: "#b5b5b5"}}>@{login}</Text></View>
      </View>
      <View style={styles.blocoNavegacao}>
        <TouchableOpacity style={[styles.linha, {borderTopEndRadius: 17, borderTopStartRadius: 17, borderWidth: 0.01}]} onPress={() => navigation.navigate("Bio", {bio})}>
          <View style={styles.icons}><FontAwesome name= "user-o" style={{fontSize: 19}}></FontAwesome></View>
          <View style={styles.info}>
            <Text style={{fontWeight: "bold", fontSize: 17}}>Bio</Text>
            <Text style={{fontSize: 12, color: "#b5b5b5"}}>Um pouco sobre o usuário</Text>
          </View>
          <View style={styles.seta}><AntDesign name= "right" style={{fontSize: 15}}></AntDesign></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linha} onPress={() => navigation.navigate("Organizações", {orgsURL})}>
          <View style={styles.icons}><SimpleLineIcons name= "earphones-alt" style={{fontSize: 19}}></SimpleLineIcons></View>
          <View style={styles.info}>
            <Text style={{fontWeight: "bold", fontSize: 17}}>Orgs</Text>
            <Text style={{fontSize: 12, color: "#b5b5b5"}}>Organizações que o usuário faz parte</Text>
          </View>
          <View style={styles.seta}><AntDesign name= "right" style={{fontSize: 15}}></AntDesign></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linha} onPress={() => navigation.navigate("Repositórios", {repoURL})}>
          <View style={styles.icons}><Fontisto name= "file-1" style={{fontSize: 19}}></Fontisto></View>
          <View style={styles.info}>
            <Text style={{fontWeight: "bold", fontSize: 17}}>Repositórios</Text>
            <Text style={{fontSize: 12, color: "#b5b5b5"}}>Lista contendo todos os repositórios</Text>
          </View>
          <View style={styles.seta}><AntDesign name= "right" style={{fontSize: 15}}></AntDesign></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linha} onPress={() => navigation.navigate("Tela de Seguidores", {followURL})}>
          <View style={styles.icons}><MaterialCommunityIcons name= "face-recognition" style={{fontSize: 19}}></MaterialCommunityIcons></View>
          <View style={styles.info}>
            <Text style={{fontWeight: "bold", fontSize: 17}}>Seguidores</Text>
            <Text style={{fontSize: 12, color: "#b5b5b5"}}>Lista de seguidores</Text>
          </View>
          <View style={styles.seta}><AntDesign name= "right" style={{fontSize: 15}}></AntDesign></View>
        </TouchableOpacity>
      </View>
      <View style={styles.blocoReset}>
        <TouchableOpacity style={styles.resetlinha}>
          <View style={styles.reseticon}><Ionicons name= "exit-outline" style={{fontSize: 20}}></Ionicons></View>
          <View style={styles.resetar}><Text style={{fontWeight: "bold", fontSize: 17}}>Resetar</Text></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SearchScreen({navigation}) {
  const [id, setId] = useState("");

  return (
    <View style={styles.searchScreen}>
      <TextInput placeholder='Digite aqui o ID do usuario' onChangeText={(text) => {setId(text);}}/>
      <TouchableOpacity onPress={() => navigation.navigate("Tela de Pesquisa", {id})}>
        <Entypo name= "magnifying-glass" style={{fontSize: 50, color: "black", paddingTop: "5%"}}></Entypo>
      </TouchableOpacity>
    </View>
  );
}

function BioScreen({route}) {
  const { bio } = route.params;

  return (
    <View style={styles.bioScreen}>
      <Text style={{fontSize: 15}}>{bio}</Text>
    </View>
  );
}

function OrgsScreen({route}) {
  const { orgsURL } = route.params;
  const [orgsList, setOrgsList] = useState([])

  useEffect(() => {
    fetch(orgsURL)
    .then(response => response.json())
    .then(data => setOrgsList(data))
    .catch(() => setOrgsList('Falha na requisição: Organizações'))
    .finally(() => console.log("Finalizado"));
  }, []);

  return (
    <View style={styles.orgsScreen}>
      <ScrollView>
      {orgsList.length > 0 ? orgsList.map(organizações => {
        return (
          <View key={organizações.name}>
            <Text style={styles.lista}>{organizações.name}</Text>
          </View>
        )
      })
      : <Text>Não há organizações disponíveis</Text>}
      </ScrollView>
    </View>
  );
}

function RepoScreen({route}) {
  const { repoURL } = route.params;
  const [repoList, setRepoList] = useState([])

  useEffect(() => {
    fetch(repoURL)
    .then(response => response.json())
    .then(data => setRepoList(data))
    .catch(() => setRepoList('Falha na requisição: Repositórios'))
    .finally(() => console.log("Finalizado"));
  }, []);

  return (
    <View style={styles.repoScreen}>
      <ScrollView>
      {repoList.length > 0 ? repoList.map(repositorios => {
          return (
            <View key={repositorios.name}>
              <Text style={styles.lista}>{repositorios.name}</Text>
            </View>
          )
        })
      : <Text>Não há repositórios disponíveis</Text>}
      </ScrollView>
    </View>
  );
}

function FollowScreen({navigation, route}) {

  const { followURL } = route.params;
  const [followList, setFollowList] = useState([])

  useEffect(() => {
    fetch(followURL)
    .then(response => response.json())
    .then(data => setFollowList(data))
    .catch(() => setFollowList('Não há seguidores disponíveis.'))
    .finally(() => console.log("Finalizado"));
  }, []);

  const handleUser = (valueUser) => {
    console.log("handleuser: " + valueUser);
    navigation.navigate("Tela de Pesquisa", {id: valueUser});
  }

  return (
    <View style={styles.followersScreen}>
      <ScrollView>
      {followList.length > 0 ? followList.map(seguidores => {
          return (
            <View key={seguidores.login}>
              <Text style={styles.lista} onPress={() => handleUser(seguidores.login)}>
                {seguidores.login}
              </Text>
            </View>
          )
        })
      : <Text>Não há seguidores disponíveis</Text>}
      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GITHUB Search" component={SearchScreen}/>
        <Stack.Screen name="Tela de Pesquisa" component={HomeScreen}/>
        <Stack.Screen name="Bio" component={BioScreen}/>
        <Stack.Screen name="Organizações" component={OrgsScreen}/>
        <Stack.Screen name="Repositórios" component={RepoScreen}/>
        <Stack.Screen name="Tela de Seguidores" component={FollowScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },
  blocoPerfil: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    // backgroundColor: "pink",
    width: "50%",
  },
  img: {
    width: "75%",
    height: "70%",
    margin: "10%",
    borderRadius: 45,
  },
  lupa: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    position: "absolute",
    right: "0%",
    top: "70%",
    width: "25%",
    height: "22%",
    borderRadius: 13,
    // padding: "20%",
    // margin: "20%",
  },
  nome: {
    flex: 0.25,
  },
  arroba: {
    flex: 0.25,
  },
  blocoNavegacao: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: "#b5b5b5",
    marginHorizontal: '10%',
    marginVertical: "10%",
  },
  linha: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%',
    // borderRadius: 17,
    borderTopWidth: 0.5,
    borderColor: "#b5b5b5",
  },
  icons: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
    height: "50%",
    padding: "2%",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "black",
    marginHorizontal: '4%',
  },
  info: {
    flex: 3,
    alignItems: "flex-start",
    // backgroundColor: "purple",
    width: "80%",
    height: "55%",
    marginHorizontal: '0%',
  },
  seta: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    marginHorizontal: '2%',
    height: "40%",
  },
  blocoReset: {
    flex: 0.25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: '3%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
  },
  resetlinha: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
    width: "85%",
    margin: "2%",
    marginTop: "4%",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black",
  },
  reseticon: {
    flex: 0.8,
    alignItems: "flex-end",
    justifyContent: "center",
    // marginHorizontal: '1%',
  },
  resetar: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: '2%',
  },
  searchScreen: {
    flex: 1,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: '5%',
    // paddingTop: "2%",
  },
  bioScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: '5%',
    paddingTop: "2%",
  },
  orgsScreen: {
    flex: 1,
    marginHorizontal: '2%',
    paddingTop: "2%",
  },
  repoScreen: {
    flex: 1,
    marginHorizontal: '2%',
    paddingTop: "2%",
  },
  followersScreen: {
    flex: 1,
    marginHorizontal: '2%',
    paddingTop: "2%",
    // backgroundColor: "yellow",
  },
  lista: {
    fontSize: 25,
    width: "80%",
    paddingTop: "5%",
    paddingBottom: "5%",
    marginHorizontal: '2%',
  }
});