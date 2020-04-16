import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    api.get('/repositories').then(e => {
      setRepos(e.data)
      // console.log('ola', project)
    })
  }, [])


  async function handleLikeRepository(id) {
    api.post(`/repositories/${id}/like`).then(res =>{
     const newRepo = repo
     const index = newRepo.findIndex(e => e.id === id)
     newRepo[index].likes = res.data.likes
      // console.log(like)
     setRepos([...newRepo])
    })
    
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repo}
          keyExtractor={(e) => e.id}
          renderItem={({ item: e }) => (
            <>
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{e.title}</Text>

                <View style={styles.techsContainer}>

                  {
                    e.techs.map(tech => <Text 
                    key={`${e.id} ${Math.random()}`} 
                    style={styles.tech}>
                      {tech}
                    </Text>)
                  }

                  {/* <Text style={styles.tech}>
                    ReactJS
                  </Text>
                  <Text style={styles.tech}>
                    Node.js
                  </Text> */}
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${e.id}`}>
                    {`${e.likes} curtidas`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(e.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${e.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
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
    backgroundColor: "#7159c1",
  },
  flatList: {
    flex: 1
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
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
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
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
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
