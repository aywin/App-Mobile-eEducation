import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './LoginScreen.css';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email et mot de passe requis');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (login(email, password)) {
        setEmail('');
        setPassword('');
        onLoginSuccess();
      } else {
        setError('Email ou mot de passe incorrect');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-circle">
          <span className="logo-icon">🎓</span>
        </div>

        <h1 className="app-title">GROUPE LA RÉFÉRENCE</h1>
        <p className="app-subtitle">Plateforme de Formation</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <button className="btn-register" onClick={onNavigateToRegister}>
          Créer un compte
        </button>
      </div>
    </div>
  );
};
