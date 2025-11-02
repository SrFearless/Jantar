'use client';

import { useState, useEffect } from 'react';
import { RestaurantScene } from '../components/RestaurantScene/RestaurantScene';
import { Menu } from '../components/Menu/Menu';
import { Question } from '../components/Question/Question';
import { PasswordGate } from '../components/PasswordGate/PasswordGate';
import { IPage, IQuestion, IUserResponse } from '../components/types';
import Link from "next/link"
import { cn } from "@/lib/utils"

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
      const isMobile = window.innerWidth <= 768;
      setIsMobile(isMobile);
      
      // Ajuste adicional para telas muito pequenas
      if (window.innerHeight <= 600) {
        document.body.style.overflow = 'hidden';
      }
    };
  
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = '';
    };
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
      title: '',
      image: '',
      content: `
        <div class="center-content">
          <div>
            <p>🛡️ Saudações, Me chamo Tiago de Freitas Machado.</p>
            <p>Tenho 24 anos e estou me especializando na área de programação.</p>
            <p>Nos meus momentos de folga, aprecio jogar, me exercitar (Academia),</p>
            <p>assistir (Anime), fazer leitura e a arte da culinária.</p>
          </div>
          <img src="/images/eu1.jpg" alt="Castelo medieval" class="medieval-gif" />
          <p style="font-style: italic;">"Que nossa conversa seja gratificante!"</p>
        </div>
      `
    },
    {
      id: 'page2',
      title: 'Meus Grandes Sonhos',
      content: `
        <div>
          <p class="centered-text">Tenho sonhos que transcendem a imaginação:</p>
          <ul>
            <li>
              <img src="/images/progra.gif" alt="Viagem medieval" class="list-item-gif" />
              Me tornar um Desenvolvedor fullstack Senior
            </li>
            <li>
              <img src="/images/anciao.jpg" alt="Catedral" class="list-item-gif" />
              Um futuro Ancião
            </li>
            <li>
              <img src="/images/VIOLINO.gif" alt="Alaúde" class="list-item-gif" />
              Dominar a arte do Violino
            </li>
            <li>
              <img src="/images/FAZENDA.gif" alt="Livro" class="list-item-gif" />
              Uma casa tranquila em um lugar de silencio, preferencia na Suiça
            </li>
          </ul>
        </div>
      `
    },
    {
      id: 'page3',
      title: 'Meus Passatempos',
      content: `
        <div>
          <p class="centered-text">Quando não estou emprestando minhas forças para as empresas, dedico-me a:</p>
          <ul>
            <li>
              <img src="/images/GAMER.gif" alt="Manuscritos" class="list-item-gif" />
              Me distrair com Jogos emocionantes
            </li>
            <li>
              <img src="/images/FILME.gif" alt="Banquete" class="list-item-gif" />
              Assistir Séries, Animes e Filmes
            </li>
            <li>
              <img src="/images/PIXEL.gif" alt="Estrelas" class="list-item-gif" />
              Desenhar Pixelarts revigorantes
            </li>
            <li>
              <img src="/images/PROGRAMANDO.gif" alt="Floresta" class="list-item-gif" />
              Explorar minha criatividade para criar programas
            </li>
          </ul>
        </div>
      `
    },
    {
      id: 'page4',
      title: 'Alguns dos meus Gostos',
      content: `
        <div>
          <p class="centered-text">Estes são os combustiveis que aquecem o meu coração:</p>
          <ul>
            <li>
              <img src="/images/INVERNO.gif" alt="Hidromel" class="list-item-gif" />
              A estação do inverno, onde o conforto chega ao ápice
            </li>
            <li>
              <img src="/images/MUSICA1.gif" alt="Música" class="list-item-gif" />
              Musicas Sertanejas, Gaúchas, Phonk, Trilhas Sonoras e por ai vai
            </li>
            <li>
              <img src="/images/CACHORRO.gif" alt="Comida" class="list-item-gif" />
              Amo Cachorro
            </li>
            <li>
              <img src="/images/LIVRO.gif" alt="Livros" class="list-item-gif" />
              Contos que só se acha em Livros
            </li>
          </ul>
        </div>
      `
    },
    {
      id: 'page5',
      title: 'Agora é a Sua Vez!',
      content: `
        <div class="space-between-content">
          <div class="center-content">
            <p>🦅 Obrigado por me conhecer um pouco.</p>
            <p>Agora, gostaria de saber mais sobre a sua pessoa!</p>
          </div>
          <div class="bottom-content">
            <p style="font-weight: bold; margin-top: 20px;"> Feche este cardápio para responder aos meus questionários.</p>
          </div>
        </div>
      `
    }
  ];

  const questions: IQuestion[] = [
    {
      id: 'q1',
      text: "Que criaturinha tem o seu coração?",
      options: ["Gatos", "Cachorros", "Passaros", "Cavalos"],
      type: 'single',
      gifs: [
        '/images/CACHORRO.gif',
        '/images/GATO.gif',
        '/images/CAVALO.gif',
        '/images/PASSARO.gif'
      ]
    },
    {
      id: 'q2', 
      text: "Qual melodia encanta seus ouvidos?",
      options: ["Eletronica", "Antiga", "Sertaneja", "K-Pop", "Pop"],
      type: 'single',
      gifs: [
        '/images/MUSICA.gif',
        '/images/MUSICA1.gif'
      ]
    },
    {
      id: 'q3',
      text: "Qual estação você prefere?",
      options: ["Verão", "Inverno", "Outono", "Primavera"],
      type: 'single',
      gifs: [
        '/images/VERAO.gif',
        '/images/INVERNO.gif',
        '/images/OUTONO.gif',
        '/images/PRIMAVERA.gif'
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
            <h2>Encontro Finalizado!</h2>
            <img src="/images/CORAÇAO.gif" alt="Festa medieval"/>
            <p>Foi uma honra conhecer seu coração!</p>
            <p style={{marginTop: '10px', fontStyle: 'italic'}}>
              "Que nossas jornadas se cruzem novamente."
            </p>
            <Link 
            href="https://portfolio-pessoal-mu-virid.vercel.app" 
            className={cn(
              "font-pixel text-purple-500 hover:text-purple-200 px-3 py-1 rounded-md transition-colors bg-amber-900/30 border-l-4 border-amber-500",
            )}
          >
            Ir ao Portifólio
          </Link>
            <p style={{marginTop: '15px', fontSize: '0.8rem', color: '#8b4513'}}>
              - Tiago de Freitas Machado
            </p>
          </div>
        )}
      </div>
    </main>
  );
}