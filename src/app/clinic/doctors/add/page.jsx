// app/clinic/doctors/add/page.jsx
export default function AddDoctorPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>
      {/* Replace this with actual form */}
      <form className="grid gap-4">
        <input className="border p-2" placeholder="Name" />
        <input className="border p-2" placeholder="Specialty" />
        <input className="border p-2" placeholder="Email" />
        <button className="bg-purple-600 text-white px-4 py-2">Submit</button>
      </form>
    </div>
  );
}
