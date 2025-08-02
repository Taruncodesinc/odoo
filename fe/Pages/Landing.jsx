import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const issuesPerPage = 3;

  const tagOptions = [
    'Road',
    'Garbage',
    'StreetLight',
    'Construction',
    'Park',
    'Water Supply',
  ];

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const data = [
      {
        id: 1,
        title: 'Broken Road',
        image: 'https://thumbs.dreamstime.com/b/broken-road-earthquake-landslide-34284767.jpg',
        statusDate: 'Aug 14',
        distance: '2.8 km',
        location: 'Sector 18',
        tags: ['Road'],
        status: 'Unresolved',
        description:
          'The road has multiple potholes and cracks, making it dangerous for vehicles and pedestrians.',
      },
      {
        id: 2,
        title: 'Overflowing Garbage',
        image: 'https://thumbs.dreamstime.com/z/green-plastic-trash-bin-overflowing-garbage-roadside-165224795.jpg',
        statusDate: 'July 15',
        distance: '3.1 km',
        location: 'MG Road',
        status: 'Resolved',
        tags: ['Garbage'],
        description:
          'The garbage bin is constantly overflowing, leading to foul smell and health concerns.',
      },
      {
        id: 3,
        title: 'Broken Road',
        image:
          'https://thumbs.dreamstime.com/b/broken-road-earthquake-landslide-34284767.jpg',
        statusDate: 'Aug 14',
        distance: '2.8 km',
        location: 'Sector 18',
        tags: ['Road'],
        status: 'Unresolved',
        description:
          'The road has multiple potholes and cracks, making it dangerous for vehicles and pedestrians.',
      },
      {
        id: 4,
        title: 'Overflowing Garbage',
        image:
          'https://thumbs.dreamstime.com/z/green-plastic-trash-bin-overflowing-garbage-roadside-165224795.jpg',
        statusDate: 'July 15',
        distance: '3.1 km',
        location: 'MG Road',
        status: 'Resolved',
        tags: ['Garbage'],
        description:
          'The garbage bin is constantly overflowing, leading to foul smell and health concerns.',
      },
        {
        id: 5,
        title: 'Broken Road',
        image:
          'https://thumbs.dreamstime.com/b/broken-road-earthquake-landslide-34284767.jpg',
        statusDate: 'Aug 14',
        distance: '2.8 km',
        location: 'Sector 18',
        tags: ['Road'],
        status: 'Unresolved',
        description:
          'The road has multiple potholes and cracks, making it dangerous for vehicles and pedestrians.',
      },
        {
        id: 6,
        title: 'Broken Road',
        image:
          'https://thumbs.dreamstime.com/b/broken-road-earthquake-landslide-34284767.jpg',
        statusDate: 'Aug 14',
        distance: '2.8 km',
        location: 'Sector 18',
        tags: ['Road'],
        status: 'Unresolved',
        description:
          'The road has multiple potholes and cracks, making it dangerous for vehicles and pedestrians.',
      },
        {
        id: 7,
        title: 'Broken Road',
        image:
          'https://thumbs.dreamstime.com/b/broken-road-earthquake-landslide-34284767.jpg',
        statusDate: 'Aug 14',
        distance: '2.8 km',
        location: 'Sector 18',
        tags: ['Road'],
        status: 'Unresolved',
        description:
          'The road has multiple potholes and cracks, making it dangerous for vehicles and pedestrians.',
      },
        {
        id:8,
        title: 'Broken Road',
        image:
          'https://thumbs.dreamstime.com/b/broken-road-earthquake-landslide-34284767.jpg',
        statusDate: 'Aug 14',
        distance: '2.8 km',
        location: 'Sector 18',
        tags: ['Road'],
        status: 'Unresolved',
        description:
          'The road has multiple potholes and cracks, making it dangerous for vehicles and pedestrians.',
      },
        {
        id: 9,
        title: 'Broken Road',
        image:
          'https://thumbs.dreamstime.com/b/broken-road-earthquake-landslide-34284767.jpg',
        statusDate: 'Aug 14',
        distance: '2.8 km',
        location: 'Sector 18',
        tags: ['Road'],
        status: 'Unresolved',
        description:
          'The road has multiple potholes and cracks, making it dangerous for vehicles and pedestrians.',
      },
        {
        id: 10,
        title: 'Broken Road',
        image:
          'https://thumbs.dreamstime.com/b/broken-road-earthquake-landslide-34284767.jpg',
        statusDate: 'Aug 14',
        distance: '2.8 km',
        location: 'Sector 18',
        tags: ['Road'],
        status: 'Unresolved',
        description:
          'The road has multiple potholes and cracks, making it dangerous for vehicles and pedestrians.',
      },
        {
        id: 11,
        title: 'Broken Road',
        image:
          'https://thumbs.dreamstime.com/b/broken-road-earthquake-landslide-34284767.jpg',
        statusDate: 'Aug 14',
        distance: '2.8 km',
        location: 'Sector 18',
        tags: ['Road'],
        status: 'Unresolved',
        description:
          'The road has multiple potholes and cracks, making it dangerous for vehicles and pedestrians.',
      },
    ];
    setIssues(data);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((tag) => issue.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue);
  const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedTags]);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700"> civicTrack</h1>
        <div className="space-x-2">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Slogan */}
      <p className="text-sm text-center text-gray-600 mb-4">
        Users can see nearby issues with red and green icons.
      </p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search issues..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tagOptions.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full border text-sm ${
              selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Issue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentIssues.length > 0 ? (
          currentIssues.map((issue) => (
            <Link to={`/issue/${issue.id}`} key={issue.id}>
              <div className="shadow-md rounded-xl overflow-hidden flex flex-col bg-white">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      {issue.tags[0]}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                        issue.status === 'Resolved'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-orange-200 text-orange-800'
                      }`}
                    >
                      {issue.status} • {issue.statusDate}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold mb-1">{issue.title}</h2>
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                    {issue.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <p>{issue.location}</p>
                    <p className="font-medium">{issue.distance}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No issues found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded text-sm bg-white text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded text-sm ${
                currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded text-sm bg-white text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Landing;
