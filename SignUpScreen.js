import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from './styles';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully!');
      navigateToHome();
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={commonStyles.centeredContainer}>
      <Text style={commonStyles.bigTitle}>Sign Up</Text>
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
      <TouchableOpacity style={commonStyles.smallButton} onPress={handleSignUp}>
        <Text style={commonStyles.smallButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;