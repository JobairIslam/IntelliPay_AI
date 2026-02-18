'use client';

import { Bot } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div
        className="message-animate"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '16px',
        }}
      >
        <div style={{ maxWidth: '70%' }}>
          <div
            style={{
              background: 'var(--message-user-bg)',
              borderRadius: '18px 18px 4px 18px',
              padding: '12px 16px',
            }}
          >
            <p
              style={{
                color: 'white',
                fontSize: '14px',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
              }}
            >
              {message.content}
            </p>
          </div>
          <div
            style={{
              textAlign: 'right',
              marginTop: '4px',
              color: 'var(--text-muted)',
              fontSize: '11px',
            }}
          >
            {new Date(message.timestamp).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="message-animate"
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
      <div style={{ maxWidth: '75%' }}>
        <div
          style={{
            background: message.isError
              ? 'rgba(239, 68, 68, 0.1)'
              : 'var(--message-ai-bg)',
            border: `1px solid ${
              message.isError ? 'var(--danger)' : 'var(--border-color)'
            }`,
            borderRadius: '18px 18px 18px 4px',
            padding: '14px 16px',
          }}
        >
          <p
            style={{
              color: 'var(--text-primary)',
              fontSize: '14px',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
            }}
          >
            {message.content}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '4px',
            color: 'var(--text-muted)',
            fontSize: '11px',
          }}
        >
          <span>
            {new Date(message.timestamp).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </span>
          <span>•</span>
          <span>Claude AI</span>
        </div>
      </div>
    </div>
  );
}
