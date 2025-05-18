import Button from "./button";
import { useRouter } from "next/navigation";
import useAuth from "@/app/context/authContext";

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
    <div className="flex h-[80px] bg-blue-500 text-white justify-between items-center p-4">
      <div className="flex items-center">
        <label className="text-2xl font-bold">RTC-Django-chat</label>
      </div>
      <div className="flex">
        {user ? (
          <Button variant="secondary" size="small" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="secondary" size="small" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
