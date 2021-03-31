import React from 'react';
import { Block, Text, Button, theme } from 'galio-framework';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import axios from 'axios'
import AxiosFactory from '../api/axiosFactory';
const list = [{title: "Recabar Kardex de notas", descripcion:"plan nuevo"}, {title: "REIMPRESIÓN DE MATRICULA DE INSCRIPCIÓN", descripcion:""}, {title: "OBTENCIÓN DE CERTIFICADO DE ALUMNO REGULAR", descripcion:""},{title: "CERTIFICADO DE ESTUDIOS", descripcion:""}] 

// const url = "https://localhost:5001/swagger/v1/swagger.json";
const url = "https://localhost:5001/";
async function axiosApiCall(){
  console.log("Hooola")
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
  
  await fetch('http://192.168.0.145:5000/tramite')  
  .then(function(response) {
    console.log("response")
    return response.json()
  })
  .catch((error) => {
    console.log(error)
  })
  // const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  // const response = await axios.get('https://192.168.0.145:5001/tramite');
  await axios.get('http://192.168.0.145:5000/tramite')
  .then(function (response) {
    console.log("response")
  })
  .catch((error) => {
    console.log(error)
  });
  // console.log(response);

}


class Tramites extends React.Component {    
  // state={
  //   data: []
  // }  

  // peticionGet=()=>{
  //   console.log("peticionGet")
  //   axios.get(url).then(response => {
  //     // this.setState({data: response.data});
  //     console.log(response)
  //   })
  // }
  renderCards = () => {
      const { navigation } = this.props;
      return (
          <Block>
              {
                // this.state.data.map( (tramite, i) => {
                list.map( (tramite, i) => {
                    return (<List.Item
                        onPress={() => navigation.navigate('InfoTramite', {tramite: tramite})}
                        key={i}
                        title={tramite.title}
                        description={tramite.descripcion}
                        left={props => <List.Icon {...props} icon="folder"/>}
                    />)
                })
              }
              <Button
                shadowless
              //   color={nowTheme.COLORS.PRIMARY}
                // onPress={() => navigation.navigate('App')}
                onPress={ () =>  axiosApiCall()}
              >
                <Text
                  style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                  color={theme.COLORS.WHITE}
                >
                  GET STARTED
                </Text>
              </Button>
              {/* expo start --tunnel */}
          </Block>
      );
    };

  render () {
      return(
          <Block flex>
            <ScrollView showsVerticalScrollIndicator={false}>{this.renderCards()}</ScrollView>
          </Block>
      )
  }
}

export default Tramites;