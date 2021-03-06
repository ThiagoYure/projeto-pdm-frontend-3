import React, { useState, useEffect } from 'react';
import { FlatList, Image, TouchableOpacity, StyleSheet, Text, View, Button } from 'react-native';
import api from './services/Api';
import { setId, setToken, getId, getUser, setUser } from './services/PersistToken';
import { useFocusEffect } from '@react-navigation/native';

const Anuncios = ({ navigation }) => {
  const [anuncios, onChangeAnuncios] = useState('');

  /*useFocusEffect(
    React.useCallback(() => {
      if (anuncios == '' || anuncios == 'Sem Resultado') {
        api
          .get(`real-estate`)
          .then(res => {
            if (res.data == undefined) {
              onChangeAnuncios('Sem Resultado');
            } else {
              onChangeAnuncios(res.data);
            }
          })
          .catch(error => {
            alert("Erro");
            console.log(error);
          });
      }
    }, [anuncios])
  );*/

  const handleAtualizar = () => {
    api
      .get(`real-estate`)
      .then(res => {
        if (res.data == undefined) {
          onChangeAnuncios('Sem Resultado');
        } else {
          onChangeAnuncios(res.data);
        }
      })
      .catch(error => {
        alert("Erro");
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./img/HomeMatcHAlpha.png')}
      />
      <TouchableOpacity style={{
        alignSelf: 'center',
        marginTop: 20,
        padding: 5,
        backgroundColor: '#E4B7A0',
        width: '50%',
      }} onPress={() => { handleAtualizar() }}>
        <Text style={styles.buttonLabel}>Carregar Anúncios</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Anuncios</Text>
      <FlatList
        style={{ marginBottom: 170 }}
        data={anuncios}
        renderItem={
          ({ item }) => (
            <View style={styles.imovel}>
              <Image
                style={styles.image}
                source={{
                  uri: item.imagens,
                }}
              />
              <Text style={styles.buttonLabel}>{item.rua}, nº {item.numero} - {item.bairro}, {item.cidade}</Text>
              <Text style={styles.buttonLabel}>{item.metrosQuadrados} m²</Text>
              <Text style={styles.buttonLabel}>Proprietário: {item.user.nome}</Text>
              <TouchableOpacity style={{
                marginTop: 10,
                alignSelf: 'center',
                padding: 5,
                backgroundColor: '#633015',
                width: '33%',
              }} onPress={() => navigation.navigate('DetalheImovel', item)}>
                <Text style={{
                  alignSelf: 'center',
                  fontSize: 18,
                  color: '#E4B7A0',
                }}>+ Info</Text>
              </TouchableOpacity>
            </View>
          )
        }
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  },
  title: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 30,
    color: '#633015',
  },
  button: {
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#E4B7A0',
    width: '33%',
  },
  imovel: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#E4B7A0',
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 170,
    marginBottom: 10,
  },
  buttonLabel: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#633015',
  },
  logo: {
    alignSelf: 'center',
    width: 180,
    height: 70,
  }
});

export default Anuncios;