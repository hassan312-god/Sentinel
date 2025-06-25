import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket = null;

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      socket = io('http://localhost:5000', {
        transports: ['websocket'],
        autoConnect: true,
      });

      socket.on('connect', () => {
        setIsConnected(true);
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
      });

      socket.on('voice_response', (data) => {
      });

      socket.on('command_executed', (data) => {
      });

      socket.on('error', (error) => {
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  const sendVoiceCommand = (command) => {
    if (socket && isConnected) {
      socket.emit('voice_command', { command });
    }
  };

  const executeQuickAction = (action) => {
    if (socket && isConnected) {
      socket.emit('quick_action', { action });
    }
  };

  return {
    socket,
    isConnected,
    sendVoiceCommand,
    executeQuickAction,
  };
}; 