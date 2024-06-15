import React, { useState } from 'react';
import { Link, useRouter, useNavigation } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { images } from '../../constants';
import { FormField } from '../../components';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase'

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleSignIn = () => {
        // router.push('/profile');
    const { email, password } = form;
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setSubmitting(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        console.log('Success: User signed in successfully');
        router.push('/profile');
      })
      .catch((error) => {
        console.log('Error:', error.message);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#161622', flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            justifyContent: 'center',
            paddingHorizontal: 16,
            marginVertical: 24,
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode='contain'
            style={{ width: 115, height: 34 }}
          />

          <Text style={styles.title}>Log in to TrackMyCals</Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{ marginTop: 28 }}
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 28 }}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => handleSignIn()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
            <Text style={{ fontSize: 18, color: 'gray', fontFamily: 'System' }}>
              Don't have an account?
            </Text>
            <Link
              href='/sign-up'
              style={{ fontSize: 18, fontWeight: '600', color: '#FF9D01' }}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'System',
  },
  buttonContainer: {
    marginTop: 28,
  },
  button: {
    backgroundColor: '#FF9D01',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignIn;
