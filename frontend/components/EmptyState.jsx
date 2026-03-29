'use client';

import { BarChart3, TrendingUp, Users, User, FileX } from 'lucide-react';

export default function EmptyState({ onSuggestionClick }) {
  const suggestions = [
    {
      id: 1,
      icon: TrendingUp,
      iconBg: 'rgba(79, 110, 247, 0.15)',
      iconColor: '#4f6ef7',
      question: 'What is the total payment this month?',
    },
    {
      id: 2,
      icon: Users,
      iconBg: 'rgba(124, 90, 247, 0.15)',
      iconColor: '#7c5af7',
      question: 'Show me all marketing team payments',
    },
    {
      id: 3,
      icon: User,
      iconBg: 'rgba(34, 197, 94, 0.15)',
      iconColor: '#22c55e',
      question: 'How much did we pay John Smith?',
    },
    {
      id: 4,
      icon: FileX,
      iconBg: 'rgba(239, 68, 68, 0.15)',
      iconColor: '#ef4444',
      question: 'List all unpaid invoices',
    },
  ];

  return (
    <div
      className="empty-state"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '22px',
        height: '100%',
      }}
    >
      {/* Top Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '11px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '11px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BarChart3 size={25} color="white" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              color: 'var(--text-primary)',
              fontSize: '15px',
              fontWeight: '700',
              marginBottom: '6px',
            }}
          >
            Ask about any invoice or payment
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '10px',
              maxWidth: '280px',
            }}
          >
            I have access to your complete invoice database. Ask me anything.
          </p>
        </div>
      </div>

      {/* Suggestion Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
          maxWidth: '392px',
          width: '100%',
        }}
      >
        {suggestions.map((suggestion) => {
          const IconComponent = suggestion.icon;
          return (
            <div
              key={suggestion.id}
              onClick={() => onSuggestionClick(suggestion.question)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '11px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
                e.currentTarget.style.background = 'var(--bg-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  background: suggestion.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconComponent size={11} color={suggestion.iconColor} />
              </div>
              <div
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '9px',
                  fontWeight: '500',
                  marginTop: '8px',
                  lineHeight: '1.4',
                }}
              >
                {suggestion.question}
              </div>
              <div
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '8px',
                  marginTop: '3px',
                }}
              >
                Tap to ask →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
