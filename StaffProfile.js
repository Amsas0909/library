import React, { useState, useEffect } from "react";
import axios from "axios"; // To make API calls
import "./staff profile.css";

const StaffProfile = () => {
  const [name, setName] = useState(""); // Staff name
  const [borrowedBooks, setBorrowedBooks] = useState([]); // Borrowed books list

  // Fetch staff details when the component loads
  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        // Assuming staffId is stored in localStorage
        const staffid = localStorage.getItem("staffid");
        if (!staffid) {
          console.error("Staff ID not found. Redirecting to login...");
          
          return;
        }

        // Replace this with your API endpoint
        const response = await axios.get(`/api/staff/${staffid}`);
        const { name, borrowedBooks } = response.data;

        setName(name);
        setBorrowedBooks(borrowedBooks);
      } catch (error) {
        console.error("Error fetching staff details:", error);
      }
    };

    fetchStaffDetails();
  }, []);

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
          <li><a href="/">Home</a></li>
          <li><a href="/LibLogin">Logout</a></li>
          <li><a href="/advanced-search">Advanced Search</a></li>
          <li><a href="/about">About Us</a></li>
        </ul>
      </nav>

      {/* Staff Profile Section */}
      <section className="profile-section">
      <h2>Welcome, </h2>


        {/* Book Borrowing Details Table */}
        <h3>Your Borrowed Books</h3>
        <table>
          <thead>
            <tr>
              <th>sl.no</th>
              <th>Book Name</th>
              <th>Book ID</th>
              <th>Author Name</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.name}</td>
                  <td>{book.borrowDate}</td>
                  <td>{book.returnDate}</td>
                  <td>{book.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No books borrowed yet.</td>
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

export default StaffProfile;
