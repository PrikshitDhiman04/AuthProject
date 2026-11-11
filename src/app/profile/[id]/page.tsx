import { Suspense } from "react";

type ProfileProps = {
  params: Promise<{ id: string }>;
};

export default function UserProfile({ params }: ProfileProps) {
  return (
    <Suspense
      fallback={<div className="text-center mt-10">Loading profile...</div>}
    >
      <ProfileContent params={params} />
    </Suspense>
  );
}

async function ProfileContent({ params }: ProfileProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center">Profile Page</h1>

        <hr className="my-4 border-gray-300" />

        <p className="text-xl text-center">
          Profile ID:{" "}
          <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
            {id}
          </span>
        </p>
      </div>
    </div>
  );
}
