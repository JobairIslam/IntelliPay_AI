'use client';

import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '16px',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Bot size={16} color="white" />
      </div>
      <div>
        <div
          style={{
            background: 'var(--message-ai-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '18px 18px 18px 4px',
            padding: '14px 16px',
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-blue)',
                animation: 'typingBounce 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: '4px',
            color: 'var(--text-muted)',
            fontSize: '11px',
            fontStyle: 'italic',
          }}
        >
          Fetching from database...
        </div>
      </div>
    </div>
  );
}
