import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Badge } from '@mui/material';
import BaseURL from '../config/app.config';

const ContactSubmissionsPage = () => {
    const [submissions, setSubmissions] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Fetch contact submissions
    const fetchSubmissions = async () => {
        try {
            const response = await axios.get(`${BaseURL}/contact-submissions`);
            setSubmissions(response.data);
        } catch (error) {
            console.error("Error fetching submissions:", error);
        }
    };

    // Fetch unread count
    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get(`${BaseURL}/contact-submissions/unread-count`);
            setUnreadCount(response.data.unread_count);
        } catch (error) {
            console.error("Error fetching unread count:", error);
        }
    };

    // Mark submission as seen
    const markAsSeen = async (id) => {
        try {
            await axios.patch(`${BaseURL}/contact-submissions/${id}/mark-seen`);
            fetchSubmissions(); // Update the list after marking as seen
            fetchUnreadCount(); // Update the unread count
        } catch (error) {
            console.error("Error marking as seen:", error);
        }
    };

    useEffect(() => {
        fetchSubmissions();
        fetchUnreadCount();
    }, []);

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Contact Submissions
            </Typography>
            <Badge badgeContent={unreadCount} color="primary" style={{ marginBottom: '1rem' }}>
                <Typography variant="subtitle1">Unread Submissions</Typography>
            </Badge>
            <Grid container spacing={3}>
                {submissions.map((submission) => (
                    <Grid item xs={12} sm={6} md={4} key={submission.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {submission.name}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    {submission.email} | {submission.phone}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
                                    {submission.message}
                                </Typography>
                                <Typography variant="caption" color="primary" style={{ marginTop: '1rem', display: 'block' }}>
                                    {submission.seen ? "Seen" : "Unread"}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {!submission.seen && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => markAsSeen(submission.id)}
                                    >
                                        Mark as Seen
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ContactSubmissionsPage;