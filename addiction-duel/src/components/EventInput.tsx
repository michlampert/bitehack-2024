import React, { useState, FormEvent } from 'react';
import { TextField, Button } from '@mui/material';

const EventInputComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const eventId = parseInt(inputValue, 10);
        if (isNaN(eventId)) {
            alert('Please enter a valid integer');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/add-participant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ event_id: eventId, user_id: 1 }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            alert('Joined the event successfully!');
        } catch (error) {
            console.error('There was an error while joining the event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '300px', margin: 'auto' }}>
            <TextField
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                label="Enter Event ID"
                variant="outlined"
            />
            <Button variant="contained" color="primary" type="submit">
                Join Event
            </Button>
        </form>
    );
};

export default EventInputComponent;