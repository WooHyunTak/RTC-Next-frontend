import Button from "./Button";
import { useRouter } from "next/navigation";
import useAuth from "@/app/context/AuthContext";

function Header() {
  const router = useRouter();
  const { user, logout } = useAuth(false);
  const handleLogin = () => {
    router.push("/users/login");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex bg-blue-500 text-white justify-between items-center p-2">
      <div className="flex items-center">
        <label className="text-2xl font-bold">RTC-Django-chat</label>
      </div>
      <div className="flex">
        {user ? (
          <div className="flex items-center gap-2">
            <label className="text-lg font-medium text-white">
              {user.name}
            </label>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="secondary" size="sm" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
