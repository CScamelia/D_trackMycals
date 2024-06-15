import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { images } from '../../constants';
import { FormField } from '../../components';
import { useState } from 'react';
// import { initializeApp } from 'firebase/app';
import {auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
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

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSignUp = () => {
   const { email, password } = form;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Sign Up with:', user.email);
        Alert.alert("Success", "User signed Up successfully"); //Add any additional user setup or redirection here
      })
      .catch((error) => alert(error.message));
      
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
          <Image source={images.logo}
        resizeMode='contain' className='w-[115px] h-[35px]'/>

          <Text className='text-2xl text-white text semibold mt-10 font-psemibold'>
          Sign Up to TrackMyCals</Text>


          <FormField
         title='Email'
         value={form.email}
         handleChangeText={(e) => setForm({... form,email: e})}
         otherStyles='mt-7'
         keyboardType='email-address'/>


          <FormField
         title='Password'
         value={form.password}
         handleChangeText={(e) => setForm({... form,password: e})}
         otherStyles='mt-7'
         />


          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View className="justify-center pt-5 flex-row gap-2">

          <Text className="text-lg text-gray-100 font-pregular">

              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign in</Link>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
