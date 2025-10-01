'use client';

import { useState } from 'react';
import { IQuestion, IUserResponse } from '../types';

interface QuestionProps {
  question: IQuestion;
  onAnswer: (response: IUserResponse) => void;
  onNext: () => void;
}

export function Question({ question, onAnswer, onNext }: QuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOptionClick = (option: string) => {
    if (question.type === 'single') {
      setSelectedOptions([option]);
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) return;

    const response: IUserResponse = {
      questionId: question.id,
      selectedOptions: selectedOptions,
      timestamp: new Date()
    };

    onAnswer(response);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      onNext();
    }, 2000);
  };

  return (
    <div className="questionContainer active">
      <h2>🗡️ Questionário Real</h2>
      
      {/* Área de GIFs - 4 GIFs em grid 2x2 */}
      <div className="question-gifs">
        {question.gifs && question.gifs.map((gif, index) => (
          <img 
            key={index} 
            src={gif} 
            alt={`Ilustração ${index + 1}`} 
            className="question-gif" 
          />
        ))}
      </div>
      
      <p style={{textAlign: 'center', fontSize: '1.1rem', marginBottom: '20px'}}>
        {question.text}
      </p>
      
      <div className="options">
        {question.options.map(option => (
          <div
            key={option}
            className={`option ${selectedOptions.includes(option) ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
      
      <div style={{textAlign: 'center'}}>
        <button 
          onClick={handleSubmit} 
          disabled={selectedOptions.length === 0}
          style={{fontSize: '1.1rem', padding: '12px 25px'}}
        >
          🏹 Enviar Resposta
        </button>
      </div>
      
      {showSuccess && (
        <div className="successMessage active">
          <p>✨ Resposta enviada para os arquivos! ✨</p>
          <p>O mensageiro já partiu a cavalo...</p>
        </div>
      )}
    </div>
  );
}