import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';
import './RegisterScreen.css';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
}) => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.nom || !form.prenom || !form.telephone || !form.email || !form.password) {
      setError('Tous les champs sont requis');
      return;
    }

    if (form.password.length < 6) {
      setError('Le mot de passe doit avoir au minimum 6 caractères');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const user: User = {
        nom: form.nom,
        prenom: form.prenom,
        telephone: form.telephone,
        email: form.email,
        password: form.password,
      };

      if (register(user)) {
        setSuccess('Inscription réussie ! Vous pouvez vous connecter.');
        setForm({
          nom: '',
          prenom: '',
          telephone: '',
          email: '',
          password: '',
        });
        setTimeout(() => {
          onNavigateToLogin();
        }, 1500);
      } else {
        setError('Cet email est déjà utilisé');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <button className="btn-back" onClick={onNavigateToLogin}>
            ← Retour
          </button>
          <h1>Inscription</h1>
        </div>

        <div className="register-icon">👤</div>

        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input
              id="nom"
              type="text"
              placeholder="Votre nom"
              value={form.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <input
              id="prenom"
              type="text"
              placeholder="Votre prénom"
              value={form.prenom}
              onChange={(e) => handleChange('prenom', e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="telephone">Téléphone</label>
            <input
              id="telephone"
              type="tel"
              placeholder="Votre numéro"
              value={form.telephone}
              onChange={(e) => handleChange('telephone', e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Votre email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="Minimum 6 caractères"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="btn-register-submit" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
