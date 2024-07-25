import React, { useState } from "react";
import launcher from "../../public/home_page_banner1.e6749c3d9698d1ac7608.jpg"; // Ensure this path is correct

const RailwayBooking = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    class: "GENERAL",
    disability: false,
    flexible: false,
    availableBerth: false,
    railwayPass: false,
  });

  const [trainData, setTrainData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { from, to } = formData;
    const url = `http://localhost:5000/api/trains?from=${encodeURIComponent(
      from
    )}&to=${encodeURIComponent(to)}`;

    console.log("Submitting form with data:", formData);
    console.log("API URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      console.log("API Response:", data);

      setTrainData(data);
    } catch (error) {
      console.error("Error fetching train data:", error);
      setError("Failed to fetch train data. Please try again.");
      setTrainData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="main"
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "rgba(50%, 50%, 50%, 0.1)", // Optional background color
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${launcher})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1, // Adjust opacity here
          zIndex: -1,
        }}
      ></div>

      <div id="Banner">
        <div id="nav" style={{ display: "none" }}>
          {/* Content for #nav */}
        </div>
        <div id="nav2" style={{ display: "none" }}>
          {/* Content for #nav2 */}
        </div>
      </div>
      <div id="middlepage" style={{ marginLeft: "30px" }}>
        <div
          id="instruction"
          style={{
            position: "absolute",
            top: "140px",
            left: "990px",
            right: "0px",
            zIndex: "1",
            backgroundColor: "transparent",
            overflow: "hidden",
          }}
        >
          <div className="flex flex-wrap flex-col justify-center">
            <label className="railway p-4 font-black">INDIAN RAILWAYS</label>
            <label className="ins font-black">
              Safety | Security | Punctuality
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen bg-gray-100 bg-opacity-80">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">BOOK TICKET</h2>

          <div className="mb-4">
            <label className="block text-gray-700">From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">To</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Date of Journey</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="GENERAL">GENERAL</option>
              <option value="SLEEPER">SLEEPER</option>
              <option value="AC">AC</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              <input
                type="checkbox"
                name="disability"
                checked={formData.disability}
                onChange={handleChange}
                className="mr-2"
              />
              Person With Disability Concession
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              <input
                type="checkbox"
                name="flexible"
                checked={formData.flexible}
                onChange={handleChange}
                className="mr-2"
              />
              Flexible With Date
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              <input
                type="checkbox"
                name="availableBerth"
                checked={formData.availableBerth}
                onChange={handleChange}
                className="mr-2"
              />
              Train with Available Berth
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              <input
                type="checkbox"
                name="railwayPass"
                checked={formData.railwayPass}
                onChange={handleChange}
                className="mr-2"
              />
              Railway Pass Concession
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded"
            >
              Search
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => alert("Easy Booking on AskDISHA")}
            >
              Easy Booking on AskDISHA
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="text-center mt-4">
          <span>Loading...</span>
        </div>
      )}

      {error && (
        <div className="text-center mt-4 text-red-500">
          <span>{error}</span>
        </div>
      )}

      {trainData && (
        <div className="train-data p-4 bg-white rounded shadow-md w-full max-w-md mt-8">
          <h2 className="text-xl font-bold mb-4">Available Trains</h2>
          <ul>
            {trainData.map((train) => (
              <li key={train.trainNumber} className="mb-2">
                <div className="font-semibold">{train.trainName}</div>
                <div>
                  {train.fromStnCode} ({train.departureTime}) -{" "}
                  {train.toStnCode} ({train.arrivalTime})
                </div>
                <div>Type: {train.trainType.join(", ")}</div>
                <div>Travel Time: {train.duration}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RailwayBooking;
