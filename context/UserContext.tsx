import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// tipo do usuario - simples por enquanto
export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

type UserContextType = {
  usuarios: User[];
  adicionarUsuario: (u: User) => void;
};

// coloquei as any aqui pra nao ter problema com o valor padrao do context
// tentei colocar null mas dai precisava checar em todo lugar, assim funciona direto
export const UserContext = createContext<UserContextType>({} as any);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [usuarios, setUsuarios] = useState<User[]>([]);

  // carrega os usuarios do AsyncStorage quando o app abre
  useEffect(() => {
    AsyncStorage.getItem('usuarios').then((data) => {
      if (data) {
        setUsuarios(JSON.parse(data));
      } else {
        // nao tem nada salvo ainda, coloca um usuario padrao pra teste
        setUsuarios([
          { id: 1, nome: 'Admin', email: 'admin@email.com', senha: '123456' },
        ]);
      }
    });
  }, []);

  // toda vez que a lista de usuarios mudar, salva no storage
  useEffect(() => {
    if (usuarios.length > 0) {
      AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }, [usuarios]);

  function adicionarUsuario(novoUsuario: User) {
    setUsuarios((prev) => [...prev, novoUsuario]);
  }

  return (
    <UserContext.Provider value={{ usuarios, adicionarUsuario }}>
      {children}
    </UserContext.Provider>
  );
}

// hook customizado pra facilitar o uso nas telas
export function useUsuarios() {
  return useContext(UserContext);
}
