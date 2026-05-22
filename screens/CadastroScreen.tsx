import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { User, useUsuarios } from '../context/UserContext';

// mesmo problema de tipagem do navigation aqui, deixei any igual ao login
function CadastroScreen({ navigation }: { navigation: any }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { adicionarUsuario } = useUsuarios();

  function handleCadastro() {
    if (nome.trim().length === 0) {
      Alert.alert('Erro', 'Informe seu nome');
      return;
    }

    // validacao diferente do login - aqui usei includes mesmo
    if (!email.includes('@')) {
      Alert.alert('Erro', 'Email invalido');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'Senha deve ter no minimo 6 caracteres');
      return;
    }

    // cria o objeto do novo usuario - Date.now() como id deve ser suficiente
    const novoUsuario: User = {
      id: Date.now(),
      nome: nome.trim(),
      email: email.trim(),
      senha,
    };

    adicionarUsuario(novoUsuario);

    Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  }

  // so habilita o botao quando todos os campos estao preenchidos
  const podeCadastrar = nome.length > 0 && email.length > 0 && senha.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crie sua Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />

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
        placeholder="Senha (minimo 6 caracteres)"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.botao, !podeCadastrar && { backgroundColor: '#aaa' }]}
        onPress={handleCadastro}
        disabled={!podeCadastrar}
      >
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 16 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.linkVoltar}>Ja tenho uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28, // coloquei 28 aqui, no login eu tinha colocado 24
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
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkVoltar: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});

export default CadastroScreen;
