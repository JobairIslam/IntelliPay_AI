'use client';

import { useState, useRef, useEffect } from 'react';
import { Brain, Database } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
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
      {/* Header Bar - compact and wrap-friendly on small screens */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4"
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="min-w-0 flex-1">
          <h1
            className="text-sm font-bold leading-tight sm:text-[15px] md:text-[17px]"
            style={{ color: 'var(--text-primary)', marginBottom: '2px' }}
          >
            Invoice Query Assistant
          </h1>
          <p className="text-[10px] sm:text-[11px] md:text-xs" style={{ color: 'var(--text-muted)' }}>
            Ask anything about payments, invoices & teams
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-1.5 sm:gap-2">
          <SignedOut>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <SignInButton mode="modal">
                <button
                  className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-[11px]"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--accent-blue)' }}
                >
                  <Brain size={10} color="var(--accent-blue)" />
                  <span>Sign In</span>
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-[11px]"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--accent-blue)' }}
                >
                  <Database size={10} color="var(--accent-blue)" />
                  <span>Sign Up</span>
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'h-7 w-7 sm:h-8 sm:w-8',
                },
              }}
            />
          </SignedIn>
          <div
            className="h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5"
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
