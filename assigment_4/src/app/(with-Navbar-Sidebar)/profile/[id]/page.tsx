import Image from "next/image";

const API_URL = "https://dummyjson.com/users";

export default async function ProfilePage({ params }: { params: { id: string } }) {
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
      {/* Profile Header */}
      <div className="flex items-center gap-6 border-b pb-6 mb-6">
        <img
          src={user.image}
          alt={user.firstName}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-600">{user.company?.title} @ {user.company?.name}</p>
        </div>
      </div>

      {/* Editable Form */}
      <form className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <input defaultValue={user.firstName} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <input defaultValue={user.lastName} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input defaultValue={user.email} type="email" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input defaultValue={user.phone} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input defaultValue={user.username} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Birth Date</label>
          <input defaultValue={user.birthDate} type="date" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input defaultValue={user.address?.address} />
        </div>

        <div>
          <label className="block mb-1 font-medium">University</label>
          <input defaultValue={user.university} />
        </div>
      </form>
    </div>
  );
}
