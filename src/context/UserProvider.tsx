"use client";

import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import useWebSocket, { Events } from "@/hooks/useWebsocket";
import { Queue, QueueStatus } from "@/models/queue";
import { User } from "@/models/user";
import * as QueuesApi from "@/network/api/queue";
import { UserType } from "@/network/api/user";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UserContext {
  enterQueue: (queueCode: string, userId: string) => void;
  startAppointment: (queueCode: string) => void;
  endAppointment: (queueCode: string) => void;
  setQueueReady: (queueCode: string) => void;
  setQueueWaiting: (queueCode: string) => void;
  queues: Queue[];
}

export const UserContext = createContext<UserContext>({
  enterQueue: () => {
    throw Error("UserContext not implemented");
  },
  startAppointment: () => {
    throw Error("UserContext not implemented");
  },
  endAppointment: () => {
    throw Error("UserContext not implemented");
  },
  setQueueReady: () => {
    throw Error("UserContext not implemented");
  },
  setQueueWaiting: () => {
    throw Error("UserContext not implemented");
  },
  queues: [],
});

interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [queues, setQueues] = useState<Queue[]>([]);
  const { user } = useAuthenticatedUser();
  const router = useRouter();
  const { subscribeToEvent, sendMessage, unsubscribeFromEvent } = useWebSocket(
    process.env.NEXT_PUBLIC_BACKEND_URL ?? ""
  );

  const value: UserContext = {
    enterQueue,
    startAppointment,
    endAppointment,
    setQueueReady,
    setQueueWaiting,
    queues,
  };

  useEffect(() => {
    async function getQueuesByUser() {
      if (!user) return;
      try {
        const queues =
          user.userType === UserType.recepcionista
            ? await QueuesApi.getQueuesRecepcionista(user.clinicDocument ?? "")
            : user.userType === UserType.doctor
            ? await QueuesApi.getQueuesDoctor(user._id)
            : await QueuesApi.getQueuesByUser(user._id);
        setQueues(queues);
      } catch (error) {}
    }
    getQueuesByUser();
  }, [user]);

  useEffect(() => {
    queues.forEach((queue) => {
      sendMessage(Events.viewQueue, { queueCode: queue.code });
    });

    const handleStartAppointment = (data: any) => {
      toastAppointmentStarted(data.queueCode);
    };

    const handleQueueStatusChanged = (data: {
      queueCode: string;
      status: QueueStatus;
    }) => {
      setQueues(
        queues.map((queue) =>
          queue.code === data.queueCode
            ? { ...queue, status: data.status }
            : queue
        )
      );
    };

    const handleClearFirstUserInQueue = (data: any) => {
      let emptyUser: User;
      setQueues(
        queues.map((queue) =>
          queue.code === data.queueCode
            ? {
                ...queue,
                status: data.status,
                users: [emptyUser, ...queue.users.slice(1)],
              }
            : queue
        )
      );
    };

    const handleRemoveFirstUserInQueue = (data: any) => {
      let emptyUser: User;
      setQueues(
        queues.map((queue) =>
          queue.code === data.queueCode
            ? {
                ...queue,
                status: data.status,
                users: queue.users.slice(1),
              }
            : queue
        )
      );
    };

    const handleUsersQueueChanged = (data: {
      queueCode: string;
      users: User[];
    }) => {
      setQueues(
        queues.map((queue) =>
          queue.code === data.queueCode
            ? {
                ...queue,
                users: data.users,
              }
            : queue
        )
      );
    };

    const handleUserEnteredQueue = (data: { queue: Queue }) => {
      const queueAlreadyExists = queues.find(
        (queue) => queue._id === queue._id
      );
      if (queueAlreadyExists) {
        setQueues(
          queues.map((queue) =>
            queue._id === data.queue._id ? data.queue : queue
          )
        );
      } else {
        setQueues([...queues, data.queue]);
      }
      router.push(`/queue/${data.queue.code}`);
    };

    const handleUserLeftQueue = (data: { queueCode: string }) => {
      const queueAlreadyExists = queues.find(
        (queue) => queue._id === queue._id
      );
      if (queueAlreadyExists) {
        setQueues(queues.filter((queue) => queue.code !== data.queueCode));
      }
    };

    subscribeToEvent(Events.startAppointment, handleStartAppointment);
    subscribeToEvent(Events.queueStatusChanged, handleQueueStatusChanged);
    subscribeToEvent(Events.clearFirstUserInQueue, handleClearFirstUserInQueue);
    subscribeToEvent(
      Events.removeFirstUserInQueue,
      handleRemoveFirstUserInQueue
    );
    subscribeToEvent(Events.queueUsersChanged, handleUsersQueueChanged);
    if (user?.userType === UserType.patient) {
      subscribeToEvent(Events.userEnteredQueue, handleUserEnteredQueue);
      subscribeToEvent(Events.userLeftQueue, handleUserLeftQueue);
    }

    return () => {
      unsubscribeFromEvent(Events.startAppointment, handleStartAppointment);
      unsubscribeFromEvent(Events.queueStatusChanged, handleQueueStatusChanged);
      unsubscribeFromEvent(
        Events.clearFirstUserInQueue,
        handleClearFirstUserInQueue
      );
      unsubscribeFromEvent(
        Events.removeFirstUserInQueue,
        handleRemoveFirstUserInQueue
      );
      unsubscribeFromEvent(Events.queueUsersChanged, handleUsersQueueChanged);
      if (user?.userType === UserType.patient) {
        unsubscribeFromEvent(Events.userEnteredQueue, handleUserEnteredQueue);
        unsubscribeFromEvent(Events.userLeftQueue, handleUserLeftQueue);
      }
    };
  }, [
    user,
    queues,
    router,
    sendMessage,
    subscribeToEvent,
    unsubscribeFromEvent,
  ]);

  function enterQueue(queueCode: string, userId: string) {
    sendMessage(Events.enterQueue, { queueCode, userId });
  }

  function startAppointment(queueCode: string) {
    sendMessage(Events.startAppointment, { queueCode });
  }

  function endAppointment(queueCode: string) {
    sendMessage(Events.endAppointment, { queueCode });
  }

  function setQueueReady(queueCode: string) {
    sendMessage(Events.setQueueReady, { queueCode });
  }

  function setQueueWaiting(queueCode: string) {
    sendMessage(Events.setQueueWaiting, { queueCode });
  }

  function toastAppointmentStarted(data: any) {
    toast.success(data);
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
