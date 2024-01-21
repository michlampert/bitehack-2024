import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';

interface HistoryItem {
    thumbnail_url: string;
    title: string;
    url: string;
}

interface HistoryListProps {
    id: number;
}

interface UserHistoryListProps {
    id: number;
    userId: number;
    username: string;
}

const UserHistoryList: React.FC<UserHistoryListProps> = ({ id, userId, username }) => {
    const [items, setItems] = useState<HistoryItem[]>([]);

    useEffect(() => {
        // Replace with your actual endpoint
        fetch('http://localhost:8000/get-history?user_id=' + userId + '&event_id=' + id)
            .then(response => response.json())
            .then((data: HistoryItem[]) => {
                setItems(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom sx={{ margin: '20px' }}>
                {`User #${username}`}
            </Typography>
            <List>
                {items.map((item, index) => (
                    <ListItem key={index} alignItems="flex-start" component="a" href={item.url} target="_blank" rel="noopener noreferrer">
                        <ListItemAvatar>
                            <Avatar alt={item.title} src={item.thumbnail_url} />
                        </ListItemAvatar>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

interface User {
    userId: number;
    username: string;
}

const HistoryList: React.FC<HistoryListProps> = ({ id }) => {
    const [eventUsers, setEventUsers] = useState<User[]>([]);

    // Fetch data from your endpoint
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/get-failed-users?event_id=' + id);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEventUsers(data); // Assuming the response is in the format you expect
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();
    }, [id]);
    return (
        <div>
            <Typography variant="h2" gutterBottom sx={{ margin: '20px' }}>
                {`History #${id}`}
            </Typography>
            <div>
                {eventUsers.map(user => (
                    <UserHistoryList id={id} userId={user.userId} username={user.username} />
                ))}
            </div>
        </div>
    );
}

export default HistoryList;

