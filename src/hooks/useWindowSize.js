import React from 'react';

function useWindowSize() {
  const getWidth = React.useCallback(() => {
    return window.innerWidth;
  }
  , []);
  const [width, setWidth] = React.useState(getWidth());

  React.useEffect(() => {
    function handleResize() {
      setWidth(getWidth());
    }

    window.addEventListener('resize', handleResize);

    window.addEventListener('resize', () => {
      clearTimeout(window.resized);
      window.resized = setTimeout(() => {
        handleResize();
      }, 250);
    });
    
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, [getWidth]);

  return width;
}

export default useWindowSize; 