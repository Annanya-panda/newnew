
var AWS = require("aws-sdk");
const { Route53Client, ListHostedZonesCommand } = require("@aws-sdk/client-route-53"); 
const config = new AWS.Config({
  accessKeyId: 'AKIA6GBMA75G62PUKXUP',
  secretAccessKey: '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',
  region: 'ap-south-1'
});
const client = new Route53Client(config);
const input = { 
  MaxItems: Number("1"),
  HostedZoneType: "PrivateHostedZone",
};

try{
    console.log(">>>>>>>>>>>>")
    const response = sendCmd();
    console.log(response);
}catch(e) {
    console.log(e);
}

async function sendCmd(){
    const command = new ListHostedZonesCommand(input);
    await client.send(command);
}

// { // ListHostedZonesResponse
//   HostedZones: [ // HostedZones // required
//     { // HostedZone
//       Id: "STRING_VALUE", // required
//       Name: "STRING_VALUE", // required
//       CallerReference: "STRING_VALUE", // required
//       Config: { // HostedZoneConfig
//         Comment: "STRING_VALUE",
//         PrivateZone: true || false,
//       },
//       ResourceRecordSetCount: Number("long"),
//       LinkedService: { // LinkedService
//         ServicePrincipal: "STRING_VALUE",
//         Description: "STRING_VALUE",
//       },
//     },
//   ],
//   Marker: "STRING_VALUE", // required
//   IsTruncated: true || false, // required
//   NextMarker: "STRING_VALUE",
//   MaxItems: Number("int"), // required
// };
