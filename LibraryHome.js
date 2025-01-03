import React from 'react';
import './lib home.css'; // Importing your CSS file

const LibraryHome = () => {
    return (
        <div>
            {/* Header Section */}
            <header>
                <div className="header-content">
                    <h1>Welcome to ACGCET Library</h1>
                    <h3 className="department">Department of EEE</h3>
                </div>
            </header>

            {/* Navigation Menu */}
            <nav>
                <ul>
                    <li><a href="LibraryHome">Home</a></li>
                    <li><a href="LibLogin">Login</a></li>
                    <li><a href="LibraryRegistration">Register</a></li>
                    <li><a href="lib_advance.html">Advanced search</a></li>
                    <li><a href="#">Add a Book</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
            </nav>

            {/* Search Bar Section */}
            <section className=" homesearch-section">
                <input type="text" placeholder="Search for books, authors, subjects..." className="homesearch-bar" />
                <button type="submit" className="homesearch-btn">Search</button>
            </section>

            {/* Footer Section */}
            
            <homefooter>
                <div className="homefooter">
                <p>&copy; 2024 ACGCET Library. All Rights Reserved.</p>
                </div>
            </homefooter>
            
        </div>
    );
};

export default LibraryHome;
