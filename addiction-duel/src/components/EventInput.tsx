import React, { useState, FormEvent } from 'react';
import { TextField, Button, Stack, Container } from '@mui/material';
import { getEvent } from '../api';
import { Event } from '../model';
import { getId } from '../utils';

const EventInputComponent: React.FC<{ onEventJoin: (event: Event) => void }> = ({ onEventJoin }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const eventId = parseInt(inputValue, 10);
        if (isNaN(eventId)) {
            alert('Please enter a valid integer');
            return;
        }

        try {
            const user_id = await getId();
            const response = await fetch('http://localhost:8000/add-participant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ event_id: eventId, user_id: user_id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let newEvent = await getEvent(eventId);

            // alert('Joined the event successfully!');
            if (onEventJoin) {
                onEventJoin(newEvent);
            }
        } catch (error) {
            console.error('There was an error while joining the event:', error);
        }
    };

    return <Container maxWidth="sm">
        <Stack direction="column" spacing={2}>
            <TextField type="number" label="Event ID" onChange={handleInputChange} fullWidth InputProps={{ inputProps: { min: 0 } }} />
            <Button onClick={(e) => handleSubmit(e)}> Join event</Button>
        </Stack>
    </Container>
};

export default EventInputComponent;
