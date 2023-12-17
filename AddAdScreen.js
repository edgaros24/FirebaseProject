import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { commonStyles } from './styles';
import { addAd } from './redux/actions';
import { firestore } from './firebase';
import { addDoc, collection } from 'firebase/firestore';

const AddAdScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleAddAd = async () => {
    try {
      // Create a new ad object
      const newAd = {
        title,
        description,
        category,
      };
  
      const adRef = await addDoc(collection(firestore, 'computers'), newAd);
  
      // Get the ID of the newly added document
      const newAdWithId = {
        id: adRef.id,
        ...newAd,
      };
  
      dispatch(addAd(newAdWithId));
  
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding ad to Firestore:', error);
      setError('Error adding ad to Firestore');
    }
  };
  
  return (
    <View style={commonStyles.centeredContainer}>
      <Text style={commonStyles.bigTitle}>Add Ad Screen</Text>
      <View style={commonStyles.verticalSpace}></View>
      <TextInput
        style={commonStyles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          setError('');
        }}
      />
      <View style={commonStyles.verticalSpace}></View>
      <TextInput
        style={commonStyles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={commonStyles.verticalSpace}></View>
      <TextInput
        style={commonStyles.input}
        placeholder="Category"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <View style={commonStyles.verticalSpace}></View>
      {error ? (
        <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>
      ) : null}
      <View style={commonStyles.verticalSpace}></View>
      <TouchableOpacity
        onPress={handleAddAd}
        style={commonStyles.smallButton}
      >
        <Text style={commonStyles.smallButtonText}>Add Ad</Text>
      </TouchableOpacity>
      <View style={commonStyles.verticalSpace}></View>
    </View>
  );
};

export default AddAdScreen;
