const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors');
const { Route53Client, ListHostedZonesCommand, CreateHostedZoneCommand, GetHostedZoneCommand, DeleteHostedZoneCommand, UpdateHostedZoneCommentCommand } = require("@aws-sdk/client-route-53");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());


const config = new AWS.Config({
   key: 'ADD ACCESS_KEY,SECRET_KEY && REGION' 
});
const client = new Route53Client(config);


app.get('/api/zones', async (req, res) => {
    try {
        const command = new ListHostedZonesCommand({});
        const data = await client.send(command);
        res.json(data);
    } catch (error) {
        console.error('Error listing hosted zones:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/zones', async (req, res) => {
    const { Name, CallerReference } = req.body;
    const input = { Name, CallerReference };
    
    try {
        const command = new CreateHostedZoneCommand(input);
        const data = await client.send(command);
        res.json(data);
    } catch (error) {
        console.error('Error creating hosted zone:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/zones/:id', async (req, res) => {
    const { id } = req.params;
    const input = { Id: id };
    try {
        const command = new GetHostedZoneCommand(input);
        const data = await client.send(command);
        res.json(data);
    } catch (error) {
        console.error('Error getting hosted zone:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.put('/api/zones/:id', async (req, res) => {
    const { id } = req.params;
    const { Comment } = req.body;
    const input = { Id: id, Comment };
    try {
        const command = new UpdateHostedZoneCommentCommand(input);
        const data = await client.send(command);
        res.json(data);
       
    } catch (error) {
        console.error('Error updating hosted zone comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/api/zones/:id', async (req, res) => {
    const { id } = req.params;
    const input = { Id: id };
    try {
        const command = new DeleteHostedZoneCommand(input);
        const data = await client.send(command);
        res.json({ message: 'Hosted zone deleted successfully' });
    } catch (error) {
        console.error('Error deleting hosted zone:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});