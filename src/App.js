import React, { useEffect, useState, useReducer } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {

  const [repo, setRepos] = useState([])
  const [theme, setTheme] = useState({ style: false })


  useEffect(() => {
    api.get('/repositories').then(e => {
      setRepos(e.data)
    })
  }, [])

  function toogleTheme() {
    if (theme.style === false) {
      setTheme({ style: true })

    } else {

      setTheme({ style: false })
    }
  }


  async function handleLikeRepository(id) {
    api.post(`/repositories/${id}/like`).then(res => {
      const newRepo = repo
      const index = newRepo.findIndex(e => e.id === id)
      newRepo[index].likes = res.data.likes
      setRepos([...newRepo])
    })

  }

  return (
    <>

      <StatusBar barStyle="light-content"
        backgroundColor={theme.style ? "#000000" : '#7159c1'} />
      <SafeAreaView style={styles.container}
      backgroundColor={theme.style ? "#000000" : '#7159c1'}>

        <TouchableOpacity onPress={toogleTheme} style={styles.button}>
          <Text
            style={[styles.buttonTextToogle,
            { color: theme.style ? "#FFF" : '#000000' },
            { backgroundColor: theme.style ? '#A69F9F' : "#FFF" }]}
          > Dark Theme {theme.style ? `on` : `off`}</Text>
        </TouchableOpacity>

        <FlatList
          data={repo}
          keyExtractor={(e) => e.id}
          renderItem={({ item: e }) => (
            <>
              <View style={styles.repositoryContainer}
                backgroundColor={theme.style ? "#A69F9F" : '#FFFF'}
                >
                <Text style={[styles.repository,
                { backgroundColor: theme.style ? "#A69F9F" : "#FFF" }]}
                >{e.title}</Text>

                <View style={styles.techsContainer}
                  backgroundColor={theme.style ? "#000000" : '#237511'}>

                  {
                    e.techs.map(tech => <Text
                      key={`${e.id} ${Math.random()}`}
                      style={[styles.tech,
                      { color: theme.style ? "#FFF" : '#000000' },]}>
                      {tech}
                    </Text>)
                  }

                  
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={[styles.like,
                      { color: theme.style ? "#000000" : '#000000' }]}
                      testID={`repository-likes-${e.id}`}>
                    {`${e.likes} curtidas`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}

                  onPress={() => handleLikeRepository(e.id)}
                  testID={`like-button-${e.id}`}
                >
                  <Text style={[styles.buttonTextToogle,
                  { color: theme.style ? "#FFF" : '#000000' },
                  { backgroundColor: theme.style ? '#000000' : "#7159c1" }]}
                  >Curtir</Text>
                </TouchableOpacity>

              </View>
            </>
          )} />

      </SafeAreaView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    padding: 20,
  },

  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    padding: 15,
  },
  buttonTextToogle: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 20,
    padding: 15,
    textAlign: "center"
  },
});
