import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUsuarios } from '../context/UserContext';

// nao precisa de navigation prop se nao for navegar daqui
// mas adicionei o botao de sair entao precisei colocar
function ListaUsuariosScreen({ navigation }: { navigation: any }) {
  const { usuarios } = useUsuarios();

  // renderItem - tipei como any porque nao lembrei de importar o ListRenderItem
  function renderItem({ item }: any) {
    return (
      <View style={styles.card}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    );
  }

  function handleSair() {
    // volta pra tela de login
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Usuarios cadastrados ({usuarios.length})
      </Text>

      <FlatList
        data={usuarios}
        // antes eu usava o index aqui: keyExtractor={(item, index) => index.toString()}
        // mas o professor falou pra usar um id unico, ai corrigi
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum usuario cadastrado ainda</Text>
        }
      />

      <TouchableOpacity style={styles.botaoSair} onPress={handleSair}>
        <Text style={styles.textoBotaoSair}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2, // sombra no android
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
  botaoSair: {
    backgroundColor: '#e53935',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  textoBotaoSair: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ListaUsuariosScreen;
