import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuthContext from "../../hooks/useAuthContext";
import { Helmet } from "react-helmet";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { signUp, updateUserProfile, setUser, signInWithGoogle } =
    useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  // handle submit
  const handleRegister = (e) => {
    // stop auto reload
    e.preventDefault();

    // get input field
    const form = e.target;
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, photoUrl, email, password);

    // validation
    if (password.length < 6) {
      return setError("Password must have 6 characters");
    } else if (!/[A-Z]/.test(password)) {
      return setError("Password must have one uppercase characters");
    } else if (!/^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/.test(password)) {
      return setError("Password must have one special characters");
    }

    // reset error
    setError("");

    // signUp
    signUp(email, password)
      .then((result) => {
        const userInfo = result.user;
        console.log(result.user);

        // update profile
        updateUserProfile(userInfo, {
          photoURL: photoUrl,
          displayName: name,
        })
          .then(() => {
            setUser({ ...userInfo, photoURL: photoUrl, displayName: name });
          })
          .catch((error) => {
            setError(error.message);
          });

        // reset form
        form.reset();

        // auto navigate
        navigate(location?.state ? location?.state : "/");

        // succes alert
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => setError(error.message));
  };

  const handleSignWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        // auto navigate
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div data-aos="fade-up" className="py-8 pt-20">
        <div className="flex bg-white rounded-lg shadow-xl border-2 overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:block lg:w-1/2 bg-cover bg-[url('https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1702007463~exp=1702008063~hmac=f6d30f1b54729543d08c56baea987ec0631bde97f9ead60aa9bc95277fe0b758')]"></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl  font-semibold text-gray-700 text-center">
              Register
            </h2>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <a href="#" className="text-md text-center text-gray-500 ">
                Create an account
              </a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            {/* form */}
            <form onSubmit={handleRegister}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  User Name
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  name="name"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Photo URL
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="url"
                  name="photoUrl"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  name="email"
                  required
                />
              </div>

              <div className="mt-4 relative">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <a href="#" className="text-xs text-gray-500">
                    Forget Password?
                  </a>
                </div>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                />
                <span
                  className="absolute bottom-3 right-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BsFillEyeFill className="text-xl" />
                  ) : (
                    <BsFillEyeSlashFill className="text-xl" />
                  )}
                </span>
              </div>

              {error && (
                <span className="text-red-600 font-semibold">{error}</span>
              )}

              <div className="mt-8">
                <button className="bg-[#7F265B] text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                  Sign Up
                </button>
              </div>
            </form>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <a href="#" className="text-xs text-gray-500 uppercase">
                or signIn with google
              </a>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>

            {/* social login */}
            <div className="flex justify-center ">
              <button
                onClick={handleSignWithGoogle}
                className="flex items-center border-2 justify-center mt-4 text-white rounded-lg hover:bg-gray-100"
              >
                <div className="px-2 py-3">
                  <svg className="h-6 w-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                  Sign in with Google
                </h1>
              </button>
            </div>
            <p className="text-md font-bold  text-gray-500 pt-3 text-center dark:text-gray-400">
              Already have an account{" "}
              <Link
                to={"/login"}
                className="font-medium  text-blue-400 text-primary-600 hover:underline dark:text-primary-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
