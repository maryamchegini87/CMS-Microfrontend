import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    navigate("/posts");
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-80 flex flex-col gap-4 justify-center items-center">
      <CircleUserRound  fontSize={50}/>
      <h2 className="text-xl font-semibold ">ورود</h2>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        ورود
      </button>
    </div>
  );
}
