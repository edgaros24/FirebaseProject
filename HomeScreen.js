import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { commonStyles } from './styles';
import { deleteAd } from './redux/actions';
import { firestore } from './firebase';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { setAds } from './redux/actions';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const ads = useSelector((state) => state.ads);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'computers'));
        const adsFromFirestore = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setAds(adsFromFirestore));
      } catch (error) {
        console.error('Error fetching ads from Firestore:', error);
      }
    };

    fetchData();
  }, [dispatch, firestore]);

  const handleUpdateAd = (adId) => {
    navigation.navigate('UpdateAd', { adId });
  };

  const handleDeleteAd = async (adId) => {
    try {
      // Delete from Firestore
      const adRef = doc(firestore, 'computers', adId); // Use doc here
      await deleteDoc(adRef);

      // Dispatch the action to update Redux store
      dispatch(deleteAd(adId));
    } catch (error) {
      console.error('Error deleting ad from Firestore:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={commonStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={commonStyles.adContainer}>
          <Text style={commonStyles.bigTitle}>Home Screen</Text>
          {ads.map((ad) => (
            <View key={ad.id} style={commonStyles.adContainer}>
              <Text style={commonStyles.adTitle}>{ad.title}</Text>
              <Text style={commonStyles.adDescription}>{ad.description}</Text>
              <Text style={commonStyles.adDescription}>{ad.category}</Text>
              <TouchableOpacity
                onPress={() => handleUpdateAd(ad.id)}
                style={commonStyles.smallButton}
              >
                <Text style={commonStyles.smallButtonText}>Update Ad</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteAd(ad.id)}
                style={commonStyles.smallButton}
              >
                <Text style={commonStyles.smallButtonText}>Delete Ad</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddAd')}
        style={{ ...commonStyles.smallButton, width: '100%' }}
      >
        <Text style={commonStyles.smallButtonText}>Add Ad</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
