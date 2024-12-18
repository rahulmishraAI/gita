import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const [chapter, verse] = searchTerm.split(',').map((v) => v.trim());

    if (!chapter || !verse) {
      setError('Please Enter a valid chapter and verse (4,7)');
      setResponse(null);
      return;
    }

    try {
      const res = await axios.get(`/api/verse?chapter=${chapter}&verse=${verse}`);
      setResponse({
        chapter,
        verse,
        data: res.data,
      });
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching verse. Please try again.');
      setResponse(null);
    }
  };

  return (
    <div className="container">
      {/* Moving Image */}
      <Image
          src="/gitagpt.png"
          alt="Bhagavad Geeta"
          width={500} 
          height={300} 
          className="moving-image"
        />


      <h1>Bhagavad Gita GPT</h1>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter Chapter, Verse"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button type="submit" className="search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {response && (
        <div className="result">
          <h2>
            <strong>Chapter {response.chapter}, Verse {response.verse}</strong>
          </h2>
          <p><strong>Sanskrit:</strong> {response.data.sanskrit}</p>
          <p><strong>Hindi:</strong> {response.data.hindi}</p>
          <p><strong>Transliteration:</strong> {response.data.transliteration}</p>
          <p><strong>English:</strong> {response.data.english}</p>
          <p><strong>Commentary:</strong> {response.data.commentary}</p>
        </div>
      )}
    </div>
  );
}
