'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  type = 'button',
  disabled = false,
  className = ''
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
  };

  const variantStyles = {
    primary: {
      color: 'white',
      background: '#FF6B6B',
      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
    },
    secondary: {
      color: '#FF6B6B',
      background: 'white',
      border: '2px solid #FF6B6B',
      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.1)',
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
        boxShadow: '0 8px 25px rgba(255, 107, 107, 0.2)',
        background: '#FF6B6B',
        color: 'white'
      };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`wedding-button ${variant} ${size} ${className}`}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
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