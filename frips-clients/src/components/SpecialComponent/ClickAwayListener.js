import React, { useState, useRef, useEffect } from 'react';

const ClickAwayListener = ({ children, onClickAway }) => {
  const node = useRef();
  const [isClickInside, setIsClickInside] = useState(false);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      setIsClickInside(true);
    } else {
      setIsClickInside(false);
      onClickAway();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div ref={node}>
      {children}
    </div>
  );
};

export default ClickAwayListener;
