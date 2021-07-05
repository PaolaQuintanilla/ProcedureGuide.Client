import React, { useState, useEffect } from 'react';
import { Block } from 'galio-framework';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Button from '../components/Button'
import AxiosFactory from '../api/AxiosFactory';

function Paperworks(props) {
  const [procedure, setProcedure] = useState([]);
  async function load() {
    const api = AxiosFactory('paperwork'); 
    const response = await api.get('/GetPaperworkBy/' + props.route.params.itemId);
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
              right={() => <Block><Button small onPress={() => props.navigation.navigate('TodoList', { tramite: tramite.id })}>ToDo</Button></Block>}
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