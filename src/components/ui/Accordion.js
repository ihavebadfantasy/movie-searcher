import { useRef, useContext, useEffect } from 'react';
import getDateColorClass from '../../helpers/getDateColorClass';
import generateDatestring from '../../helpers/generateDatestring';
import ThemeContext from '../../contexts/ThemeContext';
import config from '../../config';

const { nes, basic } = config.themes;

const Accordion = ({items, setSelected}) => {
  const { theme } = useContext(ThemeContext);

  const activeItemRef = useRef();

  const accordionRef = useRef();

  useEffect(() => {
    if (activeItemRef && activeItemRef.current) {
      setTimeout(() => {
        const activeItemTopOffset = activeItemRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: activeItemTopOffset,
          behavior: 'smooth',
        });
      }, 300);
    }
  });

  useEffect(() => {
    const closeAccordion = (e) => {
      if (accordionRef.current && accordionRef.current.contains(e.target)) {
        return;
      }

      const selectedItem = items.find((item) => {
        return item.selected;
      });

      const selectedItemId = selectedItem ? selectedItem.id : null;
      setSelected(selectedItemId);

      const accordionTopOffset = accordionRef.current.getBoundingClientRect().top + window.scrollY;

      setTimeout(() => {
        window.scrollTo({
          top: accordionTopOffset,
          behavior: 'smooth',
        });
      }, 300);
    };

    const selectedItems = items.filter((item) => {
      return item.selected;
    });

    if (selectedItems.length) {
      document.body.addEventListener('click', closeAccordion);
    }

    return () => {
      document.body.removeEventListener('click', closeAccordion);
    }
  }, [items]);

  const renderedItems = items.map((item) => {
    const selectedClass = item.selected ? 'active' : '';
    const itemTextColorClass = item.headerDate ? getDateColorClass(item.headerDate) : '';

    return (
      <div
        className={`accordion-item ${selectedClass}`}
        key={item.id}
        ref={item.selected ? activeItemRef : null}
      >
        <div
          onClick={() => {
            setSelected(item.id);
          }}
          className={`accordion-item-header nes-text ${itemTextColorClass}`}
        >
          {item.header}
          {item.headerDate && (
              <div className="small-text">
                {item.headerDate}
              </div>
            )
          }
        </div>
        <div className="accordion-item-content">
          {item.content.map((contentItem, index) => {
            const contentItemTextColorClass = contentItem.date ? getDateColorClass(contentItem.date) : '';
            return (
              <div
                className={`wrapper nes-text mt-30 ${contentItemTextColorClass} ${index === item.content.length - 1 ? 'mb-30' : ''}`}
                key={item.title || index}
              >
              { contentItem.title && (
                  <div className="accordion-item-content-title">
                    {contentItem.title}
                  </div>
                )
              }

                { contentItem.date && (
                  <span className="date">
                    {generateDatestring(contentItem.date)}
                  </span>
                )
                }

              { contentItem.content && (
                <>
                  <div className="separator" />
                  <div className="content">
                    {contentItem.content}
                  </div>
                </>
                )
              }
              </div>
            );
          })}
        </div>
      </div>
    );
  })
  return (
    <div className="accordion" ref={accordionRef}>
      {renderedItems}
    </div>
  );
}

export default Accordion;
