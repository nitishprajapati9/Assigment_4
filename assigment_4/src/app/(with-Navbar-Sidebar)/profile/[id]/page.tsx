import Image from "next/image";

const API_URL = "https://dummyjson.com/users";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`${API_URL}/${params.id}`, {
    cache: "no-store", // ✅ Force SSR
  });

  if (!res.ok) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg">
        No Profile Found!
      </div>
    );
  }

  const user = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-6 pb-6 mb-8">
        <img
          src={user.image}
          alt={user.firstName}
          width={80}
          height={80}
          className="rounded-full shadow-lg ring-4 ring-blue-100"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-600 italic">
            {user.company?.title} @ {user.company?.name}
          </p>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-xl p-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            First Name
          </label>
          <input
            defaultValue={user.firstName}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Last Name
          </label>
          <input
            defaultValue={user.lastName}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            defaultValue={user.email}
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Phone
          </label>
          <input
            defaultValue={user.phone}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Username
          </label>
          <input
            defaultValue={user.username}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>



        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Address
          </label>
          <input
            defaultValue={user.address?.address}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            University
          </label>
          <input
            defaultValue={user.university}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
