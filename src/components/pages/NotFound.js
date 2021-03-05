import {useState, useEffect, useRef} from 'react';
import getRandomInt from '../../helpers/getRandomInt';


const output = {
  'почему не грузит': ['Потому что не хочет.', 'Интеренет мне запили!!!'],
  'почему не нашли': ['Потому что не не смогли.', 'Интеренет мне запили!!!'],
  'почему нельзя найти': ['Потому что не находится.', 'Интеренет мне запили!!!'],
  'да': 'Путин наш президент!',
  'как тебя зовут': ['Надежда Инокентьевна.', 'Дейенерис из дома Таргариенов, именуемая первой, Неопалимая, Королева Миэрина, Королева Андалов, Ройнар и Первых Людей, Кхалиси Дотракийского Моря, Разбивающая Оковы и Матерь Драконов.', 'Вова.'],
  'вернуться назад': ['Там уже тоже не грузит.', 'Что же там такого интересного-то?'],
  'назад': ['Там уже тоже не грузит.', 'Что же там такого интересного-то?'],
  'обновить': 'Обновлена подписка на Нетфликс, спасибо что остаетесь с нами.',
  'что': 'Иисус Вас любит.',
  'почему': ['Зайцы любят есть морковь.', 'хз'],
  'текст об ошибке': 'Yпс, кажется интеренет отключили за неуплату.',
  'текст ошибки': 'Yпс, кажется интеренет отключили за неуплату.',
}

const defaultOutput = [' Конь на Е2, пешка бьет слона', 'Код принят, инициирована загрузка трояна на Ваш компьютер, пожалуйста, не отключайтесь от сети', 'Наряд уже выехал, ожидайте.']

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
        const nextChar = textToRender[0];

        setAllText(allText + nextChar);
        setTextToRender(textToRender.slice(1));
      }, 30);
    } else {
      setShowInput(true);
    }
  }, [textToRender]);

  useEffect(() => {
    if (showInput) {
      inputRef.current.focus();
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
          <pre className="text">
            {allText}
          </pre>
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
