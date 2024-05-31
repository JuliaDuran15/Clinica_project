import React, { useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const NotificationListener = ({ userId }) => {
    useEffect(() => {
        const echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.MIX_PUSHER_APP_KEY,
            cluster: process.env.MIX_PUSHER_APP_CLUSTER,
            forceTLS: true,
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
