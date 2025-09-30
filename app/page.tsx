'use client';

import { useState, useEffect } from 'react';
import { RestaurantScene } from '../components/RestaurantScene/RestaurantScene';
import { Menu } from '../components/Menu/Menu';
import { Question } from '../components/Question/Question';
import { PasswordGate } from '../components/PasswordGate/PasswordGate';
import { IPage, IQuestion, IUserResponse } from '../components/types';

// Serviço de email simulado
const EmailService = {
  async sendResponse(response: IUserResponse): Promise<boolean> {
    try {
      console.log('Enviando resposta por email:', response);
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
  const [backgroundScene, setBackgroundScene] = useState<'tavern' | 'castle' | 'throne'>('tavern');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Alterar plano de fundo baseado no estágio atual
  useEffect(() => {
    if (currentStage === 'menu') {
      setBackgroundScene('tavern');
    } else if (currentStage === 'questions') {
      setBackgroundScene('castle');
    } else if (currentStage === 'completed') {
      setBackgroundScene('throne');
    }
  }, [currentStage]);

  const menuPages: IPage[] = [
    {
      id: 'page1',
      title: 'Conheça o Tiago da Linhagem Machado',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      content: `
        <div style="text-align: center;">
          <p>🛡️ Saudações, Me chamo Tiago de Freitas Machado.</p>
          <p>- Tenho 24 anos e estou me especializando na área de programação.</p>
          <p>- Nos meus momentos de folga, aprecio jogar, me exercitar (Academia),</p>
          <p>- assistir (Anime), fazer leitura e a arte da culinária.</p>
          ${isMobile ? '<p>Nos meus momentos de folga, aprecio jornadas a reinos distantes e a leitura de antigos pergaminhos.</p>' : '<p>Nos meus momentos de folga, aprecio jornadas a reinos distantes, a leitura de antigos pergaminhos e a arte da culinária medieval.</p>'}
          <img src="https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif" alt="Castelo medieval" class="medieval-gif" />
          <p style="margin-top: 15px; font-style: italic;">"Que nossa conversa seja gratificante!"</p>
        </div>
      `
    },
    {
      id: 'page2',
      title: 'Meus Grandes Sonhos',
      content: `
        <p>Tenho sonhos que transcendem a imaginação:</p>
        <ul>
          <li>
            <img src="https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif" alt="Viagem medieval" class="list-item-gif" />
            Me tornar um Desenvolvedor fullstack Senior
          </li>
          <li>
            <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" alt="Catedral" class="list-item-gif" />
            Um futuro Ancião
          </li>
          <li>
            <img src="https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif" alt="Alaúde" class="list-item-gif" />
            Dominar a arte do Violino
          </li>
          <li>
            <img src="https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif" alt="Livro" class="list-item-gif" />
            Apreciar a vista da minha moradia na Suiça
          </li>
        </ul>
      `
    },
    {
      id: 'page3',
      title: 'Meus Passatempos',
      content: `
        <p>Quando não estou emprestando minhas forças para as empresas, dedico-me a:</p>
        <ul>
          <li>
            <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" alt="Manuscritos" class="list-item-gif" />
            Me distrair com Jogos emocionantes
          </li>
          <li>
            <img src="https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif" alt="Banquete" class="list-item-gif" />
            Assistir Séries, Animes e Filmes
          </li>
          <li>
            <img src="https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif" alt="Estrelas" class="list-item-gif" />
            Desenhar Pixelarts revigorantes
          </li>
          <li>
            <img src="https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif" alt="Floresta" class="list-item-gif" />
            Explorar minha criatividade para criar programas
          </li>
        </ul>
      `
    },
    {
      id: 'page4',
      title: 'Alguns dos meus Gostos',
      content: `
        <p>Estes são os combustiveis que aquecem o meu coração:</p>
        <ul>
          <li>
            <img src="https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif" alt="Hidromel" class="list-item-gif" />
            A estação do inverno, onde o conforto chega ao ápice
          </li>
          <li>
            <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" alt="Música" class="list-item-gif" />
            Musicas Sertanejas, Gaúchas, Phonk, Trilhas Sonoras e por ai vai
          </li>
          <li>
            <img src="https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif" alt="Comida" class="list-item-gif" />
            Prefiro Salgado ao invés de Doce
          </li>
          <li>
            <img src="https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif" alt="Livros" class="list-item-gif" />
            Contos que só se acha em Livros
          </li>
        </ul>
      `
    },
    {
      id: 'page5',
      title: 'Agora é a Sua Vez!',
      content: `
        <div style="text-align: center;">
          <p>🦅 Obrigada por me conhecer um pouco.</p>
          <p>Agora, gostaria de saber mais sobre a sua pessoa!</p>
          <img src="https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif" alt="Aventura medieval" class="medieval-gif" />
          <p style="margin-top: 15px; font-weight: bold;">Feche este cardápio para responder aos meus questionários.</p>
        </div>
      `
    }
  ];

  const questions: IQuestion[] = [
    {
      id: 'q1',
      text: "Que criaturinha tem o seu coração?",
      options: ["Gatos", "Cachorros", "Passaros"],
      type: 'single',
      gifs: [
        'https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif',
        'https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif',
        'https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif'
      ]
    },
    {
      id: 'q2', 
      text: "Qual melodia encanta seus ouvidos?",
      options: ["Eletronica", "Antiga", "Sertaneja", "K-Pop", "Pop"],
      type: 'single',
      gifs: [
        'https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif',
        'https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif',
        'https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif',
        'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif'
      ]
    },
    {
      id: 'q3',
      text: "Qual estação você prefere?",
      options: ["Verão", "Inverno", "Outono", "Primavera"],
      type: 'single',
      gifs: [
        'https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif',
        'https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif',
        'https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif',
        'https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif'
      ]
    }
  ];

  const handleMenuClose = () => {
    setCurrentStage('questions');
  };

  const handleAnswer = async (response: IUserResponse) => {
    await EmailService.sendResponse(response);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStage('completed');
    }
  };

  // Se não estiver desbloqueado, mostrar tela de senha
  if (!isUnlocked) {
    return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <main>
      <RestaurantScene scene={backgroundScene} />
      <div className="container">
        {/* Questionário no canto superior direito */}
        <div className="questionnaire-section">
          {currentStage === 'questions' && currentQuestionIndex < questions.length && (
            <Question
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              onNext={handleNextQuestion}
            />
          )}
        </div>

        {/* Cardápio na parte inferior */}
        <div className="menu-section">
          {currentStage === 'menu' && (
            <Menu pages={menuPages} onClose={handleMenuClose} />
          )}
        </div>

        {/* Mensagem de conclusão centralizada */}
        {currentStage === 'completed' && (
          <div className="completionMessage">
            <h2>🎉 Encontro Finalizado! 🎉</h2>
            <img src="https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif" alt="Festa medieval" className="medieval-gif" />
            <p>Foi uma honra conhecer seu coração!</p>
            <p style={{marginTop: '10px', fontStyle: 'italic'}}>
              "Que nossas jornadas se cruzem novamente."
            </p>
            <p style={{marginTop: '15px', fontSize: '0.8rem', color: '#8b4513'}}>
              - Tiago de Freitas Machado
            </p>
          </div>
        )}
      </div>
    </main>
  );
}