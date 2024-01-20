import React, { useState, FormEvent } from 'react';

const EventInputComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Assuming the input is an integer
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
                body: JSON.stringify({ challenge_id: eventId, user_id: 1 }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle the response
            const data = await response.json();
            console.log(data);
            alert('Joined the event successfully!');
        } catch (error) {
            console.error('There was an error while joining the event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter Event ID"
            />
            <button type="submit">Join Event</button>
        </form>
    );
};

export default EventInputComponent;