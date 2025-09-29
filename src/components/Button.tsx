'use client';

import React from 'react';
import { typography } from '../styles/typography';
import { addToCalendar } from '../utils/calendar';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  calendarEvent?: 'ceremony' | 'reception';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  style = {},
  calendarEvent
}) => {
  const baseStyles = {
    fontFamily: 'Instrument Sans, sans-serif',
    fontWeight: '500',
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    textDecoration: 'none',
    outline: 'none',
    opacity: disabled ? 0.6 : 1,
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
  };

  const variantStyles = {
    primary: {
      color: 'white',
      background: '#FF6B6B',
      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
    },
    secondary: {
      color: '#D0DBE1',
      background: 'transparent',
      border: '2px solid #D0DBE1',
      boxShadow: '0 4px 15px rgba(208, 219, 225, 0.2)',
    }
  };

  const sizeStyles = {
    small: {
      fontSize: '0.9rem',
      padding: '10px 20px',
    },
    medium: {
      fontSize: '1rem',
      padding: '14px 28px',
    },
    large: {
      fontSize: '1.1rem',
      padding: '18px 36px',
    }
  };

  const hoverStyles = variant === 'primary'
    ? {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
        background: '#FF5252'
      }
    : {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(208, 219, 225, 0.4)',
        background: '#D0DBE1',
        color: '#2c3e50'
      };

  const handleClick = () => {
    if (calendarEvent) {
      addToCalendar(calendarEvent);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`wedding-button ${variant} ${size} ${className}`}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !('ontouchstart' in window)) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !('ontouchstart' in window)) {
          Object.assign(e.currentTarget.style, {
            ...baseStyles,
            ...variantStyles[variant],
            ...sizeStyles[size],
          });
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;