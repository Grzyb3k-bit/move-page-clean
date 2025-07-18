import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "../assets/components/header";
import userIcon from "../assets/img/user.png";
import menuIcon from "../assets/img/menu.png";
import domino from "../assets/img/zdj.jpg";
import FilmData from "../assets/components/FIlmData";

const Account = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [liczba, setLiczba] = useState(0);
  const [mostWatched, setMostWatched] = useState({});
  const [lastWatchedTitle, setLastWatchedTitle] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const nickname = currentUser?.nick;

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));

    if (userData && userData.stats) {
      setLiczba(userData.stats.filmsWatched);
      setMostWatched({
        title: userData.stats.mostWatchedTitle,
        creator: userData.stats.mostWatchedCreator,
      });
      setLastWatchedTitle(userData.stats.lastWatchedTitle);
    } else if (userData) {
      const randomFilmsWatched = getRandomInt(100);
      const randomFilm = FilmData[Math.floor(Math.random() * FilmData.length)];
      const randomFilm1 = FilmData[Math.floor(Math.random() * FilmData.length)];

      const stats = {
        filmsWatched: randomFilmsWatched,
        minutesWatched: randomFilmsWatched * 90,
        mostWatchedTitle: randomFilm.title,
        mostWatchedCreator: randomFilm.creator,
        lastWatchedTitle: randomFilm1.title,
      };

      const updatedUser = { ...userData, stats };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setLiczba(stats.filmsWatched);
      setMostWatched({
        title: stats.mostWatchedTitle,
        creator: stats.mostWatchedCreator,
      });
      setLastWatchedTitle(stats.lastWatchedTitle);
    }
  }, []);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setIsLoggedIn(!!currentUser);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setActiveMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setShowAccountMenu(false);
    navigate("/");
  };

  const handleNavigatetoAPP = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="w-full bg-black py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span
            className="text-xl sm:text-2xl font-bold cursor-pointer"
            onClick={handleNavigatetoAPP}
          >
            webflow
          </span>
          <Menu />
        </div>

        {/* User Menu */}
        {isLoggedIn && (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowAccountMenu((prev) => !prev)}
            >
              <img src={userIcon} alt="user" className="w-6 h-6" />
              <span className="pl-2">Moje konto</span>
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

        <button
          className="sm:hidden"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <img src={menuIcon} alt="menu" className="w-6 h-6" />
        </button>
      </header>
      {activeMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setActiveMenu(false)}
          />
          <nav className="fixed top-0 right-0 w-[260px] h-full bg-black text-white z-50 p-4 space-y-4">
            <button className="ml-auto" onClick={() => setActiveMenu(false)}>
              <img src={menuIcon} alt="menu" className="w-6 h-6" />
            </button>
            <p className="cursor-pointer">Showcase</p>
            <p className="cursor-pointer">Designers</p>
            <p className="cursor-pointer">Learn & Support</p>
            <hr className="border-gray-600" />
            <p className="cursor-pointer">Popular</p>
            <p className="cursor-pointer">Recent</p>
            <p className="cursor-pointer">Clonenable</p>
            <hr className="border-gray-600" />
            <div className="flex items-center gap-2">
              <img src={userIcon} alt="user" className="w-6" />
              <button onClick={() => navigate("/account")}>Moje konto</button>
            </div>
            <button onClick={handleLogout}>Wyloguj</button>
          </nav>
        </>
      )}

      <main className="flex flex-col lg:flex-row p-4 gap-4 h-[1000px]">
        <section className="w-full lg:w-1/2 bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-evenly">
          <img
            src={userIcon}
            alt="user icon"
            className=" sm:w-48 sm:h-48 rounded-full mb-4"
          />
          <h2 className="text-2xl sm:text-4xl font-semibold mb-2">
            {nickname}
          </h2>
          <p className="text-lg sm:text-2xl mb-2">
            Obejrzane minuty: <strong>{liczba * 90}</strong>
          </p>
          <p className="text-lg sm:text-2xl mb-2">
            Obejrzane filmy: <strong>{liczba}</strong>
          </p>
          <p className="text-lg sm:text-2xl mb-2">
            Najczęściej oglądany: <strong>{mostWatched.title}</strong>
          </p>
          <p className="text-lg sm:text-2xl">
            Autor: <strong>{mostWatched.creator}</strong>
          </p>
        </section>

        <section className="w-full lg:w-1/2 bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-center">
          <img
            src={domino}
            alt="film"
            className="w-full h-auto max-h-[900px] object-cover rounded mb-4"
          />
          <p className="text-xl sm:text-3xl text-center text-white">
            Ostatnio oglądany film: <strong>{lastWatchedTitle}</strong>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Account;
