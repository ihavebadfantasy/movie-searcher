import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import useWindowResize, { containerWidth } from '../../hooks/useWindowResize';

const Sidebar = ({children}) => {
  // TODO: (feature) add closing when search inited and finished
  const [isClosed, setIsClosed] = useState(false);
  const [windowWidth, layout] = useWindowResize();

  useEffect(() => {
    if (windowWidth <= containerWidth) {
      setIsClosed(true);
    } else {
      setIsClosed(false)
    }
  }, [windowWidth])

  return (
    <div className={`sidebar-wrapper pl-0 ${isClosed ? 'closed' : ''}`}>
      {isClosed && (
        <p className="sidebar-btn-hint nes-text is-primary very-small-text">
          Click to expand filters
        </p>
      )}
        <Button
          text="&#8593;"
          customClass="sidebar-swipe-btn"
          onClick={() => {
            setIsClosed(!isClosed);
          }}
        />
      <div className="sidebar pl-0">
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
