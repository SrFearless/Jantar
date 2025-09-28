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
          <p>Tenho 24 anos e estou me especializando na área de programação.</p>
          <p>Nos meus momentos de folga, aprecio jogar, me exercitar (Academia), assistir (Anime)</p>
          <p>fazer leitura e a arte da culinária.</p>
          <img src="https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif" alt="Castelo medieval" class="medieval-gif" />
          <p style="margin-top: 15px; font-style: italic;">"Que nossa conversa seja tão rica quanto os tesouros de um dragão!"</p>
        </div>
      `
    },
    {
      id: 'page2',
      title: 'Meus Grandes Sonhos',
      content: `
        <p>Tenho aspirações que transcendem este reino:</p>
        <ul>
          <li>
            <img src="https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif" alt="Viagem medieval" class="list-item-gif" />
            Viajar para 30 reinos diferentes além-mar
          </li>
          <li>
            <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" alt="Catedral" class="list-item-gif" />
            Projetar uma catedral que toque os céus
          </li>
          <li>
            <img src="https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif" alt="Alaúde" class="list-item-gif" />
            Dominar a arte do alaúde real
          </li>
          <li>
            <img src="https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif" alt="Livro" class="list-item-gif" />
            Escrever um tratado sobre arquitetura ancestral
          </li>
          <li>
            <img src="https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif" alt="Solar" class="list-item-gif" />
            Ter um solar com jardim de ervas mágicas
          </li>
        </ul>
      `
    },
    {
      id: 'page3',
      title: 'Meus Passatempos Reais',
      content: `
        <p>Quando não estou desenhando fortalezas, dedico-me a:</p>
        <ul>
          <li>
            <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" alt="Manuscritos" class="list-item-gif" />
            Iluminar manuscritos antigos
          </li>
          <li>
            <img src="https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif" alt="Banquete" class="list-item-gif" />
            Preparar banquetes para a corte
          </li>
          <li>
            <img src="https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif" alt="Estrelas" class="list-item-gif" />
            Estudar as estrelas e seus mistérios
          </li>
          <li>
            <img src="https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif" alt="Floresta" class="list-item-gif" />
            Explorar florestas encantadas
          </li>
          <li>
            <img src="https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif" alt="Artefatos" class="list-item-gif" />
            Colecionar artefatos de reinos distantes
          </li>
        </ul>
      `
    },
    {
      id: 'page4',
      title: 'Meus Tesouros Preferidos',
      content: `
        <p>Estas são as joias que enriquecem meu espírito:</p>
        <ul>
          <li>
            <img src="https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif" alt="Hidromel" class="list-item-gif" />
            Hidromel ao amanhecer e vinho tinto ao crepúsculo
          </li>
          <li>
            <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" alt="Música" class="list-item-gif" />
            Canções de bardos e melodias de harpa
          </li>
          <li>
            <img src="https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif" alt="Comida" class="list-item-gif" />
            Manjares da Toscana e do Oriente
          </li>
          <li>
            <img src="https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif" alt="Filmes" class="list-item-gif" />
            Os contos épicos das Cruzadas
          </li>
          <li>
            <img src="https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif" alt="Livros" class="list-item-gif" />
            Os pergaminhos de alquimia árabe
          </li>
          <li>
            <img src="https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif" alt="Outono" class="list-item-gif" />
            A estação do outono, quando as folhas douram
          </li>
        </ul>
      `
    },
    {
      id: 'page5',
      title: 'Agora é a Sua Vez, Nobre Aventureiro!',
      content: `
        <div style="text-align: center;">
          <p>🦅 Obrigada por conhecer os segredos da minha corte.</p>
          <p>Agora, gostaria de saber mais sobre o seu reino interior!</p>
          <img src="https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif" alt="Aventura medieval" class="medieval-gif" />
          <p style="margin-top: 15px; font-weight: bold;">Feche este pergaminho para responder aos meus questionários reais.</p>
        </div>
      `
    }
  ];

  const questions: IQuestion[] = [
    {
      id: 'q1',
      text: "Que criaturas míticas capturam seu coração?",
      options: ["Dragões majestosos", "Grifos alados", "Unicórnios puros", "Fênixes renascentes", "Todas as criaturas mágicas"],
      type: 'single',
      gifs: [
        'https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif',
        'https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif',
        'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
        'https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif'
      ]
    },
    {
      id: 'q2', 
      text: "Qual melodia real encanta seus ouvidos?",
      options: ["Cantos gregorianos", "Lauras de bardos", "Sons de alaúde", "Trovões de guerra", "Sinfonias clássicas", "Cantigas populares"],
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
      text: "Qual destino de peregrinação você mais almeja?",
      options: ["Ilhas tropicais distantes", "Montanhas dos dragões", "Cidades muradas", "Vales campestres", "Desertos proibidos", "Terras geladas do norte"],
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
            <h2>🎉 O Encontro Real Chegou ao Fim! 🎉</h2>
            <img src="https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif" alt="Festa medieval" className="medieval-gif" />
            <p>Foi uma honra conhecer seu coração de aventureiro!</p>
            <p style={{marginTop: '15px', fontStyle: 'italic'}}>
              "Que nossas jornadas se cruzem novamente sob as estrelas do destino."
            </p>
            <p style={{marginTop: '20px', fontSize: '0.9rem', color: '#8b4513'}}>
              - Lady Maria da Casa dos Ventos
            </p>
          </div>
        )}
      </div>
    </main>
  );
}