import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import RestaurantCards from "./RestaurantCards";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext"; // Import UserContext
import debounce from "lodash.debounce"; // Import lodash debounce
import resObj from "../utils/mockData";

const Body = () => {
  const [ListofRestaurants, setListofRestaurants] = useState(resObj);
  const [filteredRest, setfilteredRes] = useState(resObj);
  const [searchText, setsearchText] = useState("");
  const [error, setError] = useState(null);

  // Check online status
  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) return <h1>Looks like you are offline</h1>;

  // Get user context
  const { loggedInUser, setUserName } = useContext(UserContext); // Use context

  // Debounce search input
  const handleSearch = debounce((value) => {
    const filteredRestaurant = ListofRestaurants.filter(
      (res) =>
        res.info.name.toLowerCase().includes(value.toLowerCase()) ||
        res.info.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(value.toLowerCase())
        )
    );

    setfilteredRes(filteredRestaurant);
  }, 300);

  // Handle search input change
  const onSearchChange = (e) => {
    setsearchText(e.target.value);
    handleSearch(e.target.value);
  };

  return error ? (
    <h1>{error}</h1>
  ) : ListofRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        {/* Search Functionality */}
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={onSearchChange}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => handleSearch(searchText)}
          >
            Search
          </button>
        </div>

        {/* Top Rated Restaurants Filter */}
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filterList = ListofRestaurants.filter(
                (res) => res.info?.avgRating > 4
              );
              setfilteredRes(filterList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>

        {/* User Input for Username */}
        <div className="search m-4 p-4 flex items-center">
          <label>Username: </label>
          <input
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)} // Update context
          />
        </div>
      </div>

      {/* Display Filtered Restaurants */}
      <div className="flex flex-wrap">
        {filteredRest.map((restaurant) => (
          <Link
            key={restaurant?.info.id}
            to={"/restaurants/" + restaurant?.info.id}
          >
            <RestaurantCards resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
