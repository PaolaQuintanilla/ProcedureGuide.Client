import React, { useState, useEffect } from 'react';
import { Block } from 'galio-framework';
import { StyleSheet, Text, View } from 'react-native';
import AxiosFactory from '../api/AxiosFactory';
import StepIndicator from 'react-native-step-indicator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';
import Direction from './Direction';
import ArButton from '../components/Button';

const MAXSTEPS = 3;

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

function InfoPaperwork(props) {
  const [requisitos, setRequisitos] = useState([]);
  const [position, setPosition] = useState(0);
  const [length, setLength] = useState(1);
  const [labels, setLabels] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  const nextStep = () => {
    setPosition(position + 1);
  }

  const previousStep = () => {
    setPosition(position - 1);
  }

  const onStepPress = (position) => {
    setPosition(position);
  };

  const onSwipeLeft = (gestureState) => {
    if ( length > position ) {
      setPosition(position + 1);
    }
  }

  const onSwipeRight = (gestureState) => {
    if(position > 0) {
      setPosition(position - 1);
    }
  }

  async function load() {
    const api = AxiosFactory('paperwork');
    const data = await api.get('/GetRequirementsBy/' + props.route.params.tramite);
    setLength(data.data.length);
    getCoordinates(data.data);
    setRequisitos(data.data);
    getLabels(data.data);
  }

  function getCoordinates(list) {
    var result = list.map( r => {
      return {
        yCoordinate: r.paperWorkReception?.coordinate.xCoordinate,
        xCoordinate: r.paperWorkReception?.coordinate.yCoordinate,
        message: r.name
      }
    })
    setCoordinates(result);
  }

  useEffect(() => {
    load();
  }, [])

  function getLabels(data) {
    const elements = [];
    for (let index = 0; index < data.length; index++) {
      elements[index] = data[index].name;
    }

    if(elements.length < MAXSTEPS) {
      setLabels(elements);
    }
    return elements;
  }

  return (
    <View style={styles.indicatorContainer}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={position}
        stepCount={length}
        labels={labels}
        onPress={onStepPress}
      />
      <GestureRecognizer
        onSwipeLeft={(position) => onSwipeLeft(position)}
        onSwipeRight={(position) => onSwipeRight(position)}
      >
        <Block style={styles.information}>
          <Text style={styles.name}>
            {requisitos[position] ? requisitos[position].name : ''}
          </Text>
          <Text style={styles.description}>
            {requisitos[position] ? requisitos[position].description : ''}
          </Text>
        </Block>
        <Block style={styles.map}>
          <Direction coordinates={coordinates[position]}></Direction>
        </Block>
      </GestureRecognizer>
      <Block style={styles.buttonStyle}>
        <ArButton onPress={() => { previousStep() }}>Anterior</ArButton>
        <ArButton onPress={() => { nextStep() }}>Siguiente</ArButton>
      </Block> 
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    margin: 10,
    height: 400
  },
  indicatorContainer: {
    marginTop: 100
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent:'center',
    width: '100%'
  },
  information: {
    backgroundColor: '#eceff1', 
    marginTop: 20, 
    borderRadius: 30
  },
  name: {
    margin: 20
  },
  description: {
    fontFamily: 'montserrat-regular', 
    margin: 20
  }
});

export default InfoPaperwork;