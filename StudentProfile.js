import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './lib profile.css';




const StudentProfile = () => {
    const [profile, setProfile] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const userId = queryParams.get('userId');
        const borrowerType = queryParams.get('borrowerType');

        if (!userId || !borrowerType) {
            setErrorMessage("Missing userId or borrowerType in query parameters");
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:5000/profile?userId=${userId}&borrowerType=${borrowerType}`)
            .then(response => {
                setProfile(response.data.user);
                setBooks(response.data.books);
                setLoading(false);
            })
            .catch(error => {
                setErrorMessage("Failed to load profile. Please try again later.");
                setLoading(false);
            });
    }, [location.search]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    return (
        <div>
            {/* Header Section */}
            <header>
                <div className="header-content">
                    <h1> ACGCET LIBRARY</h1>
                    <h3 className="department">Department of EEE</h3>
                </div>
            </header>

            {/* Navigation Menu */}
            <nav>
                <ul>
                    <li><a href="LibraryHome">Home</a></li>
                    <li><a href="LibLogin">Logout</a></li>
                    <li><a href="LibraryRegistration">Register</a></li>
                    <li><a href="lib_advance.html">Advanced search</a></li>
                    <li><a href="#">Add a Book</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
            </nav>

            {/* Profile Section */}
            <section className="profile-section">
                <div className="profile-header">
                    <h2>{profile?.name?.toUpperCase()}</h2>
                </div>
                <div className="profile-details">
                    <p><strong>Roll Number:</strong> {profile?.rollnumber || "N/A"}</p>
                    <p><strong>Email:</strong> {profile?.email || "N/A"}</p>
                    {/*<p><strong>Contact:</strong> {profile?.contactnumber || "N/A"}</p>*/}
                    <p><strong>Academic Year:</strong> {profile?.academicyear || "N/A"}</p>
                </div>

                {/* Search Bar */}
                <section className="profilesearch-section">
                    <input type="text" placeholder="Search for books..." className="profilesearch-bar" />
                    <button type="submit" className="profilesearch-btn">Search</button>
                </section>

                {/* Borrowed Books Section */}
                
                <table>
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Book ID</th>
                            <th>Borrow Date</th>
                            <th>Author Name </th>
                            <th>Return Date</th>
                            <th>Return Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 ? (
                            books.map((book, index) => (
                                <tr key={index}>
                                    <td>{book.bookName}</td>
                                    <td>{book.bookId}</td>
                                    <td>{book.borrowDate || "N/A"}</td>
                                    <td>{book.returnDate || "N/A"}</td>
                                    <td>{book.returnStatus || "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No borrowed books found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* Footer Section */}
            <footer>
                <p>&copy; 2024 ACGCET Library. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default StudentProfile;
