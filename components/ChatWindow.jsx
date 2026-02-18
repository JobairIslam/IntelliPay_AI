'use client';

import { useState, useRef, useEffect } from 'react';
import { Brain, Database } from 'lucide-react';
import EmptyState from './EmptyState';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import InputBar from './InputBar';
import { askInvoiceAgent } from '@/lib/api';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messageAreaRef = useRef(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const question = input.trim();
    setInput('');

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: 'user',
        content: question,
        timestamp: new Date(),
      },
    ]);

    setIsLoading(true);

    try {
      const answer = await askInvoiceAgent(question);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          content: answer,
          timestamp: new Date(),
        },
      ]);
      setIsConnected(true);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          content:
            '⚠️ Could not connect to the server. Make sure the backend is running on port 5000.',
          timestamp: new Date(),
          isError: true,
        },
      ]);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
    setTimeout(() => {
      const question = text;
      setInput('');

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: 'user',
          content: question,
          timestamp: new Date(),
        },
      ]);

      setIsLoading(true);

      askInvoiceAgent(question)
        .then((answer) => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              role: 'ai',
              content: answer,
              timestamp: new Date(),
            },
          ]);
          setIsConnected(true);
        })
        .catch(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              role: 'ai',
              content:
                '⚠️ Could not connect to the server. Make sure the backend is running on port 5000.',
              timestamp: new Date(),
              isError: true,
            },
          ]);
          setIsConnected(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 0);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1
            style={{
              color: 'var(--text-primary)',
              fontSize: '17px',
              fontWeight: '700',
              marginBottom: '2px',
            }}
          >
            Invoice Query Assistant
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            Ask anything about payments, invoices & teams
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Brain size={12} color="var(--accent-blue)" />
            <span style={{ color: 'var(--accent-blue)', fontSize: '11px', fontWeight: '500' }}>
              Claude AI
            </span>
          </div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Database size={12} color="var(--accent-blue)" />
            <span style={{ color: 'var(--accent-blue)', fontSize: '11px', fontWeight: '500' }}>
              Sheets DB
            </span>
          </div>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: isConnected ? 'var(--success)' : 'var(--danger)',
            }}
          />
        </div>
      </div>

      {/* Message Area */}
      <div
        ref={messageAreaRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
        }}
      >
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </>
        )}
      </div>

      {/* Input Bar */}
      <InputBar input={input} setInput={setInput} onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
