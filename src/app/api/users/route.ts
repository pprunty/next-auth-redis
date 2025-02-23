// app/api/users/route.ts
import { NextResponse } from 'next/server';
import redis from '../../../redis'; // Adjust the path as needed

/**
 * User type representing the user schema.
 */
type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: string | null; // or Date | null if you prefer
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UsersResponse = {
  users: User[]; // list of user objects
};

/**
 * Retrieve all users.
 * @desc Get all user records from Redis.
 * @response { users: any[] }
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
        if (typeof userData === 'string') {
          try {
            return JSON.parse(userData);
          } catch (err) {
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
