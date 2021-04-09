import React, { useState, useEffect } from 'react';
import { Block, Text, Button, theme } from 'galio-framework';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import axios from 'axios'
import AxiosFactory from '../api/axiosFactory';

async function axiosApiCall(){
  // axios({
  //   "method": "GET",
  //   "url": "https://localhost:5001/",
  //   "params": {
  //     "language_code": "en"
  //   }
  // })
  //   .then((response) => {
  //     // setQuote(response.data.content);
  //     // setSource(response.data.originator.name)
  //     console.log(response)
  //   })
  //   .catch((error) => { 
  //     console.log(error)
  //   })

  // const api = AxiosFactory('tramite');
  // console.log(api, "api")
  // const response = await api.get();
  // console.log(response, "response")
  // return response;
  // const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  // console.log(response);
    
  // await fetch('http://192.168.0.145:5000/tramite')  
  // .then(function(response) {
  //   console.log("response")
  //   return response.json()
  // })
  // .catch((error) => {
  //   console.log(error)
  // })
  
  await axios.get('http://192.168.0.141:5000/tramite')
  .then(function (response) {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  });

}


function Tramites(props) {    
  const [procedure, setProcedure] = useState([]);
  console.log(props, 'tramitess')
  async function load() {
    const api = AxiosFactory('tramite');
    const response = await api.get('http://192.168.0.141:5000/tramite/GetBySectorUniversitario/'+ props.route.params.itemId);
    setProcedure(response.data)
  }

  useEffect(() => { 
    load();
  }, [])

  function renderCards() {
      return (
          <Block>
              {
                procedure.map( (tramite, i) => {
                    return (<List.Item
                        onPress={() => props.navigation.navigate('InfoTramite', {tramite: tramite.idTramites})}
                        key={i}
                        title={tramite.nombre}
                        description={tramite.nombre}
                        left={props => <List.Icon {...props} icon="folder"/>}
                    />)
                })
              }

          </Block>
      );
    };

    return(
        <Block flex>
          <ScrollView showsVerticalScrollIndicator={false}>{renderCards()}</ScrollView>
        </Block>
    )
}

export default Tramites;