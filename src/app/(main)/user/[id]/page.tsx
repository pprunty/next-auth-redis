// src/app/user/[id]/page.tsx
import { auth } from '../../../../auth';
import { fetchUserProfile } from '@/lib/user';

type Params = Promise<{ id: string }>;

interface PageProps {
  params: Params;
}

export default async function UserProfilePage({ params }: PageProps) {
  // Fetch the current session
  const session = await auth();
  const { id } = await params;

  let userProfile;
  try {
    // Try to fetch the user's profile details
    userProfile = await fetchUserProfile(id);
  } catch (error) {
    // If there's an error (e.g. user not found), render a fallback UI
    console.error(error);
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <p>Sorry, we couldn&apos;t find a user with id {id}.</p>
      </div>
    );
  }

  // Determine if the current logged-in user is the owner
  const isOwner = session && session?.user?.id === id;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {/* Always display the user's details */}
      <div className="mb-6">
        <p>
          <strong>Name:</strong> {userProfile.name}
        </p>
        <p>
          <strong>Email:</strong> {userProfile.email}
        </p>
        {/* Add other user details as needed */}
      </div>

      {/* Conditionally show the edit form if the logged-in user is the owner */}
      {isOwner ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Edit Your Profile</h2>
          <form action="/api/users" method="POST">
            <input type="hidden" name="id" value={id} />
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={userProfile.name}
                className="border rounded p-2 w-full"
              />
            </div>
            {/* Add more editable fields as necessary */}
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <p className="text-gray-500">
          You are viewing a public profile. Only the account owner can edit
          these details.
        </p>
      )}
    </div>
  );
}
