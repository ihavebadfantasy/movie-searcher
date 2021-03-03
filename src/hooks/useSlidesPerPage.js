import { useEffect, useState } from 'react';
import useWindowResize from './useWindowResize';

const useSlidesPerPage = (defaultSlidesPerPage = 5) => {
  const [slidesPerPage, setSlidesPerPage] = useState(defaultSlidesPerPage);
  const [windowWidth, layout] = useWindowResize();

  useEffect(() => {
    switch (layout) {
      case 'phone':
        const phoneSlidesPerPage = defaultSlidesPerPage - 4;
        setSlidesPerPage(phoneSlidesPerPage < 1 ? 1 : phoneSlidesPerPage);
        break;
      case 'phablet':
        const phabletSlidesPerPage = defaultSlidesPerPage - 3;
        setSlidesPerPage(phabletSlidesPerPage < 1 ? 1 : phabletSlidesPerPage);
        break;
      case 'tablet':
        const tabletSlidesPerPage = defaultSlidesPerPage - 2;
        setSlidesPerPage(tabletSlidesPerPage < 1 ? 1 : tabletSlidesPerPage);
        break;
      case 'containerWidth':
        const containerWidthSlidesPerPage = defaultSlidesPerPage - 1;
        setSlidesPerPage(containerWidthSlidesPerPage < 1 ? 1 : containerWidthSlidesPerPage);
        break;
      default:
        setSlidesPerPage(defaultSlidesPerPage);
    }

  }, [layout]);

  return [slidesPerPage];
}

export default useSlidesPerPage;
