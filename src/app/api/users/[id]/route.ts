// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redis from '../../../../redis';

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: string | null;
};

/**
 * Retrieve a single user.
 * @desc Get a user record from Redis using the provided user id as a query parameter.
 * @response { user: User } 200 - Returns the user object.
 * @response { error: object } 400 - Missing "id" query.
 * @response { error: string } 404 - User not found.
 * @response { error: string } 500 - Error retrieving user.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id || id === 'undefined') {
    return NextResponse.json(
      {
        error: {
          message: 'Missing "id" query',
          code: 'MISSING_ID',
        },
      },
      { status: 400 },
    );
  }

  try {
    const key = `user:${id}`;
    const userData = await redis.get(key);

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let user: User;
    if (typeof userData === 'string') {
      try {
        user = JSON.parse(userData) as User;
      } catch (err) {
        console.error(`Error parsing JSON for key ${key}:`, err);
        return NextResponse.json(
          { error: 'Malformed user data' },
          { status: 500 },
        );
      }
    } else {
      user = userData as User;
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json(
      { error: 'Error retrieving user' },
      { status: 500 },
    );
  }
}
