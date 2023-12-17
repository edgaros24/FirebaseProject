import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/native';
import SignUpScreen from './SignUpScreen';
import { commonStyles } from './styles';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigateToHome();
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={commonStyles.centeredContainer}>
      <Text style={commonStyles.bigTitle}>Sign In</Text>
      <TextInput
        style={commonStyles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={commonStyles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
      />
      <TouchableOpacity style={commonStyles.smallButton} onPress={handleSignIn}>
        <Text style={commonStyles.smallButtonText}>Sign In</Text>
      </TouchableOpacity>
      <SignUpScreen />
    </View>
  );
};

export default AuthScreen;