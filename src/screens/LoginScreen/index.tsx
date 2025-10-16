import React, { useState } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { ViewStyle, Image ,StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenProps } from './type';
import { Container, Title, styles, ErrorText } from './styles';
import { ToastAndroid } from 'react-native';

const showToast = () => {
      ToastAndroid.show('A wild toast appeared!', ToastAndroid.SHORT);
    };

const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<LoginScreenProps['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signIn({ email, password });
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container>
      <Image source={require('./images/Logo.png')} style={{ width: 100, height: 100 }}/>
      

      <Title>VitaAgenda</Title>
       



      
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Entrar"
        onPress={handleLogin}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />

      <Button
        title="Cadastrar Novo Usuário"
        onPress={() => navigation.navigate('Register')}
        containerStyle={styles.registerButton as ViewStyle}
        buttonStyle={styles.registerButtonStyle}
      />

      <Text style={styles.hint}>
        Primeiro acesso? Cadastre-se como Admin ou Paciente.
      </Text>
    </Container>
  );
};


export default LoginScreen; 