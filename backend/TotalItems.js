import React, { useEffect, useState } from 'react';
import { Route53Client, ListHostedZonesCommand } from "@aws-sdk/client-route-53";
import AWS from 'aws-sdk';

const TotalItems = () => {
    const [hostedZones, setHostedZones] = useState([]);

    useEffect(() => {
        const config = new AWS.Config({
            accessKeyId: 'AKIAW3MEB5SWYPHMRX53',
            secretAccessKey: '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',
            region: 'ap-south-1'
        });
        const client = new Route53Client(config);

        const input = {
            MaxItems: Number("10")
        };

        const sendCmd = async () => {
            try {
                const command = new ListHostedZonesCommand(input);
                const data = await client.send(command);
                setHostedZones(data.HostedZones || []);
            } catch (e) {
                console.log(e);
            }
        };

        sendCmd();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Route 53 Hosted Zones</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Caller Reference</th>
                        <th>Resource Record Set Count</th>
                    </tr>
                </thead>
                <tbody>
                    {hostedZones.map((zone, index) => (
                        <tr key={index}>
                            <td>{zone.Id}</td>
                            <td>{zone.Name}</td>
                            <td>{zone.CallerReference}</td>
                            <td>{zone.ResourceRecordSetCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TotalItems;


