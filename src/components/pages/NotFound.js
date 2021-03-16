import {useState, useEffect, useRef} from 'react';
import getRandomInt from '../../helpers/getRandomInt';
import { output, defaultOutput } from '../../config/notFound';
import { Link } from 'react-router-dom';
import routes from '../navigation/routes';
import { Animated } from 'react-animated-css';

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
  const [inputsCnt, setInputsCnt] = useState(0);
  const [isHomeBtnVisible, setIsHomeBtnVisible] = useState(false);
  const [numberOfInputsToShowHomeBtn] = useState(getRandomInt(7, 1));

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
    setInputsCnt(inputsCnt + 1);
  }

  useEffect(() => {
    if (inputsCnt === numberOfInputsToShowHomeBtn) {
      setIsHomeBtnVisible(true);
    }
  }, [inputsCnt])

  return (
    <div className="full-screen not-found">
        <Link
          to={routes.home}
          className="not-found-home-btn"
        >
          <Animated
            animateOnMount={false}
            isVisible={isHomeBtnVisible}
            animationInDuration={500}
            animationIn="tada"
          >
        <span className="brk-btn">
          Home
        </span>
          </Animated>
        </Link>
      <div className={`text-wrapper ${isHomeBtnVisible ? 'with-home-btn' : ''}`}>
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
