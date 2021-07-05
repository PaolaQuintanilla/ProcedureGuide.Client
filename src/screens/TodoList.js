import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Task from '../components/Task';
import AxiosFactory from '../api/AxiosFactory';
import Message from "../components/Message";

function TodoList() {
    const [requirements, setRequirements] = useState([]);
    const [message, setMessage] = useState("");
    async function load() {
      const { data } = await AxiosFactory('paperwork/GetRequirementsToDoBy/2').get();
      setRequirements(data)
    }
    useEffect(() => {
      load();
    }, [])
    
    const changeStateTask = (index) => {
      let reqCopy = [...requirements];
      if(index != 0 && reqCopy[index-1].active && reqCopy[index].active) {
        setMessage("Debe completar el requerimiento anterior");
      } else {
        reqCopy[index].active = !reqCopy[index].active;
        setRequirements(reqCopy);
        verifyStatePaperwork(reqCopy);
      }
    }

    const verifyStatePaperwork= (reqCopy) => {
      let paperworkCompleted = true;
      for (const req of reqCopy) {
        if(req.active) paperworkCompleted = false;  
      }
      if(paperworkCompleted) {
        setMessage("Tramite Completado");
      }
    }

    const hideMessage= () => {
      setMessage("");
    }

    return (
      <View style={styles.container}>
        {
          message != ""?
            <Message text={message} onHide={hideMessage}></Message> :
            <></>
        }
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >
        <View style={styles.tasksWrapper}>
          <View>
            {
              requirements.map((item, index) => {
                return (
                  <TouchableOpacity key={index}  onPress={() => changeStateTask(index)}>
                    <Task text={index+1 + ". " + item.name} state={item.active}/> 
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
          
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
})

export default TodoList;