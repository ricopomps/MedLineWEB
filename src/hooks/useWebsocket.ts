import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export enum Events {
  enterQueue = "ENTER_QUEUE",
  viewQueue = "VIEW_QUEUE",
  queueStatusChanged = "QUEUE_STATUS_CHANGED",
  startAppointment = "START_APPOINTMENT",
  endAppointment = "END_APPOINTMENT",
  setQueueReady = "SET_QUEUE_READY",
  setQueueWaiting = "SET_QUEUE_WAITING",
  clearFirstUserInQueue = "CLEAR_FIRST_USER_IN_QUEUE",
  removeFirstUserInQueue = "REMOVE_FIRST_USER_IN_QUEUE",
  queueUsersChanged = "QUEUE_USER_CHANGED",
  userEnteredQueue = "USER_ENTERED_QUEUE",
  userLeftQueue = "USER_LEFT_QUEUE",
  removeFromQueue = "REMOVE_FROM_QUEUE",
}

interface WebSocketHook {
  sendMessage: (eventName: string, data: any) => void;
  subscribeToEvent: (eventName: string, callback: (data: any) => void) => void;
  unsubscribeFromEvent: (
    eventName: string,
    callback: (data: any) => void
  ) => void;
}

const useWebSocket = (serverUrl: string): WebSocketHook => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [serverUrl]);

  const sendMessage = (eventName: string, data: any) => {
    if (socket) {
      socket.emit(eventName, data);
    }
  };

  const subscribeToEvent = (
    eventName: string,
    callback: (data: any) => void
  ) => {
    if (socket) {
      socket.on(eventName, callback);
    }
  };

  const unsubscribeFromEvent = (
    eventName: string,
    callback: (data: any) => void
  ) => {
    if (socket) {
      socket.off(eventName, callback);
    }
  };

  return { sendMessage, subscribeToEvent, unsubscribeFromEvent };
};

export default useWebSocket;
