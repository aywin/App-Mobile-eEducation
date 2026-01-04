import React, { useState } from 'react';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import './App.css';

type ScreenType = 'login' | 'register' | 'dashboard';

function AppContent() {
  const { currentUser } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');

  const handleLoginSuccess = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const handleNavigateToRegister = () => {
    setCurrentScreen('register');
  };

  const handleNavigateToLogin = () => {
    setCurrentScreen('login');
  };

  if (currentUser && currentScreen !== 'login') {
    return <HomeScreen onLogout={handleLogout} />;
  }

  if (currentScreen === 'register') {
    return (
      <RegisterScreen
        onRegisterSuccess={handleLoginSuccess}
        onNavigateToLogin={handleNavigateToLogin}
      />
    );
  }

  return (
    <LoginScreen
      onLoginSuccess={handleLoginSuccess}
      onNavigateToRegister={handleNavigateToRegister}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
