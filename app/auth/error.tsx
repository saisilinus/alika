// pages/auth/error.js

type Props = {
  error: string;
};
export default function AuthErrorPage({ error }: Props) {
  return (
    <div>
      <h1>Authentication Error</h1>
      <p>Error: {error}</p>
      {error === "OAuthAccountNotLinked" && (
        <p>
          You signed up using a different login method. Try signing in with that
          provider.
        </p>
      )}
    </div>
  );
}
