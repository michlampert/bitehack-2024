import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';

interface HistoryItem {
    id: number;
    url: string;
}

const getFaviconUrl = (url: string): string => {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}`;
};

const HistoryList: React.FC<{ historyItems: HistoryItem[] }> = ({ historyItems }) => {
    return (
        <List>
            {historyItems.map((item) => (
                <ListItem key={item.id}>
                    <ListItemIcon>
                        <Avatar alt="Site Icon" src={getFaviconUrl(item.url)} />
                    </ListItemIcon>
                    <ListItemText primary={item.url} />
                </ListItem>
            ))}
        </List>
    );
};

export default HistoryList;
