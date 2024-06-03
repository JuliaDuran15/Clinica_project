// src/Components/NotificationListener.jsx
import React, { useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const NotificationListener = ({ userId }) => {
    useEffect(() => {
        const echo = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
            encrypted: true,
        });

        echo.private(`notifications.psicologa.${userId}`)
            .listen('ClientArrived', (e) => {
                console.log('Client arrived: ', e.cliente);
                alert(`O cliente ${e.cliente.nome} chegou.`);
            });

        return () => {
            echo.leaveChannel(`notifications.psicologa.${userId}`);
        };
    }, [userId]);

    return null;
};

export default NotificationListener;
