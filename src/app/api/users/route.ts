// app/api/users/route.ts
import { NextResponse } from 'next/server';
import redis from '../../../redis'; // Adjust the path as needed

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Fetches all users stored in the Redis database.
 *     responses:
 *       200:
 *         description: A list of user objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user ID.
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                       email:
 *                         type: string
 *                         description: The user's email address.
 *       500:
 *         description: Error retrieving users.
 */
export async function GET() {
  try {
    // Retrieve all keys that match the pattern 'user:*'
    const allKeys = await redis.keys('user:*');

    // Filter keys that represent actual user records
    const userKeys = allKeys.filter((key) => /^user:[^:]+$/.test(key));

    // Retrieve and parse the data for each user
    const users = await Promise.all(
      userKeys.map(async (key) => {
        const userData = await redis.get(key);
        // Check if userData is a string; if so, try to parse it. Otherwise, assume it's already an object.
        if (typeof userData === 'string') {
          try {
            return JSON.parse(userData);
          } catch (err) {
            // If JSON.parse fails, log the error and return the raw value
            console.error(`Error parsing JSON for key ${key}:`, err);
            return userData;
          }
        }
        return userData;
      }),
    );

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    return NextResponse.json(
      { error: 'Error retrieving users' },
      { status: 500 },
    );
  }
}
