import {useState, useEffect} from 'react';

const phone = 450;
const phablet = 600;
const tablet = 768;
const containerWidth = 1150;

const useWindowResize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [layout, setLayout] = useState('');

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  useEffect(() => {
    if (windowWidth <= phone) {
      setLayout('phone');

      return;
    }

    if (windowWidth <= phablet) {
      setLayout('phablet');

      return;
    }

    if (windowWidth <= tablet) {
      setLayout('tablet');

      return;
    }

    if (windowWidth <= containerWidth) {
      setLayout('containerWidth');

      return;
    }

    setLayout('desktop');
  }, [windowWidth])

  return [windowWidth, layout];
}

export default useWindowResize;
