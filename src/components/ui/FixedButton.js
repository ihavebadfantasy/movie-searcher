import { useEffect, useState } from 'react';
import Button from './Button';
import useWindowResize from '../../hooks/useWindowResize';

const FixedButton = ({
  color = 'primary',
  containerRef = null,
  topOffset = 0,
  leftOffset = -20,
  text,
  shortText = null,
  onClick = () => {},
  customClass = '',
}) => {
  const [left, setLeft] = useState(leftOffset);
  const [top, setTop] = useState(topOffset);
  const [dynamicText, setDynamicText] = useState(text);
  const [windowWidth] = useWindowResize();

  const detectBtnPosition = () => {
    if (containerRef.current) {
      setLeft(containerRef.current.getBoundingClientRect().left + leftOffset);

      let newTop = containerRef.current.getBoundingClientRect().top;
      if (newTop < 0) {
        newTop = topOffset;
      } else {
        newTop += topOffset;
      }

      setTop(newTop);
    }
  }

  useEffect(() => {
    detectBtnPosition();
  }, [windowWidth]);

  useEffect(() => {
    const onScroll = () => {
      if (shortText) {
        if (window.scrollY > 0) {
          setDynamicText(shortText);
        } else {
          setDynamicText(text);
        }
      }

      detectBtnPosition();
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <Button
      color={color}
      customClass={`${customClass} fixed fixed-btn`}
      style={{
        left: left + 'px',
        top: top + 'px',
      }}
      text={dynamicText}
      onClick={onClick}
    />
  );
}

export default FixedButton;
