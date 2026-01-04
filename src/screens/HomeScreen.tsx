import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FormationService } from '../services/FormationService';
import { Formation } from '../types';
import './HomeScreen.css';

interface HomeScreenProps {
  onLogout: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout }) => {
  const { currentUser, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'formations' | 'inscriptions'>('formations');
  const [formations, setFormations] = useState<Formation[]>(FormationService.getAllFormations());
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2000);
  };

  const handleInscrire = (formationId: string) => {
    FormationService.inscrire(formationId);
    setFormations([...formations]);
    const formation = formations.find(f => f.id === formationId);
    if (formation) {
      showNotification(`Inscription à "${formation.titre}" confirmée !`, 'success');
    }
  };

  const handleDesinscrire = (formationId: string) => {
    FormationService.desinscrire(formationId);
    setFormations([...formations]);
    showNotification('Désinscription effectuée', 'success');
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const inscriptions = formations.filter(f => f.isInscrit);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>GROUPE LA RÉFÉRENCE</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Déconnexion
        </button>
      </header>

      <nav className="bottom-nav">
        <button
          className={`nav-item ${selectedTab === 'formations' ? 'active' : ''}`}
          onClick={() => setSelectedTab('formations')}
        >
          <span className="nav-icon">📚</span>
          <span className="nav-label">Formations</span>
        </button>
        <button
          className={`nav-item ${selectedTab === 'inscriptions' ? 'active' : ''}`}
          onClick={() => setSelectedTab('inscriptions')}
        >
          <span className="nav-icon">📖</span>
          <span className="nav-label">Mes Inscriptions</span>
        </button>
      </nav>

      <div className="dashboard-content">
        {selectedTab === 'formations' ? (
          <div className="formations-tab">
            <div className="welcome-banner">
              <div className="welcome-content">
                <h2>Bienvenue {currentUser?.prenom} !</h2>
                <p>Choisissez vos formations</p>
              </div>
            </div>

            <div className="formations-list">
              {formations.map(formation => (
                <div key={formation.id} className="formation-card">
                  <div className="formation-header">
                    <div className="formation-icon" style={{ backgroundColor: formation.color + '20' }}>
                      <span>{formation.icon}</span>
                    </div>
                    <div className="formation-info">
                      <p className="formation-partie">{formation.partie}</p>
                      <h3 className="formation-titre">{formation.titre}</h3>
                      <p className="formation-categorie">{formation.categorie}</p>
                    </div>
                  </div>
                  <button
                    className={`btn-inscrire ${formation.isInscrit ? 'inscrit' : ''}`}
                    onClick={() => handleInscrire(formation.id)}
                    disabled={formation.isInscrit}
                  >
                    {formation.isInscrit ? 'Déjà inscrit' : "S'inscrire"}
                  </button>

                  {formation.documents && formation.documents.length > 0 && (
                    <div className="documents-section">
                      <div className="documents-title">Ressources</div>
                      <div className="documents-list">
                        {formation.documents.map(doc => {
                          const iconMap: { [key: string]: string } = {
                            pdf: 'PDF',
                            video: '▶',
                            pptx: 'PPT',
                          };
                          return (
                            <a key={doc.id} href={doc.url} className="document-item">
                              <div className={`document-icon ${doc.type}`}>
                                {iconMap[doc.type]}
                              </div>
                              <div className="document-info">
                                <p className="document-name">{doc.titre}</p>
                                <p className="document-duree">{doc.duree}</p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="inscriptions-tab">
            {inscriptions.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📖</span>
                <h3>Aucune inscription</h3>
                <p>Inscrivez-vous à des formations</p>
              </div>
            ) : (
              <div className="inscriptions-list">
                {inscriptions.map(formation => (
                  <div key={formation.id} className="inscription-card">
                    <div className="inscription-header">
                      <div className="inscription-icon" style={{ backgroundColor: formation.color + '20' }}>
                        <span>{formation.icon}</span>
                      </div>
                      <div className="inscription-info">
                        <p className="inscription-partie">{formation.partie}</p>
                        <h3 className="inscription-titre">{formation.titre}</h3>
                      </div>
                      <div className="inscription-badge">
                        ✓ Inscrit
                      </div>
                    </div>
                    <button
                      className="btn-desinscrire"
                      onClick={() => handleDesinscrire(formation.id)}
                    >
                      Se désinscrire
                    </button>

                    {formation.documents && formation.documents.length > 0 && (
                      <div className="documents-section">
                        <div className="documents-title">Ressources</div>
                        <div className="documents-list">
                          {formation.documents.map(doc => {
                            const iconMap: { [key: string]: string } = {
                              pdf: 'PDF',
                              video: '▶',
                              pptx: 'PPT',
                            };
                            return (
                              <a key={doc.id} href={doc.url} className="document-item">
                                <div className={`document-icon ${doc.type}`}>
                                  {iconMap[doc.type]}
                                </div>
                                <div className="document-info">
                                  <p className="document-name">{doc.titre}</p>
                                  <p className="document-duree">{doc.duree}</p>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};
