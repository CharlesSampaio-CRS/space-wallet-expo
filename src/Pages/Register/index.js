
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import AuthContext from '../../../App';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // const [error, setError] = useState(null);

  const { signUp } = React.useContext(AuthContext);
  
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Register
      </Text>
      {/* {error && <Text style={styles.error}>{error}</Text>} */}
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
      <Button title="Registrar" onPress={signUp({ name, email, password })} containerStyle={styles.buttonContainer} />
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