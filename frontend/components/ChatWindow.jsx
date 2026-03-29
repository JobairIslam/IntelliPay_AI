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
      {/* Header Bar - more compact on small screens */}
      <div
        className="flex flex-wrap items-center justify-between gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 md:px-6 md:py-4"
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="min-w-0 flex-1">
          <h1
            className="text-xs font-bold leading-tight sm:text-sm md:text-[17px]"
            style={{ color: 'var(--text-primary)', marginBottom: '1px' }}
          >
            Invoice Query Assistant
          </h1>
          <p className="text-[9px] sm:text-[10px] md:text-xs" style={{ color: 'var(--text-muted)' }}>
            Ask anything about payments, invoices & teams
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-1 sm:gap-1.5 md:gap-2 pr-2 sm:pr-4 md:pr-6 pt-0.5 sm:pt-1">
          <div
            className="hidden md:inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-2.5 md:py-1"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <Brain size={10} color="var(--accent-blue)" />
            <span
              className="hidden text-[10px] font-medium sm:inline sm:text-[11px]"
              style={{ color: 'var(--accent-blue)' }}
            >
              Claude AI
            </span>
          </div>
          <div
            className="hidden md:inline-flex items-center gap-1 rounded-full border px-2 py-0.5 sm:px-2.5 sm:py-1"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <Database size={10} color="var(--accent-blue)" />
            <span className="text-[10px] font-medium sm:text-[11px]" style={{ color: 'var(--accent-blue)' }}>Sheets DB</span>
          </div>
          <div
            className="hidden h-2 w-2 shrink-0 rounded-full md:inline-block md:h-2.5 md:w-2.5"
            style={{ background: isConnected ? 'var(--success)' : 'var(--danger)' }}
          />
        </div>
      </div>

      {/* Message Area */}
      <div
        ref={messageAreaRef}
        className="p-3 sm:p-4 md:p-6"
        style={{ flex: 1, overflowY: 'auto' }}
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
