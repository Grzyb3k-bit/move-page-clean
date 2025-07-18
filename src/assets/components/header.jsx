import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import menu from "../img/menu.png";
import user from "../img/user.png";

// Menu (górne)
export const Menu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const menuItems = ["Showcase", "Designers", "Learn & Support"];

  return (
    <ul className="flex flex-row items-center space-x-4 text-white max-[800px]:hidden">
      {menuItems.map((item, index) => (
        <li
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`cursor-pointer ${
            activeIndex === index ? "text-white" : "text-gray-600"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

// Główna nawigacja
const Header = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Sprawdzenie, czy użytkownik jest zalogowany
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setIsLoggedIn(!!user);
  }, []);

  // Obsługa responsywności (zamykanie menu)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setActiveMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => {
    setActiveMenu(false);
  };

  const handleNavigatetoLogin = () => {
    if (location.pathname !== "/login") {
      navigate("/login");
    }
  };

  const handleNavigatetoSingUp = () => {
    if (location.pathname !== "/singup") {
      navigate("/singup");
    }
  };

  const handleNavigatetoAPP = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setShowAccountMenu(false);
    navigate("/");
  };

  return (
    <div className="w-[90%] mx-auto py-4 flex items-center justify-between relative">
      {/* Logo + Menu */}
      <div className="flex items-center space-x-6">
        <div className="text-2xl font-bold text-white">
          <span className="cursor-pointer" onClick={handleNavigatetoAPP}>
            webflow
          </span>
        </div>
        <Menu />
      </div>

      {/* Desktop: Logowanie lub Konto */}
      <div className="hidden min-[800px]:flex items-center text-white ml-auto space-x-4">
        {!isLoggedIn ? (
          <>
            <button onClick={handleNavigatetoLogin}>Log In</button>
            <button
              className="rounded-b-sm bg-[rgb(66,80,240)] p-1.5"
              onClick={handleNavigatetoSingUp}
            >
              Sign up for free
            </button>
          </>
        ) : (
          <div className="relative">
            <div className="flex">
              <img src={user} alt="user" className="w-[24px]" />
              <button
                className="pl-2.5"
                onClick={() => setShowAccountMenu((prev) => !prev)}
              >
                Moje konto
              </button>
            </div>
            {showAccountMenu && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md z-50 min-w-[150px]">
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/account");
                    setShowAccountMenu(false);
                  }}
                >
                  Profil
                </p>
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Wyloguj
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ikona hamburgera (mobile) */}
      <div className="block min-[800px]:hidden ml-auto">
        <button onClick={() => setActiveMenu(!activeMenu)}>
          <img
            src={menu}
            alt="Hamburger_menu"
            className="w-[30px] h-[30px] cursor-pointer"
          />
        </button>
      </div>

      {/* Ciemne tło menu mobilnego */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={handleClose}
        ></div>
      )}

      {/* Menu mobilne */}
      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-black text-white z-50 transform transition-transform duration-300 ${
          activeMenu ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 space-y-4 ">
          <img
            onClick={() => setActiveMenu(false)}
            src={menu}
            alt="Hamburger_menu"
            className="w-[30px] h-[30px] flex cursor-pointer ml-auto"
          />

          <p className="cursor-pointer">Showcase</p>
          <p className="cursor-pointer">Designers</p>
          <p className="cursor-pointer">Learn & Support</p>
          <hr className="border-gray-600" />
          <p className="cursor-pointer">Popular</p>
          <p className="cursor-pointer">Recent</p>
          <p className="cursor-pointer">Clonenable</p>
          <hr className="border-gray-600" />

          {!isLoggedIn ? (
            <>
              <button onClick={handleNavigatetoLogin}>Log In</button>
              <button
                onClick={handleNavigatetoSingUp}
                className="w-full rounded bg-[rgb(66,80,240)] cursor-pointer py-2"
              >
                Sign up for free
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-start items-center h-9">
                <img src={user} alt="user" className="w-[24px]" />
                <button
                  className="cursor-pointer pl-2.5"
                  onClick={() => {
                    navigate("/account");
                    setActiveMenu(false);
                  }}
                >
                  Moje konto
                </button>
              </div>
              <div>
                <button onClick={handleLogout}>Wyloguj</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
