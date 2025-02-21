import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/auth.ts";
import { AuthError } from "next-auth";

// SIGNIN_ERROR_URL should be defined somewhere in your project
const SIGNIN_ERROR_URL = "/auth/error";

export default async function SignInPage(props: {
  searchParams: { callbackUrl?: string }
}) {
  // Await the searchParams to satisfy Next.js' requirements.
  const { callbackUrl = "" } = await Promise.resolve(props.searchParams);

  return (
    <div className="flex flex-col gap-2">
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", formData);
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        <label htmlFor="email">
          Email
          <input name="email" id="email" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" id="password" />
        </label>
        <input type="submit" value="Sign In" />
      </form>
      {providerMap.map((provider) => (
        <form
          key={provider.id} // Each child needs a unique key
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: callbackUrl,
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  );
}
