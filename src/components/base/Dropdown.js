import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-animated-css'
import { useTranslation } from 'react-i18next';

const Dropdown = ({
  items,
  selectedValue = '',
  onSelectItem,
  title = '',
  localize = false,
}) => {
  const [ t ] = useTranslation('dropdownItems');
  const [isOpen, setIsOpen] = useState(false);

  const dropdownHeaderRef = useRef();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownHeaderRef.current && dropdownHeaderRef.current.contains(e.target)) {
        return;
      }

      setIsOpen(false);
    }

    document.body.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    }
  }, []);

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      { title && (
        <div className="dropdown-title">
          {title}
        </div>
      ) }
      <div
        className="nes-select dropdown-header"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        ref={dropdownHeaderRef}
      >
        <div className="dropdown-selected">
          {localize ? t(selectedValue) : selectedValue}
        </div>
      </div>
      <Animated
        className="dropdown-content"
        animationIn="jello"
        animationInDuration={400}
        animationOut="hinge"
        animationOutDuration={600}
        isVisible={isOpen}
        animateOnMount={false}
      >
        {items.map((item) => {
          if (item.value === selectedValue) {
            return null;
          }
          return (
            <div
              className="dropdown-content-item small-text gray"
              key={item.value}
              onClick={() => {
                onSelectItem(item.value);
              }}
            >
              {localize ? t(item.label) : item.label}
            </div>
          );
        })}
      </Animated>
    </div>
  );
}

export default Dropdown;
