'use client';

import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <ChatWindow />
      </div>
    </div>
  );
}
