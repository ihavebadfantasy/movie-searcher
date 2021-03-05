import {useState, useEffect, useRef} from 'react';
import getRandomInt from '../../helpers/getRandomInt';
import { output, defaultOutput } from '../../config/notFound';

const matchInputToOutput = (input) => {
  input = input.replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").toLowerCase();

  for (let key in output) {
    if (input.includes(key)) {
      if (typeof output[key] === 'string') {
        return output[key];
      }

      const resIndex = getRandomInt(output[key].length - 1);

      return output[key][resIndex];
    }
  }

  return defaultOutput[getRandomInt(defaultOutput.length - 1)];
}

const NotFound = () => {
  const [allText, setAllText] = useState('');
  const [textToRender, setTextToRender] = useState('Упс! Кажется такой страницы не существует или мы просто не смогли ее найти. Что будем делать дальше?');
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (textToRender) {
      setTimeout(() => {
        window.scrollTo(0,document.body.scrollHeight, { behavior: 'smooth' });
        const nextChar = textToRender[0];

        setAllText(allText + nextChar);
        setTextToRender(textToRender.slice(1));
      }, 30);
    } else {
      setShowInput(true);
    }
  }, [textToRender]);

  useEffect(() => {
    window.scrollTo(0,document.body.scrollHeight, { behavior: 'smooth' });

    const setInputFocus = () => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }

    if (showInput) {
      setInputFocus();
    }

    document.body.addEventListener('click', setInputFocus);

    return () => {
      document.body.removeEventListener('click', setInputFocus);
    }
  }, [showInput]);

  const onInputSubmit = (e) => {
    e.preventDefault();

    setAllText(`${allText}\n>_ ${inputValue}` + '\n');
    setShowInput(false);
    setTextToRender(matchInputToOutput(inputValue));
    setInputValue('');
  }

  return (
    <div className="full-screen not-found">
      <div className="text-wrapper">
          <p className="text">
            {allText}
          </p>
          <div className="user">
            { showInput && (
              <form onSubmit={onInputSubmit}>
                <span>{'>'}</span>
                <span className="blink_me">_</span>
                <input
                  type="text"
                  className="input"
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
              </form>
            )}
          </div>
      </div>
    </div>
  );
}

export default NotFound;
