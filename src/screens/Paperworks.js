import React, { useState, useEffect } from 'react';
import { Block, Text, Button, theme } from 'galio-framework';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import axios from 'axios'
import AxiosFactory from '../api/AxiosFactory';




function Paperworks(props) {
  const [procedure, setProcedure] = useState([]);
  async function load() {
    const api = AxiosFactory('paperwork'); 
    const response = await api.get('/GetByFaculty/' + props.route.params.itemId);
    setProcedure(response.data)
  }

  useEffect(() => {
    load();
  }, [])

  function renderCards() {
    return (
      <Block>
        {
          procedure.map((tramite, i) => {
            return (<List.Item
              onPress={() => props.navigation.navigate('InfoPaperwork', { tramite: tramite.id })}
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

export default Paperworks;