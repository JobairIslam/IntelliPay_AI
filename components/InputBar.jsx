'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Loader2, Database } from 'lucide-react';

export default function InputBar({ input, setInput, onSend, isLoading }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '24px';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '16px 24px 20px',
      }}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '8px 8px 8px 16px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          transition: 'all 0.2s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-blue)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 110, 247, 0.1)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about invoices, payments, teams..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '14px',
            lineHeight: '1.5',
            resize: 'none',
            minHeight: '24px',
            maxHeight: '120px',
            fontFamily: 'inherit',
          }}
        />
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'var(--bg-hover)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.target.style.background = 'var(--bg-hover)')}
          >
            <Paperclip size={18} color="var(--text-muted)" />
          </button>
          <button
            onClick={onSend}
            disabled={!input.trim() || isLoading}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: input.trim() && !isLoading ? 'var(--accent-gradient)' : 'var(--bg-hover)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (input.trim() && !isLoading) {
                e.target.style.filter = 'brightness(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.filter = 'brightness(1)';
            }}
          >
            {isLoading ? (
              <Loader2 size={18} color="white" style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Send size={18} color={input.trim() ? 'white' : 'var(--text-muted)'} />
            )}
          </button>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '10px',
        }}
      >
        <Database size={12} color="var(--text-muted)" />
        <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
          Invoice AI reads directly from your Google Sheets database
        </span>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
