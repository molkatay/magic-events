import { NextApiRequest, NextApiResponse } from 'next';
import { producer } from '../../config/kafka';

export default (req: NextApiRequest, res: NextApiResponse) => {
if (req.method === 'POST') {
const { user, message } = req.body;

const payloads = [
{
topic: 'messages',
messages: JSON.stringify({ user, message, timestamp: new Date() }),
},
];

producer.send(payloads, (err, data) => {
if (err) {
res.status(500).json({ error: 'Error sending message' });
} else {
res.status(200).json({ success: true, data });
}
});
} else {
res.status(405).json({ error: 'Method not allowed' });
}
};
