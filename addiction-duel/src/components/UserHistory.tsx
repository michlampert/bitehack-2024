import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';

interface HistoryItem {
    thumbnail_url: string;
    title: string;
    url: string;
}

const HistoryList: React.FC = () => {
    const [items, setItems] = useState<HistoryItem[]>([]);

    useEffect(() => {
        // Replace with your actual endpoint
        fetch('http://localhost:8000/get-history?user_id=1&event_id=1')
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
                History
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

export default HistoryList;

