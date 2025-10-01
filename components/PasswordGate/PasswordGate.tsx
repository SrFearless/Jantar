'use client';

import { useState } from 'react';

interface PasswordGateProps {
  onUnlock: () => void;
}

export function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === '09062001') {
      onUnlock();
    } else {
      setError('Senha incorreta! Tente novamente.');
    }
  };

  return (
    <div className="passwordGate">
      <div className="passwordContainer">
        <h2>Aceita um Jantar?</h2>
        <p>Para prosseguir, insira a senha:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a senha..."
            className="passwordInput"
          />
          <button type="submit" className="passwordButton">
            🗝️ Entrar no Restaurante
          </button>
        </form>
        {error && <p className="errorMessage">{error}</p>}
        <p style={{marginTop: '15px', fontSize: '0.8rem', color: '#8b4513'}}>
          Dica: Página privada, pedir senha para ADM: Tiago
        </p>
      </div>
    </div>
  );
}