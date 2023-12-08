import { Link, NavLink } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import { AiOutlineMenuUnfold, AiFillCloseCircle } from "react-icons/ai";
import { IoIosCart } from "react-icons/io";

import { FiLogOut } from "react-icons/fi";
import { BiSolidUserAccount } from "react-icons/bi";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";

const Navbar = () => {
  const { user, signout } = useAuthContext();
  const { themeChaged, mode } = useTheme();
  const [isActive, setIsActive] = useState(true);

  const handleSignOut = () => {
    signout()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error.message));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/register"}>Register</NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>Login</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/cart"}>
          <button className="btn">
            <IoIosCart />
            <div className="badge badge-secondary">+0</div>
          </button>
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <nav className="w-full  fixed z-10 bg-slate-300 dark:bg-slate-900">
        <div className="w-full flex  gap-5  items-center justify-between container  mx-auto p-2">
          {/* menubar */}
          <div
            onClick={() => setIsActive(!isActive)}
            className={`dropdown lg:hidden `}
          >
            <label tabIndex={0}>
              {isActive ? (
                <AiOutlineMenuUnfold className="text-3xl dark:text-gray-400" />
              ) : (
                <AiFillCloseCircle className="text-3xl dark:text-gray-400" />
              )}
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm  text-white  dropdown-content  mt-3 z-[1] pt-2 w-52`}
            >
              <div
                className={
                  isActive
                    ? "hidden"
                    : "block bg-gradient-to-r from-gray-700 via-gray-900 p-3 to-black  rounded-lg "
                }
              >
                {navLinks}
              </div>
            </ul>
          </div>

          <Link to={"/"} className="flex items-center">
            <h2 className="text-xl font-bold">Bistro Boss Resturant</h2>
          </Link>

          {/* dark mode */}
          <div>
            <button
              onClick={themeChaged}
              className="btn rounded-md btn-outline border-1 border-gray-400 btn-sm"
            >
              {mode === "light" ? (
                <a
                  className="hs-dark-mode-active:hidden   hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500"
                  href="#!"
                  data-hs-theme-click-value="dark"
                >
                  <svg
                    className="w-4 h-4 text-gray-400text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                  </svg>
                </a>
              ) : (
                <a
                  className="hs-dark-mode-active:block  hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500"
                  href="#!"
                  data-hs-theme-click-value="light"
                >
                  <svg
                    className="w-4 h-4 text-gray-50 t font-bold"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                  </svg>
                </a>
              )}
            </button>
          </div>

          <div className="flex items-center md:order-2">
            <div>
              {user ? (
                <details className="dropdown dropdown-end">
                  <summary
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </summary>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 rounded  shadow-md  bg-gradient-to-r from-gray-700 via-gray-900 to-black w-60"
                  >
                    <li className="font-bold flex justify-center items-center">
                      <div>
                        <img
                          className="rounded-full h-16 w-16"
                          src={user?.photoURL}
                        />
                      </div>
                    </li>
                    <li className="font-bold">
                      <a className=" hover:bg-gray-400 text-gray-300  hover:rounded">
                        <BiSolidUserAccount className="text-lg " />
                        {user?.displayName}
                      </a>
                    </li>

                    <li onClick={handleSignOut}>
                      <a className=" text-[0.97rem]  text-blue-500 font-bold hover:bg-gray-400 hover:rounded">
                        <FiLogOut className="text-lg" /> Logout
                      </a>
                    </li>
                  </ul>
                </details>
              ) : (
                <div className="animate-bounce  h-5 w-20 ">
                  <Link to={"/login"}>
                    <button className=" text-gray-200 border-none btn btn-sm h-10 -mt-2  bg-gradient-to-br from-blue-400 to-blue-600  rounded-xl shadow-2xl   absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                      Login
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col items-center font-medium dark:text-gray-300 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:hidden lg:flex  lg:flex-row md:space-x-8 md:mt-0 md:border-0  dark:border-gray-700">
              {navLinks}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
