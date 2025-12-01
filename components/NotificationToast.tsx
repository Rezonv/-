
import React, { useEffect, useState } from 'react';
import { AppNotification } from '../types';

interface Props {
  notifications: AppNotification[];
  onClose: (id: string) => void;
}

const NotificationToast: React.FC<Props> = ({ notifications, onClose }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      {notifications.map((note) => (
        <div 
          key={note.id} 
          className="pointer-events-auto w-80 bg-gray-800/90 backdrop-blur-md border border-pink-500/50 shadow-2xl rounded-xl overflow-hidden animate-slide-in-right hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={() => {
            if (note.onClick) note.onClick();
            onClose(note.id);
          }}
        >
          <div className="p-4 relative">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(note.id); }}
              className="absolute top-2 right-2 text-gray-400 hover:text-white p-1"
            >
              ✕
            </button>
            <div className="flex items-start gap-3">
               <div className="text-2xl bg-pink-900/50 rounded-lg p-2">📢</div>
               <div>
                  <h4 className="font-bold text-white text-sm mb-1">{note.title}</h4>
                  <p className="text-gray-300 text-xs leading-relaxed">{note.message}</p>
               </div>
            </div>
            <div className="mt-3 flex justify-end">
               <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">點擊查看 →</span>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-pink-600 to-purple-600 w-full animate-shrink-width"></div>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
