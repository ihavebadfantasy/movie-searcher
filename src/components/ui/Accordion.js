import { useRef, useState, useEffect } from 'react';
import getDateColorClass from '../../helpers/getDateColorClass';

const Accordion = ({items, setSelected}) => {
  // TODO: responsive
  const accordionRef = useRef();
// TODO: make a custom hook: closing with click outside component
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
    };

    document.body.addEventListener('click', closeAccordion);

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
                className={`wrapper nes-text mt-30 ${contentItemTextColorClass}`}
                key={item.title || index}
              >
              { contentItem.title && (
                  <div className="title">
                    {contentItem.title}
                  </div>
                )
              }

                { contentItem.date && (
                  <span className="date">
                    {contentItem.date}
                  </span>
                )
                }

              { contentItem.content && (
                <div className="content">
                  {contentItem.content}
                </div>
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
