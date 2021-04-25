import React, { useState, useEffect } from 'react';
import { Block } from 'galio-framework';
import { List } from 'react-native-paper';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import AxiosFactory from '../api/axiosFactory';

function InfoTramite (props) {
    const [requisitos, setRequisitos] = useState([]) 
    async function load() {
      const api = AxiosFactory('tramite');
      const data = await api.get('http://192.168.0.141:5000/tramite/GetRequisitosBy/'+ props.route.params.tramite);
      setRequisitos(data.data)
    }
    useEffect(() => { 
      load();
    }, [])
    return (
        <Block style={{ marginTop: 80, marginBottom: 30, marginLeft:30}}>
            {
              requisitos.map( (tramite, i) => {
                  return (
                  <List.Item
                      onPress={() => props.navigation.navigate('Direccion', {tramite: tramite.idTramites})}
                      key={i}
                      title={tramite.nombre}
                      description={tramite.nombre}
                      left={props => <List.Icon {...props} icon="check"/>}
                      right={props => <List.Icon {...props} icon="information"/>}
                  />)
              })
            }
        </Block>
    )    
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    justifyContent:'flex-start',
    alignItems: 'center',
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  list: {
    width: 100,
    height: 100,
    backgroundColor: "red"
  },
  title: { 
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default InfoTramite;