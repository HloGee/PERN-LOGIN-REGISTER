import React,{ useState} from "react";
import {User, Mail, Settings, ShieldCheck, Cookie, ChevronRight} from "lucide-react";

const Home = ({ user, error, openAuthModal }) => {
const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="min-h-[80vh] bg-slate-50 p-4 sm:p-6 lg:p-8">
      {error && <p className="text-red-500">{error}</p>}

      {user ? (
        <div className="mx-auto flex w-full max-w-7xl gap-6">

          {/* Left Dashboard Menu */}
          <aside className="hidden w-64 shrink-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-md md:block">

            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Dashboard
              </p>

              <h3 className="mt-1 text-lg font-bold text-slate-900">
                Quick Actions
              </h3>
            </div>

            <div className="space-y-2">

              {/* Profile */}
              <button
                type="button"
                onClick={() => setActiveSection("profile")}
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-all duration-200 ${
                  activeSection === "profile"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}              >
                <User
                  size={19}
                  strokeWidth={2}
                />

                <span className="flex-1">
                  Profile
                </span>

                <ChevronRight
                  size={17}
                  className="opacity-60 transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={() => setActiveSection("settings")}
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-all duration-200 ${
                  activeSection === "settings"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}              
                >
                <Settings
                  size={19}
                  strokeWidth={2}
                />

                <span className="flex-1">
                  Settings
                </span>

                <ChevronRight
                  size={17}
                  className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-60"
                />
              </button>

              {/* Security */}
              <button
                type="button"
                onClick={() => setActiveSection("security")}
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-all duration-200 ${
                  activeSection === "security"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}            
                >
                <ShieldCheck
                  size={19}
                  strokeWidth={2}
                />

                <span className="flex-1">
                  Security
                </span>

                <ChevronRight
                  size={17}
                  className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-60"
                />
              </button>

              {/* Cookies */}
              <button
                type="button"
                onClick={() => setActiveSection("cookies")}
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-all duration-200 ${
                  activeSection === "cookies"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}             
               >
                <Cookie
                  size={19}
                  strokeWidth={2}
                />

                <span className="flex-1">
                  Manage Cookies
                </span>

                <ChevronRight
                  size={17}
                  className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-60"
                />
              </button>

            </div>
          </aside>

          {/* Dashboard Content */}
          <main className="min-w-0 flex-1">

  {activeSection === "profile" && (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-medium text-blue-600">
            Dashboard
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Welcome, {user.name}! 👋
          </h2>

          <p className="mt-2 text-slate-500">
            Welcome back. Here's an overview of your account.
          </p>
        </div>

        <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
          <User
            size={30}
            strokeWidth={1.8}
          />
        </div>

      </div>

      {/* Account Information */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
              <User size={19} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Full Name
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {user.name}
              </p>
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
          <Mail size={19} />
        </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email Address
              </p>

              <p className="mt-1 truncate font-semibold text-slate-800">
                {user.email}
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  )}

  {activeSection === "settings" && (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        Settings
      </h2>

      <p className="mt-2 text-slate-500">
        Manage your account preferences.
      </p>

      <div className="mt-8 space-y-4">

        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800">
            Account Settings
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Manage your personal account preferences.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800">
            Notifications
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Notification preferences will be available here.
          </p>
        </div>

      </div>

    </div>
  )}

  {activeSection === "security" && (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        Security
      </h2>

      <p className="mt-2 text-slate-500">
        Manage your account security.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 p-5">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              Account Security
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Password and security options will be managed here.
            </p>
          </div>

        </div>

      </div>

    </div>
  )}

  {activeSection === "cookies" && (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        Manage Cookies
      </h2>

      <p className="mt-2 text-slate-500">
        Control how cookies are used on this website.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 p-5">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Cookie size={24} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              Cookie Preferences
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your cookie preferences can be managed here.
            </p>
          </div>

        </div>

      </div>

    </div>
  )}

</main>

        </div>
      ) : (
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

            <h2 className="mb-6 text-2xl font-bold text-slate-800">
              Please log in or register.
            </h2>

            <div className="flex flex-col gap-4">

              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="w-full rounded-xl bg-blue-600 p-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => openAuthModal("register")}
                className="w-full rounded-xl bg-slate-100 p-3.5 font-semibold text-slate-800 transition hover:bg-slate-200"
              >
                Register Now
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

