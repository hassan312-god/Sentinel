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
        console.log('Connected to Python backend');
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from Python backend');
      });

      socket.on('voice_response', (data) => {
        console.log('Voice response received:', data);
      });

      socket.on('command_executed', (data) => {
        console.log('Command executed:', data);
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
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