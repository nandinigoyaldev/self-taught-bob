import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, RotateCcw, Trophy } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[10, 10]];
const INITIAL_DIRECTION = [0, -1];
const INITIAL_SPEED = 150;

export default function SnakeApp() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState([5, 5]);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('snakeHighScore') || '0'));
  
  const boardRef = useRef(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ];
      // eslint-disable-next-line no-loop-func
      if (!snake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1])) {
        break;
      }
    }
    setFood(newFood);
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    generateFood();
    boardRef.current?.focus();
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prev => {
        const head = prev[0];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];

        // Check collision with walls
        if (newHead[0] < 0 || newHead[0] >= GRID_SIZE || newHead[1] < 0 || newHead[1] >= GRID_SIZE) {
          setGameOver(true);
          return prev;
        }

        // Check collision with self
        if (prev.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Check food collision
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(s => s + 10);
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(intervalId);
  }, [direction, food, gameOver, isPlaying, generateFood]);

  const handleKeyDown = (e) => {
    if (gameOver) return;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (direction[1] !== 1) setDirection([0, -1]);
        break;
      case 'ArrowDown':
      case 's':
        if (direction[1] !== -1) setDirection([0, 1]);
        break;
      case 'ArrowLeft':
      case 'a':
        if (direction[0] !== 1) setDirection([-1, 0]);
        break;
      case 'ArrowRight':
      case 'd':
        if (direction[0] !== -1) setDirection([1, 0]);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0F172A', color: 'white' }}>
      
      {/* Header */}
      <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1E293B', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Score</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#38BDF8', fontFamily: 'monospace' }}>{score}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}><Trophy size={12} /> Best</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FBBF24', fontFamily: 'monospace' }}>{highScore}</div>
          </div>
        </div>
        
        <button 
          onClick={resetGame}
          style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
          onMouseLeave={e => e.currentTarget.style.background = '#3B82F6'}
        >
          {gameOver ? <RotateCcw size={16} /> : <Play size={16} />}
          {gameOver ? 'Play Again' : (isPlaying ? 'Restart' : 'Start Game')}
        </button>
      </div>

      {/* Game Board Container */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div 
          ref={boardRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          style={{ 
            width: '100%', 
            maxWidth: '500px', 
            aspectRatio: '1/1', 
            background: '#020617', 
            border: '2px solid #334155',
            borderRadius: '12px',
            position: 'relative',
            outline: 'none',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden'
          }}
        >
          {!isPlaying && !gameOver && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(2, 6, 23, 0.8)', zIndex: 10 }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: '#F8FAFC' }}>Snake</h2>
              <p style={{ color: '#94A3B8', marginBottom: '24px' }}>Use Arrow Keys or WASD to move</p>
              <button onClick={resetGame} style={{ background: '#10B981', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '99px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                Start
              </button>
            </div>
          )}

          {gameOver && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(220, 38, 38, 0.2)', backdropFilter: 'blur(4px)', zIndex: 10 }}>
              <h2 style={{ fontSize: '3rem', margin: 0, color: '#EF4444', textShadow: '0 4px 12px rgba(220,38,38,0.5)' }}>GAME OVER</h2>
              <p style={{ fontSize: '1.2rem', color: 'white', margin: '16px 0 32px 0' }}>Final Score: <span style={{ color: '#38BDF8', fontWeight: 'bold' }}>{score}</span></p>
              <button onClick={resetGame} style={{ background: '#EF4444', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '99px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RotateCcw size={20} /> Try Again
              </button>
            </div>
          )}

          {/* Grid Render */}
          {Array.from({ length: GRID_SIZE }).map((_, y) => (
            Array.from({ length: GRID_SIZE }).map((_, x) => {
              const isSnake = snake.some(segment => segment[0] === x && segment[1] === y);
              const isHead = snake[0][0] === x && snake[0][1] === y;
              const isFood = food[0] === x && food[1] === y;

              return (
                <div
                  key={`${x}-${y}`}
                  style={{
                    position: 'absolute',
                    left: `${(x / GRID_SIZE) * 100}%`,
                    top: `${(y / GRID_SIZE) * 100}%`,
                    width: `${100 / GRID_SIZE}%`,
                    height: `${100 / GRID_SIZE}%`,
                    background: isHead ? '#10B981' : isSnake ? '#34D399' : isFood ? '#EF4444' : 'transparent',
                    borderRadius: isHead ? '4px' : isSnake ? '2px' : isFood ? '50%' : '0',
                    border: isSnake ? '1px solid #064E3B' : '1px solid rgba(255,255,255,0.02)',
                    boxSizing: 'border-box',
                    transition: isSnake ? 'none' : 'all 0.1s'
                  }}
                />
              );
            })
          ))}
        </div>
      </div>
    </div>
  );
}
