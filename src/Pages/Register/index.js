
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  

  const register = async () => {
    const data = {
        name,
      email,
      password,
    };
  
    try {
        console.log(data)
      const response = await axios.post('http://127.0.0.1:8000/public/register', data, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Register
      </Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <Input
        placeholder="Name"
        leftIcon={{ type: 'material', name: 'name' }}
        keyboardType="name"
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Email"
        leftIcon={{ type: 'material', name: 'email' }}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Senha"
        leftIcon={{ type: 'material', name: 'lock' }}
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.inputContainer}
      />
      <Button title="Registrar" onPress={register} containerStyle={styles.buttonContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
});

export default Register;