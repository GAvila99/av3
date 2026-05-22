import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUsuarios } from '../context/UserContext';

// nao consegui tipar o navigation direito com o generic do Stack
// o professor disse que nao precisa ser perfeito, deixei any por enquanto
function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { usuarios } = useUsuarios();

  // validacao basica de email - peguei esse regex de um exemplo online
  function emailValido(e: string) {
    return /.+@.+/.test(e);
  }

  function handleLogin() {
    if (!emailValido(email)) {
      Alert.alert('Erro', 'Email invalido');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'Senha deve ter pelo menos 6 caracteres');
      setSenha(''); // limpa a senha mas deixa o email preenchido
      return;
    }

    // procura o usuario na lista com o email e senha digitados
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      setSenha('');
      setEmail('');
      navigation.navigate('ListaUsuarios');
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos');
      setSenha(''); // limpa so a senha pra usuario nao precisar redigitar o email
    }
  }

  // botao so ativa quando os dois campos estao preenchidos
  const podeFazerLogin = email.length > 0 && senha.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo(a) de volta!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.botao, !podeFazerLogin && { backgroundColor: '#aaa' }]}
        onPress={handleLogin}
        disabled={!podeFazerLogin}
      >
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.linkCadastro}>Nao tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkCadastro: {
    textAlign: 'center',
    color: '#2196F3',
    fontSize: 14,
  },
});

export default LoginScreen;
