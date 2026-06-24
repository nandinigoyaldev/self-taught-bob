import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperator = (op) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEqual = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px', background: 'rgba(24,24,27,0.8)', color: 'white', userSelect: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', opacity: 0.8 }}>
        <Calculator size={18} color="#f97316" />
        <span style={{ fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#f97316' }}>Calc</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>
        <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#9ca3af', minHeight: '1.2rem', padding: '0 8px', fontFamily: 'monospace' }}>
          {equation}
        </div>
        <div style={{ 
          textAlign: 'right', fontSize: '2.25rem', padding: '12px', background: 'rgba(0,0,0,0.4)', 
          borderRadius: '12px', marginBottom: '16px', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)', 
          border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'monospace', letterSpacing: '-0.025em' 
        }}>
          {display}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', flex: 1, paddingBottom: '8px' }}>
          <CalcButton onClick={handleClear} isAction color="rgba(239,68,68,0.2)" textColor="#f87171" borderColor="rgba(239,68,68,0.2)">C</CalcButton>
          <CalcButton onClick={() => handleOperator('/')} isAction>/</CalcButton>
          <CalcButton onClick={() => handleOperator('*')} isAction>×</CalcButton>
          <CalcButton onClick={() => handleOperator('-')} isAction>-</CalcButton>

          <CalcButton onClick={() => handleNumber('7')}>7</CalcButton>
          <CalcButton onClick={() => handleNumber('8')}>8</CalcButton>
          <CalcButton onClick={() => handleNumber('9')}>9</CalcButton>
          <CalcButton onClick={() => handleOperator('+')} isAction style={{ gridRow: 'span 2', height: '100%' }}>+</CalcButton>

          <CalcButton onClick={() => handleNumber('4')}>4</CalcButton>
          <CalcButton onClick={() => handleNumber('5')}>5</CalcButton>
          <CalcButton onClick={() => handleNumber('6')}>6</CalcButton>

          <CalcButton onClick={() => handleNumber('1')}>1</CalcButton>
          <CalcButton onClick={() => handleNumber('2')}>2</CalcButton>
          <CalcButton onClick={() => handleNumber('3')}>3</CalcButton>
          <CalcButton onClick={handleEqual} isPrimary style={{ gridRow: 'span 2', height: '100%', background: '#f97316', border: '1px solid #fdba74', boxShadow: '0 0 15px rgba(249,115,22,0.4)' }}>=</CalcButton>

          <CalcButton onClick={() => handleNumber('0')} style={{ gridColumn: 'span 2' }}>0</CalcButton>
          <CalcButton onClick={() => handleNumber('.')}>.</CalcButton>
        </div>
      </div>
    </div>
  );
}

function CalcButton({ children, onClick, isAction, isPrimary, style = {}, color, textColor, borderColor }) {
  const defaultBg = isPrimary 
    ? "#3b82f6" 
    : isAction 
      ? "rgba(255,255,255,0.1)" 
      : "rgba(255,255,255,0.05)";
      
  const bgClass = color || defaultBg;

  return (
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.02, backgroundColor: isPrimary ? '#60a5fa' : isAction ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)' }}
      whileTap={{ scale: 0.95, y: 2 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px',
        fontSize: '1.25rem', transition: 'background-color 0.2s', 
        border: `1px solid ${borderColor || (isPrimary ? '#93c5fd' : isAction ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)')}`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)', backgroundColor: bgClass,
        color: textColor || 'white', touchAction: 'manipulation', cursor: 'pointer',
        ...style
      }}
    >
      {children}
    </motion.button>
  );
}
