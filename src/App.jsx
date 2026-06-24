import { useState, useEffect } from 'react';
import BootSequence from './components/BootSequence.jsx';
import Desktop from './components/Desktop.jsx';
import LockScreen from './components/LockScreen.jsx';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    // Artificial delay to simulate boot sequence
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isBooting ? (
        <BootSequence />
      ) : isLocked ? (
        <LockScreen onUnlock={() => setIsLocked(false)} />
      ) : (
        <Desktop />
      )}
    </>
  );
}

export default App;
