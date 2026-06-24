import { useState } from 'react';
import { Calculator } from 'lucide-react';

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
    <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(24, 24, 27, 0.8)', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Calculator size={20} color="var(--accent-purple)" />
        <span style={{ fontWeight: 'bold' }}>Calculator</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ textAlign: 'right', fontSize: '0.9rem', color: 'gray', minHeight: '1.2rem' }}>
          {equation}
        </div>
        <div style={{ textAlign: 'right', fontSize: '2rem', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1rem', overflow: 'hidden' }}>
          {display}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', flex: 1 }}>
          <button onClick={handleClear} style={btnStyle(true)}>C</button>
          <button onClick={() => handleOperator('/')} style={btnStyle(true)}>/</button>
          <button onClick={() => handleOperator('*')} style={btnStyle(true)}>×</button>
          <button onClick={() => handleOperator('-')} style={btnStyle(true)}>-</button>

          <button onClick={() => handleNumber('7')} style={btnStyle()}>7</button>
          <button onClick={() => handleNumber('8')} style={btnStyle()}>8</button>
          <button onClick={() => handleNumber('9')} style={btnStyle()}>9</button>
          <button onClick={() => handleOperator('+')} style={{ ...btnStyle(true), gridRow: 'span 2' }}>+</button>

          <button onClick={() => handleNumber('4')} style={btnStyle()}>4</button>
          <button onClick={() => handleNumber('5')} style={btnStyle()}>5</button>
          <button onClick={() => handleNumber('6')} style={btnStyle()}>6</button>

          <button onClick={() => handleNumber('1')} style={btnStyle()}>1</button>
          <button onClick={() => handleNumber('2')} style={btnStyle()}>2</button>
          <button onClick={() => handleNumber('3')} style={btnStyle()}>3</button>
          <button onClick={handleEqual} style={{ ...btnStyle(true, true), gridRow: 'span 2' }}>=</button>

          <button onClick={() => handleNumber('0')} style={{ ...btnStyle(), gridColumn: 'span 2' }}>0</button>
          <button onClick={() => handleNumber('.')} style={btnStyle()}>.</button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = (isAction = false, isPrimary = false) => ({
  background: isPrimary ? 'var(--accent-purple)' : isAction ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  fontSize: '1.2rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
  padding: '0.5rem'
});
