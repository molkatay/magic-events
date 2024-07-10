import { KafkaClient, Producer, Consumer } from 'kafka-node';

const client = new KafkaClient({ kafkaHost: 'kafka:9092' });

const producer = new Producer(client);
producer.on('ready', () => {
console.log('Kafka Producer is connected and ready.');
});
producer.on('error', (err) => {
console.error('Kafka Producer error:', err);
});

const consumer = new Consumer(
client,
[{ topic: 'messages', partition: 0 }],
{ autoCommit: true }
);
consumer.on('message', (message) => {
console.log('Received message:', message);
});
consumer.on('error', (err) => {
console.error('Kafka Consumer error:', err);
});

export { producer, consumer };
