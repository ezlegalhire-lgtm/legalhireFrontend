// FloatingChatButton.tsx
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

export default function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white shadow-2xl hover:shadow-glow hover:scale-110 transition-all z-40 flex items-center justify-center group"
      aria-label="Chat with Legal Assistant"
    >
      <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
    </button>
  );
}