import React, { useState, useEffect } from 'react';
import { Block } from 'galio-framework';
import { List } from 'react-native-paper';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import AxiosFactory from '../api/axiosFactory';
import StepIndicator from 'react-native-step-indicator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Direction from '../screens/direction';

function InfoTramite(props) {
  const [requisitos, setRequisitos] = useState([]);
  const [position, setPosition] = useState(0);
  const [length, setLength] = useState(1);
  const nextStep = () => {
    setPosition(position + 1);
    i++;
  }

  const previousStep = () => {
    setPosition(position - 1);
  }

  const onStepPress = (position) => {
    setPosition(position);
  };

  const onSwipeLeft = (gestureState) => {
    setPosition(position + 1);
  }

  const onSwipeRight = (gestureState) => {
    setPosition(position - 1);
  }

  async function load() {
    console.log(props,'load')
    // const data = AxiosFactory('tramite/GetRequirementsBy/'+ props.route.params.tramite).get();
    const api = AxiosFactory('tramite');
    const data = await api.get('http://192.168.0.141:5000/tramite/GetRequirementsBy/' + props.route.params.tramite);
    console.log(data.data, 'requisitos')
    console.log(data.data[1])
    setLength(data.data.length) 
    setRequisitos(data.data)
  }
  useEffect(() => {
    console.log('useeffect')
    load();
  }, [])
  // const labels = ["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track", "Track", "Track"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
  }
  var i = 0;

  return (
    // <Block style={{ marginTop: 80, marginBottom: 30, marginLeft:30}}>
    //     {
    //       requisitos.map( (tramite, i) => {
    //           return (
    //           <List.Item
    //               onPress={() => props.navigation.navigate('Direccion', {tramite: tramite.idTramites})}
    //               key={i}
    //               title={tramite.nombre}
    //               description={tramite.nombre}
    //               left={props => <List.Icon {...props} icon="check"/>}
    //               right={props => <List.Icon {...props} icon="information"/>}
    //           />)
    //       })
    //     }
    // </Block>
    <View style={styles.indicatorContainer}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={position}
        stepCount={length}
        // labels={labels}
        onPress={onStepPress}
      // direction='vertical'
      />
      <GestureRecognizer
        onSwipeLeft={(position) => onSwipeLeft(position)}
        onSwipeRight={(position) => onSwipeRight(position)}
        // style={{ backgroundColor: '#eceff1', marginTop:20 }}
      >
        <Block style={{ backgroundColor: '#eceff1', marginTop: 20, borderRadius: 30 }}>
          {/* <Text style={{fontFamily: 'Iowan Old Style', margin: 20}}> */}
          <Text style={{ margin: 20}}>
            {requisitos[position]? requisitos[position].name:'' }
          </Text>
          <Text style={{fontFamily: 'montserrat-regular', margin: 20}}>
            {requisitos[position]? requisitos[position].description:'' }
          </Text>
        </Block> 
        <Block style={styles.map}>
          <Direction coordinates={requisitos[position]?.paperWorkReception.coordinate}></Direction>
        </Block>
        <Block style={{flexDirection: 'row', alignSelf: 'flex-start', alignItems:'center'}}>
          <TouchableOpacity style={{alignItems: "center", margin: 5}} onPress={() => { previousStep() }}>
            <Text style={{backgroundColor:'#babdbe', width: 80, alignItems: "center", borderRadius: 5, paddingLeft: 10}}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: "center", margin: 5}} onPress={() => { nextStep() }}>
            <Text style={{backgroundColor:'#babdbe', width: 80, alignItems: "center", borderRadius: 5, paddingLeft: 10}}>Siguiente</Text>
          </TouchableOpacity>
        </Block>
        {/* <TouchableOpacity style={{alignItems: "center"}} onPress={() => { nextStep() }}> */}

      </GestureRecognizer>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    margin:10,
    height: 400  
  },
  information: {
    color: '#333333',
    flex: 1,
    marginTop: 50
  },
  container: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  },
  indicatorContainer: {
    marginTop: 100
  }
});

export default InfoTramite;