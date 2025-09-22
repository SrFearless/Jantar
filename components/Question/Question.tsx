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
      <h2>Pergunta do encontro</h2>
      <p>{question.text}</p>
      
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
      
      <button 
        onClick={handleSubmit} 
        disabled={selectedOptions.length === 0}
      >
        Enviar resposta
      </button>
      
      {showSuccess && (
        <div className="successMessage active">
          <p>Resposta enviada com sucesso! Obrigada por participar.</p>
        </div>
      )}
    </div>
  );
}