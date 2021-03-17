import React from 'react';
import { Block } from 'galio-framework';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';


const list = [{title: "Recabar Kardex de notas", descripcion:"plan nuevo"}, {title: "REIMPRESIÓN DE MATRICULA DE INSCRIPCIÓN", descripcion:""}, {title: "OBTENCIÓN DE CERTIFICADO DE ALUMNO REGULAR", descripcion:""},{title: "CERTIFICADO DE ESTUDIOS", descripcion:""}] 
class Tramites extends React.Component {    

    renderCards = () => {
        const { navigation } = this.props;
        return (
            <Block>
                {
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