import React from 'react';
import { useParams } from 'react-router-dom';

const IssueDetail = () => {
  const { id } = useParams();

  const issue = {
    id,
    title: 'Pothole on main road',
    image: 'https://c8.alamy.com/comp/2X3CPFC/iver-heath-buckinghamshire-uk-21st-april-2024-potholes-on-a-failed-road-surface-on-a-main-road-in-iver-heath-buckinghamshire-many-of-the-roads-in-buckinghamshire-are-in-a-very-poor-state-of-repair-credit-maureen-mcleanalamy-2X3CPFC.jpg',
    status: 'In Progress',
    reportedBy: 'Anonymous',
    dateReported: 'Jun 02, 2025 - 10:34 AM',
    description:
      'The main road in C.G road, Ahmedabad, is riddled with potholes, making it dangerous and difficult to travel on.',
    location: 'C.G road, Ahmedabad, Gujarat',
    activity: [
      { time: 'Jun 02, 10:34 AM', note: 'Reported by user' },
      { time: 'July 26, 09:00 AM', note: 'Assigned to municipal worker' },
      { time: 'July 29, 04:15 PM', note: 'Marked "In Progress"' },
    ],
    coordinates: {
      lat: 23.0225,
      lng: 72.5714,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-white text-black rounded-xl shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-blue-500">civicTrack</h1>
        <div className="space-x-3">
          <button className="bg-green-500 text-black px-4 py-1 rounded-md hover:bg-yellow-400 transition">Edit</button>
          <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-400 transition">Delete</button>
        </div>
      </div>

      {/* Issue Title & Status */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{issue.title}</h2>
        <p className="text-sm text-yellow-600 mt-1">🟠 {issue.status}</p>
      </div>

      {/* Issue Image */}
      <div className="overflow-hidden rounded-lg shadow-md">
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Reporter Info */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>Reported by: {issue.reportedBy}</span>
        <span>{issue.dateReported}</span>
      </div>

      {/* Description */}
      <div className="bg-gray-100 p-4 rounded-md border border-gray-200 shadow-inner">
        <h3 className="text-lg font-medium mb-2">Description</h3>
        <p className="text-sm leading-relaxed text-gray-700">{issue.description}</p>
      </div>

      {/* Location & Map */}
      <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
        <h3 className="text-lg font-medium mb-2">📍 Location</h3>
        <p className="text-sm mb-3 text-gray-700">{issue.location}</p>
        <iframe
          title="map"
          width="100%"
          height="200"
          className="rounded-md border border-gray-300"
          loading="lazy"
          style={{ border: 0 }}
          src={`https://maps.google.com/maps?q=${issue.coordinates.lat},${issue.coordinates.lng}&z=15&output=embed`}
        ></iframe>
      </div>

      {/* Activity Log */}
      <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
        <h3 className="text-lg font-medium mb-2">📝 Activity Log</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {issue.activity.map((log, idx) => (
            <li key={idx}>
              <span className="font-semibold">{log.time}</span> — {log.note}
            </li>
          ))}
        </ul>
      </div>

      {/* Spam Report */}
      <div className="text-right">
        <button className="text-sm text-red-600 hover:underline">Report Spam</button>
      </div>
    </div>
  );
};

export default IssueDetail;
