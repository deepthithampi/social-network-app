import db from '../config/connection.js';
import { Thought } from '../models/index.js';

async function testThoughtInsertion() {
    try {
        // Establish database connection
        await db();
        console.log('Database connected.');

        // Insert a sample thought
        const thought = await Thought.create({
            thoughtText: 'Testing thought insertion',
            username: 'sandy123',
            reactions: [
                { reactionBody: 'Interesting!', username: 'deepthi123', createdAt: new Date() },
            ],
        });
        console.log('Thought successfully created:', thought);
        process.exit(0);
    } catch (error) {
        console.error('Error creating thought:', error);
        process.exit(1);
    }
}

testThoughtInsertion();