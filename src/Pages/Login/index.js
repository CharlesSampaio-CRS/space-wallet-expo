
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

import AuthContext from '../../../App';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);


  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Login
      </Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <Input
        placeholder="Email"
        leftIcon={{ type: 'material', name: 'email' }}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setUsername}
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
      <Button title="Entrar"  onPress={() => signIn({ username, password })} containerStyle={styles.buttonContainer} />
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

export default Login;