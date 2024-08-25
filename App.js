import React, { useState, useRef, useEffect } from 'react';
import { Share ,ScrollView,Animated, Text, TouchableOpacity, View ,TextInput, Button, Dimensions, ActivityIndicator, Image} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import Slider from '@react-native-community/slider';
import TypingText from './TypingText';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const logoImg = require('./assets/logo.png');
  const { width, height } = Dimensions.get('window');
  const [navVisible, setNavVisible] = useState(false);
  const navBarAnim = useRef(new Animated.Value(-300)).current;
  const [goalOpen, setGoalOpen] = useState(false);
  const [goalItems, setGoalItems] = useState([
    { label: 'Weight loss', value: 'weight_loss' },
    { label: 'Muscle gain', value: 'muscle_gain' },
    { label: 'Endurance', value: 'endurance' },
    { label: 'Overall fitness', value: 'overall_fitness' }
  ]);
  const [goalValue, setGoalValue] = useState(null);

  const [exerciseOpen, setExerciseOpen] = useState(false);
  const [exerciseItems, setExerciseItems] = useState([
    {label: 'Cardio', value: 'cardio'},
    {label: 'Strength training', value: 'strength_training'},
    {label: 'Flexibility', value: 'flexibility'},
    {label: 'HIIT', value: 'hiit'},]
  );
  const [exerciseValue, setExerciseValue] = useState(null);
  const [freqVal, setFreqVal] = useState(1);
  const [hrPerDay, setHrPerDay] = useState(1);
  const [intensity, setIntensity] = useState("Low");
  const [wants, setWants] = useState("");
  const [error, setError] = useState(false);
  const [resp,setResp] = useState("");
  const [loadState,setLoadState] = useState(null)

  const getData = async () => {
    try{
      const gv = await AsyncStorage.getItem('goalValue');
      const fv = await AsyncStorage.getItem('freqVal');
      const hpd = await AsyncStorage.getItem('hrPerDay');
      const i = await AsyncStorage.getItem('intensity');
      const w = await AsyncStorage.getItem('wants');
      const ev = await AsyncStorage.getItem('exerciseValue');
      const rv = await AsyncStorage.getItem('resp');
      if(gv !== null){
        console.log(gv)
        setGoalValue(gv);
      }
      if (fv !== null) {
        console.log(fv);
        setFreqVal(parseInt(fv));
      }
      if (hpd !== null) {
        console.log(hpd);
        setHrPerDay(parseFloat(hpd));
      }
      if(i !== null){
        console.log(i)
        setIntensity(i);
      }
      if(w !== null){
        console.log(w)
        setWants(w);
      }
      if(ev !== null){
        console.log(ev)
        setExerciseValue(ev);
      }
      if(rv !== null){
        console.log(rv)
        setResp(rv);
      }
      
    }
    catch(e){
      console.log(e)
    }
  }

  const handleShare = async () =>{
    try{
      const result = await Share.share({
        message: resp,
      });
    }
    catch(e){
      console.log(e)
    }
  }

  const toggleNavBar = () => {
    if (navVisible) {
      Animated.timing(navBarAnim, {
        toValue: -1500,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setNavVisible(false));
    } else {
      
      setNavVisible(true);
      Animated.timing(navBarAnim, {
        toValue: -30,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const mapIntensityValue = (value) => {
    if (value === 1) return "Low";
    if (value === 2) return "Medium";
    if (value === 3) return "High";
  };

  
  

  const handleButtonPress = async () => {
    console.log("Button pressed");
    setResp("");
    if (goalValue !== null && freqVal !== null && hrPerDay !== null && intensity !== null && wants !== null && exerciseValue !== null) {
      setError(false);
      setLoadState(true);
      toggleNavBar();
      try{
        await AsyncStorage.setItem('goalValue', goalValue);
        await AsyncStorage.setItem('freqVal', String(freqVal));
        await AsyncStorage.setItem('hrPerDay', String(hrPerDay));
        await AsyncStorage.setItem('intensity', intensity);
        await AsyncStorage.setItem('wants', wants);
        await AsyncStorage.setItem('exerciseValue', exerciseValue);
        
      }
      catch(e){
      }
      fetch('http://10.0.2.2:3000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goalValue,
          freqVal,
          hrPerDay,
          intensity,
          wants,
          exerciseValue
        }),
      })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          setLoadState(false)
          setResp(data);
          try{
            AsyncStorage.setItem('resp', data);
          }
          catch(e){
            console.log(e)
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.log("Please fill in all fields");
      setError(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topLeftButton} onPress={toggleNavBar}>
        <EvilIcons name='navicon' size={30} color='black' />
      </TouchableOpacity>
      <Image source={logoImg} style={[styles.logo,{height: Math.min(width, height) * 0.1, width: Math.min(width, height) * 0.1}]} />
      {resp !== "" ? <TouchableOpacity style={styles.topRightButton} onPress={handleShare}>
        <EvilIcons name='share-apple' size={30} color='black' />
      </TouchableOpacity>:null}
      {navVisible && (
        <Animated.View style={[styles.navBar, { left: navBarAnim }]}>
          <TouchableOpacity style={styles.returnButton} onPress={toggleNavBar}>
            <EvilIcons name='close' size={30} color='white' />
          </TouchableOpacity>
          <DropDownPicker
            style={styles.picker}
            open={goalOpen}
            value={goalValue}
            items={goalItems}
            setOpen={setGoalOpen}
            setValue={setGoalValue}
            setItems={setGoalItems}
            placeholder={'What is your end goal?'}
            dropDownContainerStyle={styles.dropdown_picker}
          />

          <Text style={styles.navBarText}>Frequency: {freqVal} day per week</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={7}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor='lightblue'
            step={1}
            value={freqVal}
            onValueChange={setFreqVal}
          />
          <Text style={styles.navBarText}>Hours per day: {hrPerDay}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={3}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor='lightblue'
            step={0.5}
            value={hrPerDay}
            onValueChange={setHrPerDay}
          />
          <Text style={styles.navBarText}>Intensity: {intensity}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={3}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor='lightblue'
            step={1}
            value={intensity === "Low" ? 1 : intensity === "Medium" ? 2 : 3}
            onValueChange={(value) => setIntensity(mapIntensityValue(value))}
          />
          <DropDownPicker
            style={styles.picker}
            open={exerciseOpen}
            value={exerciseValue}
            items={exerciseItems}
            setOpen={setExerciseOpen}
            setValue={setExerciseValue}
            setItems={setExerciseItems}
            placeholder={'Exercise type?'}
            dropDownContainerStyle={styles.dropdown_picker}
          />
          <TextInput
            style={styles.input}
            onChangeText={setWants}
            value={wants}
            placeholder="Add additional wants to your workout plan here!"
            keyboardType="numeric"
            multiline= {true}
            numberOfLines={5}
          />
          
          <View style={styles.submitButton}>
            <Button
            title="Submit"
            onPress={handleButtonPress}
            />
          </View>
          {!error ? null : <Text style={styles.errorText}>Please fill in all required fields!</Text>}
        </Animated.View>
      )}
      
      <View style={styles.content}>
        {loadState ? <ActivityIndicator style={styles.content_load} size="large" color="#0000ff" /> : null}
       
        {resp!=="" ? <ScrollView>
          <TypingText text={resp} style={[styles.content_text, { fontSize: Math.max(width, height) * 0.02 }]} />
        </ScrollView>: null}
      </View>
    </View>
  );
}
