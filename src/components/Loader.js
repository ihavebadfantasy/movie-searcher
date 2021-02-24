import { useState, useEffect } from 'react';

const colors = {
  black: '',
  primary: 'is-primary',
  success: 'is-success',
  warning: 'is-warning',
  error: 'is-error',
  pattern: 'is-pattern',
}

const Loader = ({ color }) => {
  color = color || 'black';

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = progress;
    let intervalId = setInterval(() => {
      if (currentProgress === 101) {
        setProgress(0);
        currentProgress = 0;
      } else {
        setProgress(currentProgress + 1);
      }

      currentProgress++;
    }, 5);

    return () => {
      setProgress(0);
      clearInterval(intervalId);
    }
  }, []);

  return (
    <progress className={`nes-progress ${colors[color]}`} value={progress} max="100"></progress>
  );
}

export default Loader;
