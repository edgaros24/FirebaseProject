import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { commonStyles } from './styles';
import { updateAd } from './redux/actions';
import { firestore } from './firebase';
import { updateDoc, doc } from 'firebase/firestore';

const UpdateAdScreen = ({ route, navigation }) => {
  const adId = route.params?.adId;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const existingAd = useSelector((state) =>
    state.ads.find((ad) => ad.id === adId)
  );

  useEffect(() => {
    if (existingAd) {
      setTitle(existingAd.title);
      setDescription(existingAd.description);
      setCategory(existingAd.category);
    }
  }, [existingAd]);

  const dispatch = useDispatch();

  const handleUpdateAd = async () => {
    if (!title.trim()) {
      setError('Please fill the title of the ad');
      return;
    }

    if (!existingAd) {
      setError('Ad not found');
      return;
    }

    const updatedAd = {
      id: adId,
      title,
      description,
      category,
    };

    try {
      // Update the ad in Firestore using the firestore instance
      await updateDoc(doc(firestore, 'computers', adId), updatedAd);

      // Dispatch the action to update Redux store
      dispatch(updateAd(updatedAd));

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error updating ad in Firestore:', error);
    }
  };

  return (
    <View style={commonStyles.centeredContainer}>
      <Text style={commonStyles.bigTitle}>Update Ad Screen</Text>
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
        onPress={handleUpdateAd}
        style={commonStyles.smallButton}
      >
        <Text style={commonStyles.smallButtonText}>Update Ad</Text>
      </TouchableOpacity>
      <View style={commonStyles.verticalSpace}></View>
    </View>
  );
};

export default UpdateAdScreen;
