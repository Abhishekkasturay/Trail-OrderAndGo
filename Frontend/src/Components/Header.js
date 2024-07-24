import { useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/userSlice"; // Adjust the path as necessary
import logo from "../../public/logo.jpg"; // Ensure this path is correct

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext); // Use UserContext here
  const cartItems = useSelector((store) => store.cart.items);
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setLoggedInUser(""); // Reset loggedInUser to an empty string
  };

  return (
    <div className="flex justify-between items-center bg-pink-100 shadow-lg px-4 py-2 sm:bg-yellow-50 lg:bg-green-50">
      <div className="flex items-center">
        <img className="w-32" src={logo} alt="Logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex space-x-4 text-lg">
          <li>
            <button className="hover:text-blue-500 text-lg">
              Online Status: <span>{onlineStatus ? "✅" : "🔴"}</span>
            </button>
          </li>
          <li>
            <Link to="/">
              <button className="hover:text-blue-500 text-lg">
                Food Delivery
              </button>
            </Link>
          </li>
          <li>
            <Link to="/railwaybooking">
              <button className="hover:text-blue-500 text-lg">Ticketing</button>
            </Link>
          </li>
          <li>
            <Link to="/TodoList">
              <button className="hover:text-blue-500 text-lg">Notes</button>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <button className="hover:text-blue-500 text-lg">
                Contact Us
              </button>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <button className="hover:text-blue-500 text-lg">About Us</button>
            </Link>
          </li>
          <li className="font-bold">
            <Link to="/cart">
              <button className="hover:text-blue-500 text-lg">
                Cart - ({cartItems.length} items)
              </button>
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-blue-500 text-xl"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button className="hover:text-blue-500 text-lg">Login</button>
              </Link>
            </li>
          )}
          <li>
            <Link to="/register">
              <button className="hover:text-blue-500 text-lg">Register</button>
            </Link>
          </li>
          <li className="text-lg">{loggedInUser || ""}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
