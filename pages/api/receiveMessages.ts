import { NextApiRequest, NextApiResponse } from 'next';
import { consumer } from '../../config/kafka';

export default (req: NextApiRequest, res: NextApiResponse) => {
if (req.method === 'GET') {
consumer.on('message', (message) => {
res.status(200).json({ message });
});
} else {
res.status(405).json({ error: 'Method not allowed' });
}
};
