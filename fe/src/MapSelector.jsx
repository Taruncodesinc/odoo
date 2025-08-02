import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ setPosition }) => {
  const [markerPos, setMarkerPos] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPos([lat, lng]);
      setPosition([lat, lng]);
    },
  });

  return markerPos ? <Marker position={markerPos} /> : null;
};

const ReportIssueForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Road");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [locationCoords, setLocationCoords] = useState(null);
  const [error, setError] = useState("");

  const countWords = (text) => text.trim().split(/\s+/).length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!locationCoords) {
      setError("Please select a location on the map.");
      return;
    }

    if (countWords(description) < 5) {
      setError("Description must be at least 5 words.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("isAnonymous", anonymous);
    formData.append("location", JSON.stringify(locationCoords));

    try {
      const res = await fetch("http://localhost:5000/api/issues/report", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to submit issue");

      alert("Issue reported successfully!");
      setTitle("");
      setCategory("Road");
      setDescription("");
      setImage(null);
      setAnonymous(false);
      setLocationCoords(null);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold text-center">Report New Issue</h2>

      {/* Image Upload */}
      <div>
        <label className="block font-medium mb-2">Upload Image</label>
        <div className="w-full h-40 border-2 border-dashed rounded-xl flex justify-center items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="opacity-0 absolute w-full h-full cursor-pointer"
            required
          />
          <p className="text-gray-500 pointer-events-none">
            Drag & drop or click to upload image
          </p>
        </div>
      </div>

      {/* Map */}
      <div>
        <label className="block font-medium mb-2">Click on map to select location</label>
        <div className="w-full h-64 rounded-xl overflow-hidden">
          <MapContainer
            center={[28.6139, 77.209]} // Delhi
            zoom={13}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker setPosition={setLocationCoords} />
          </MapContainer>
        </div>
        {locationCoords && (
          <p className="text-sm text-blue-600 mt-2">
            Selected: Lat {locationCoords[0].toFixed(4)}, Lng {locationCoords[1].toFixed(4)}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border-b-2 outline-none py-2 px-1"
        >
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-2">Description (min 5 words)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full border-b-2 outline-none px-1 py-2"
          required
        />
      </div>

      {/* Title */}
      <div>
        <label className="block font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-b-2 outline-none px-1 py-2"
          required
        />
      </div>

      {/* Anonymous */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={() => setAnonymous(!anonymous)}
        />
        <label>Report Anonymously</label>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Report Issue
      </button>
    </form>
  );
};

export default ReportIssueForm;
