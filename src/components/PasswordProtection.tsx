'use client';

import React, { useState, useEffect } from 'react';

const PasswordProtection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('wedding_auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Hash function for password
  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const hashedPassword = await hashPassword(password);
      const expectedHash = process.env.NEXT_PUBLIC_SITE_PASSWORD_HASH;

      if (hashedPassword === expectedHash) {
        setIsAuthenticated(true);
        localStorage.setItem('wedding_auth', 'authenticated');
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (err) {
      console.error('Password verification error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#faf9f6'
      }}>
        <div style={{
          fontSize: '1.5rem',
          color: '#666',
          fontFamily: 'Instrument Sans, sans-serif'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#F0E9E1',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontFamily: 'Cardo, serif',
              fontSize: '2.5rem',
              color: '#2c3e50',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}>
              Joel & Stephanie
            </h1>
            <p style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '1.1rem',
              color: '#666',
              marginBottom: '2rem'
            }}>
              Wedding Website
            </p>
            <p style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.95rem',
              color: '#888'
            }}>
              Please enter the password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontFamily: 'Instrument Sans, sans-serif',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FF6B6B';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                }}
              />
            </div>

            {error && (
              <div style={{
                color: '#e74c3c',
                fontSize: '0.9rem',
                marginBottom: '1rem',
                textAlign: 'center',
                fontFamily: 'Instrument Sans, sans-serif'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: '#FF6B6B',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                fontFamily: 'Instrument Sans, sans-serif',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
              }}
            >
              Enter Site
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: '#999',
            fontFamily: 'Instrument Sans, sans-serif'
          }}>
            <p>If you need the password, please contact Steph 0426875301 or Joel 0497091831</p>
          </div>
        </div>
      </div>
    );
  }

  // Show the actual site content if authenticated
  return <>{children}</>;
};

export default PasswordProtection;