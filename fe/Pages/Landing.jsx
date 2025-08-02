import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

function Landing() {
    const [issues,setIssues] = useState([]);
    const [search,setSearch] = useState("");

    useEffect(() =>{
        fetchIssues();
    },[])
    const fetchIssues = async () => {
        const data = [
            {
          id: 1,
          title: "Broken Traffic Signal",
          image: "https://via.placeholder.com/400x200",
          location: "Sector 18",
          status: "Unresolved",
        },
        {
          id: 2,
          title: "Overflowing Garbage",
          image: "https://via.placeholder.com/400x200",
          location: "MG Road",
          status: "Resolved",
        },  
        ];
        setIssues(data);
    };
 const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(search.toLowerCase())
  );
    
    return (
        <div className='bg-gray-100 min-h-screen p-4'>
        {/*Navigation*/}
        <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-blue-500'></h1>
        </div>
        
        </div>
    )
}

export default Landing
