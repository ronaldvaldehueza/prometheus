import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Button, ButtonProps } from 'reactstrap';
import './ripple-button.scss';

interface RippleButtonProps extends ButtonProps {
  className?: string;
  children: React.ReactNode;
}

const RippleButton: React.FC<RippleButtonProps> = ({ className, children, onClick, ...rest }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isRippling, setIsRippling] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number, y: number }>({ x: -1, y: -1 });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 500);
      } else {
        setIsRippling(false);
      }
    }
  }, [coords]);

  useEffect(() => {
    if (mounted) {
      if (!isRippling) setCoords({ x: -1, y: -1 });
    }
  }, [isRippling]);

  return (
    <Button
      className={classnames('waves-effect', {
        [className!]: className
      })}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        if (onClick) {
          onClick(e);
        }
      }}
      {...rest}
    >
      {children}
      {isRippling ? (
        <span
          className='waves-ripple'
          style={{
            left: coords.x,
            top: coords.y
          }}
        ></span>
      ) : null}
    </Button>
  );
};

export default RippleButton;
