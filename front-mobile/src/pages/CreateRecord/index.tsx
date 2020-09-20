import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { GamePlatform, Game } from './types';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

const placeholder = {
  label: 'Selecione o Game',
  value: null
}

const BASE_URL = 'http://192.168.0.100:8080';

const mapSelectValue = (games: Game[]) => {
  return games.map(game => ({
    ...game, 
    label: game.title,
    value: game.id
  }))
}

const CreateRecord = () => {
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gamePlatform, setGamePlatform] = useState<GamePlatform>();
  const [selectedGame, setSelectedGame] = useState('');
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  const handleChangePlatform = (platform : GamePlatform) => {
    setGamePlatform(platform);
    const gamesByPlatform = allGames.filter(game => game.platform === platform);
    setFilteredGames(gamesByPlatform);
  }

  const handleSubmit = () => {
    const payload = {name, age, gameId: selectedGame};
    axios.post(`${BASE_URL}/records`, payload)
      .then(() => {
        Alert.alert('Dados salvos com sucesso!');
        setName('');
        setAge('');
        setSelectedGame('');
        setGamePlatform(undefined);
      })
      .catch(() => Alert.alert('Erro ao salvar dados!'));
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/games`)
      .then(response => {
        const selectGameData = mapSelectValue(response.data);
         setAllGames(selectGameData);
      })
      .catch(() => Alert.alert('Erro ao listar jogos!'));
  })
 
  return (
    <>
      <Header/>
      <View style={styles.container}>
        <TextInput 
          style={styles.inputText} 
          placeholder="Nome"
          placeholderTextColor="#9E9E9E"
          onChangeText={name => setName(name)}
          value={name}
        />
        <TextInput 
          keyboardType="numeric"
          style={styles.inputText}  
          placeholder="Idade"
          placeholderTextColor="#9E9E9E" 
          maxLength={3}
          onChangeText={age => setAge(age)}
          value={age}
        />
        <View style={styles.platformContainer}>
          <PlatformCard platform="PC" icon="laptop" onChange={() => handleChangePlatform('PC')} activePlatform={gamePlatform}/>
          <PlatformCard platform="XBOX" icon="xbox" onChange={() => handleChangePlatform('XBOX')} activePlatform={gamePlatform}/>
          <PlatformCard platform="PLAYSTATION" icon="playstation" onChange={() => handleChangePlatform('PLAYSTATION')} activePlatform={gamePlatform}/>
        </View>
        <View>
          <RNPickerSelect 
            placeholder={placeholder}
            onValueChange={(game) => setSelectedGame(game)}
            items={filteredGames}
            style={pickerSelectStyles}
            value={selectedGame}
            Icon={() => {
              return <Icon name='chevron-down' color='#9e9e9e' size={25}/>
            }}
          /> 
        </View>
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              ENVIAR
            </Text>
          </RectButton>
        </View>
      </View>
    </>
  );
}   

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  placeholder: {
    color: '#9E9E9E',
    fontSize: 20,
    fontFamily: "Play_700Bold",
  },
  iconContainer: {
    top: 10,
    right: 12,
  }
};
 
const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: 50
  },
  inputText: { 
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    fontFamily: "Play_700Bold",
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 21
  },
  platformContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: '15%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00D4FF',
    flexDirection: 'row',
    borderRadius: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: "Play_700Bold",
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0B1F34',
  }
});

export default CreateRecord;








/* === 1:45:46 === */