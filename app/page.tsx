'use client';

import { useState } from 'react';
import { RestaurantScene } from '../components/RestaurantScene/RestaurantScene';
import { Menu } from '../components/Menu/Menu';
import { Question } from '../components/Question/Question';
import { IPage, IQuestion, IUserResponse } from '../components/types';

// Serviço de email simulado
const EmailService = {
  async sendResponse(response: IUserResponse): Promise<boolean> {
    try {
      console.log('Enviando resposta por email:', response);
      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Email enviado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return false;
    }
  }
};

export default function DatingSimulator() {
  const [currentStage, setCurrentStage] = useState<'menu' | 'questions' | 'completed'>('menu');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const menuPages: IPage[] = [
    {
      id: 'page1',
      title: 'Conheça a Maria',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      content: `
        <p>Olá! É um prazer conhecê-lo. Sou a Maria, tenho 28 anos e sou arquiteta. 
        Adoro viajar, ler e cozinhar nas horas vagas.</p>
        <p>Vamos nos conhecer melhor? Use as setas para navegar pelo meu cardápio pessoal.</p>
      `
    },
    {
      id: 'page2',
      title: 'Meus Sonhos',
      content: `
        <p>Tenho grandes aspirações para o futuro:</p>
        <ul>
          <li>Viajar para pelo menos 30 países diferentes</li>
          <li>Projetar um edifício icônico que se torne referência</li>
          <li>Aprender a tocar piano com fluência</li>
          <li>Escrever um livro sobre arquitetura sustentável</li>
          <li>Ter uma casa com jardim e muitos animais</li>
        </ul>
      `
    },
    {
      id: 'page3',
      title: 'Meus Hobbies',
      content: `
        <p>Nos meus momentos livres, gosto de:</p>
        <ul>
          <li>Fotografar paisagens urbanas e naturais</li>
          <li>Experimentar novas receitas na cozinha</li>
          <li>Ler ficção científica e biografias</li>
          <li>Fazer trilhas e acampar na natureza</li>
          <li>Assistir a filmes clássicos do cinema</li>
        </ul>
      `
    },
    {
      id: 'page4',
      title: 'Meus Gostos',
      content: `
        <p>Algumas coisas que eu adoro:</p>
        <ul>
          <li>Café pela manhã e vinho à noite</li>
          <li>Música indie e jazz</li>
          <li>Culinária italiana e japonesa</li>
          <li>Filmes de Wes Anderson</li>
          <li>Livros de Haruki Murakami</li>
          <li>Estação do ano: outono</li>
        </ul>
      `
    },
    {
      id: 'page5',
      title: 'Agora é a sua vez!',
      content: `
        <p>Obrigada por conhecer um pouco mais sobre mim. Agora gostaria de saber mais sobre você!</p>
        <p>Feche este cardápio para responder algumas perguntas.</p>
      `
    }
  ];

  const questions: IQuestion[] = [
    {
      id: 'q1',
      text: "Que tipo de animais você gosta?",
      options: ["Cachorros", "Gatos", "Aves", "Répteis", "Todos os animais"],
      type: 'single'
    },
    {
      id: 'q2', 
      text: "Qual seu tipo de música favorita?",
      options: ["Rock", "Pop", "Jazz/Blues", "Eletrônica", "Clássica", "MPB"],
      type: 'single'
    },
    {
      id: 'q3',
      text: "Qual seu destino de viagem dos sonhos?",
      options: ["Praia tropical", "Montanhas", "Cidade grande", "Campo/roça", "Deserto", "Neve"],
      type: 'single'
    }
  ];

  const handleMenuClose = () => {
    setCurrentStage('questions');
  };

  const handleAnswer = async (response: IUserResponse) => {
    // Usar o serviço de email para enviar a resposta
    await EmailService.sendResponse(response);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStage('completed');
    }
  };

  return (
    <main>
      <RestaurantScene />
      <div className="container">
        {currentStage === 'menu' && (
          <Menu pages={menuPages} onClose={handleMenuClose} />
        )}
        
        {currentStage === 'questions' && currentQuestionIndex < questions.length && (
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
          />
        )}
        
        {currentStage === 'completed' && (
          <div className="completionMessage">
            <h2>Obrigada pelo encontro!</h2>
            <p>Foi um prazer conhecê-lo melhor. Espero que tenhamos mais conversas como esta!</p>
          </div>
        )}
      </div>
    </main>
  );
}