import { Link, useNavigate } from "react-router-dom";
import Header from "../assets/components/header";
import { GrFormView } from "react-icons/gr";
import { useState } from "react";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [Password, setPassword] = useState("");
  const [login, setlogin] = useState("");
  const navigate = useNavigate();

  const handleLoginIN = (e) => {
    e.preventDefault();
    const storeuser = JSON.parse(localStorage.getItem("users") || []);
    const matchedUser = storeuser.find(
      (user) => user.login === login && user.password === Password
    );

    if (matchedUser) {
      alert("Zalogowano!");
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      navigate("/");
    } else {
      alert("Błędny login lub hasło");
    }
  };

  return (
    <>
      <div className="w-full h-[8%] flex justify-center items-center bg-black ">
        <Header />
      </div>
      <div className="w-full bg-white h-[92%] flex justify-center items-center">
        <form action="">
          <div className=" shadow-md rounded px-8 py-6 w-96 ">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Zaloguj się
            </h2>
            <input
              type="text"
              placeholder="Login"
              className="w-full mb-2 px-4 py-2 border rounded"
              value={login}
              onChange={(e) => setlogin(e.target.value)}
            />

            <div className="relative w-full">
              <input
                id="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Hasło"
                className="w-full mb-2 px-4 py-2 border rounded pr-10"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-[14px] right-3  cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {Password.length > 0 && <GrFormView />}
              </div>
            </div>
            <button
              className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2 ${
                login.length > 0 && Password.length > 0
                  ? "opacity-100 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!(login.length > 0 && Password.length > 0)}
              type="submit"
              onClick={handleLoginIN}
            >
              Zaloguj
            </button>
            <div>
              <Link to={"/"}>
                <button className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400">
                  Anuluj
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
