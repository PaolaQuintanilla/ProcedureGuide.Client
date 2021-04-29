import React, { useState, useEffect } from 'react';
import { Block, Text, Button, theme } from 'galio-framework';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import axios from 'axios'
import AxiosFactory from '../api/axiosFactory';




function Tramites(props) {
  const [procedure, setProcedure] = useState([]);
  async function load() {
    const api = AxiosFactory('tramite');
    const response = await api.get('http://192.168.0.141:5000/tramite/GetByFaculty/' + props.route.params.itemId);
    setProcedure(response.data)
  }

  const data = [{ nombre: "tr1", idTramites: 1 }, { nombre: "tr2", idTramites: 2 }, { nombre: "tr3", idTramites: 3 }];

  useEffect(() => {
    load();
  }, [])

  function renderCards() {
    return (
      <Block>
        {
          procedure.map((tramite, i) => {
            return (<List.Item
              onPress={() => props.navigation.navigate('InfoTramite', { tramite: tramite.id })}
              key={i}
              title={tramite.name}
              description={tramite.description}
              left={props => <List.Icon {...props} icon="folder" />}
            />)
          })
        }

      </Block>
    );
  };

  return (
    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false}>{renderCards()}</ScrollView>
    </Block>
  )
}

export default Tramites;