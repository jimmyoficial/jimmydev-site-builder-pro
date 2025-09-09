import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'seller' | 'viewer';
  company: string;
  phone: string;
  signature: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários simulados para demonstração
const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@jimmydev.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin' as const,
    company: 'JimmyDev Solutions',
    phone: '(11) 99999-9999',
    signature: 'Atenciosamente,\nAdministrador\nJimmyDev Solutions\nTel: (11) 99999-9999'
  },
  {
    id: '2',
    email: 'vendedor@jimmydev.com',
    password: 'vendedor123',
    name: 'João Vendedor',
    role: 'seller' as const,
    company: 'JimmyDev Solutions',
    phone: '(11) 88888-8888',
    signature: 'Atenciosamente,\nJoão Vendedor\nJimmyDev Solutions\nTel: (11) 88888-8888'
  },
  {
    id: '3',
    email: 'demo@cliente.com',
    password: 'demo123',
    name: 'Cliente Demo',
    role: 'viewer' as const,
    company: 'Empresa Cliente',
    phone: '(11) 77777-7777',
    signature: 'Atenciosamente,\nCliente Demo\nEmpresa Cliente\nTel: (11) 77777-7777'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se há sessão salva ao carregar
  useEffect(() => {
    const savedUser = localStorage.getItem('jimmydev_user');
    const savedSession = sessionStorage.getItem('jimmydev_session');
    
    if (savedUser && savedSession) {
      try {
        const userData = JSON.parse(savedUser);
        const sessionData = JSON.parse(savedSession);
        
        // Verificar se a sessão não expirou (24 horas)
        const sessionTime = new Date(sessionData.timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Sessão expirada, limpar dados
          localStorage.removeItem('jimmydev_user');
          sessionStorage.removeItem('jimmydev_session');
        }
      } catch (error) {
        console.error('Erro ao recuperar sessão:', error);
        localStorage.removeItem('jimmydev_user');
        sessionStorage.removeItem('jimmydev_session');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = DEMO_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        company: foundUser.company,
        phone: foundUser.phone,
        signature: foundUser.signature
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Salvar dados da sessão
      localStorage.setItem('jimmydev_user', JSON.stringify(userData));
      sessionStorage.setItem('jimmydev_session', JSON.stringify({
        timestamp: new Date().toISOString(),
        userId: userData.id
      }));
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jimmydev_user');
    sessionStorage.removeItem('jimmydev_session');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('jimmydev_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Hook para verificar permissões
export const usePermissions = () => {
  const { user } = useAuth();
  
  return {
    canCreateQuotes: user?.role === 'admin' || user?.role === 'seller',
    canViewAllQuotes: user?.role === 'admin',
    canManageUsers: user?.role === 'admin',
    canExportPDF: user?.role === 'admin' || user?.role === 'seller',
    canSendQuotes: user?.role === 'admin' || user?.role === 'seller'
  };
};