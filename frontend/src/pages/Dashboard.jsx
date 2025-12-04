import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Welcome back, {user?.username}! 👋
              </h1>
              <p className="text-slate-600 text-lg">📧 {user?.email}</p>
            </div>

            <button
              onClick={logout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Placeholder for future content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Your Finance Dashboard
          </h2>
          <p className="text-slate-600">
            Transaction features coming soon... 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
