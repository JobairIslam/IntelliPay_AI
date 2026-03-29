'use client';

import { Plus, MessageSquare, Receipt, Database, Settings } from 'lucide-react';

export default function Sidebar({ isOpen = true, onClose }) {
  const chatHistory = [
    { id: 1, title: 'Total payments this month', time: '2h ago', active: true },
    { id: 2, title: 'Marketing team expenses', time: '5h ago', active: false },
    { id: 3, title: "John's payment history", time: 'Yesterday', active: false },
    { id: 4, title: 'Unpaid invoices list', time: '2 days ago', active: false },
    { id: 5, title: 'Engineering team budget', time: '3 days ago', active: false },
  ];

  return (
    <aside
      className={`sidebar fixed left-0 top-0 z-40 h-screen shrink-0 flex flex-col border-r border-[var(--border-color)] bg-[var(--bg-secondary)] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: 'var(--sidebar-width)' }}
    >
      {/* Logo Area */}
      <div className="sidebar-logo-block sidebar-block-padding" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <div
            className="sidebar-logo-icon"
            style={{
              width: '40px',
              height: '40px',
              background: 'var(--accent-gradient)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Receipt size={20} color="white" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <div className="sidebar-logo-title" style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: '700' }}>
              Invoice AI
            </div>
            <div className="sidebar-logo-sub" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
              Finance Assistant
            </div>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="sidebar-new-chat-wrap" style={{ margin: '0 16px 16px' }}>
        <button
          type="button"
          className="sidebar-btn"
          style={{
            width: '100%',
            height: '40px',
            background: 'var(--accent-gradient)',
            borderRadius: '10px',
            border: 'none',
            color: 'white',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.filter = 'brightness(1.1)')}
          onMouseLeave={(e) => (e.target.style.filter = 'brightness(1)')}
          onClick={onClose}
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border-color)', margin: '0 16px 12px' }} />
      <div className="sidebar-section-label" style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', padding: '0 16px 12px' }}>
        Recent Chats
      </div>

      {/* Chat History */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '0 8px', minWidth: 0 }}>
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            role="button"
            tabIndex={0}
            className="sidebar-chat-item"
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              background: chat.active ? 'var(--bg-hover)' : 'transparent',
              borderLeft: chat.active ? '2px solid var(--accent-blue)' : '2px solid transparent',
              marginBottom: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { if (!chat.active) e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={(e) => { if (!chat.active) e.currentTarget.style.background = 'transparent'; }}
            onClick={onClose}
            onKeyDown={(e) => e.key === 'Enter' && onClose?.()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <MessageSquare size={14} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                <div className="sidebar-chat-title" style={{ color: 'var(--text-primary)', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {chat.title}
                </div>
                <div className="sidebar-chat-time" style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>
                  {chat.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Card */}
      <div className="sidebar-status-card" style={{ margin: '16px', marginBottom: '8px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', flexShrink: 0 }} />
            <span className="sidebar-status-text" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>AI Connected</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={12} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            <span className="sidebar-status-sub" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Google Sheets</span>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="sidebar-footer" style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '13px',
            fontWeight: '600',
            flexShrink: 0,
          }}
        >
          CO
        </div>
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <div className="sidebar-user-name" style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Jobair Islam
          </div>
          <div className="sidebar-user-role" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Admin</div>
        </div>
        <Settings size={16} color="var(--text-muted)" style={{ cursor: 'pointer', flexShrink: 0 }} />
      </div>
    </aside>
  );
}
