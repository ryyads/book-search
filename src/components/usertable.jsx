import React, { useState, useEffect } from 'react';
import '../spinner.css';
import './usertable.css'; 

function UserTable() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [myList, setMyList] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${(page - 1) * 5}&maxResults=5`);
                const data = await res.json();
                setBooks(data.items || []);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            } finally {
                setLoading(false);
            }
        };

        if (search) {
            fetchBooks();
        }
    }, [page, search]);

    const addToMyList = (book) => {
        if (!myList.find(b => b.id === book.id)) {
            setMyList([...myList, book]);
        }
    };

    const removeFromMyList = (bookId) => {
        setMyList(myList.filter(book => book.id !== bookId));
    };

    return (
        <div className="page-container">
            <div className="card-container">
                <div className="header">
                     <span>LIBRARY</span>
                </div>
                <input
                    type="text"
                    placeholder="Search for books..."
                    onChange={e => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="search-input"
                />

                {loading && <div className="spinner"></div>}

                {!loading && (
                    <>
                        <h2 className="section-title">Search Results:</h2>
                        {books.length === 0 && search && (
                            <p className="no-results">No books found. Try a different search!</p>
                        )}
                        {books.length > 0 && (
                            <table className="book-table">
                                <thead>
                                    <tr>
                                        <th>Book Name</th>
                                        <th>Author</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map(book => (
                                        <tr key={book.id}>
                                            <td>{book.volumeInfo.title}</td>
                                            <td>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</td>
                                            <td>
                                                <button
                                                    onClick={() => addToMyList(book)}
                                                    className="add-btn"
                                                >
                                                    Add
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <div className="pagination">
                            <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="page-btn">Previous</button>
                            <span>Page {page}</span>
                            <button onClick={() => setPage(p => p + 1)} className="page-btn">Next</button>
                        </div>

                        <h2 className="section-title">My Book List:</h2>
                        {myList.length === 0 && <p className="no-results">No books added yet.</p>}
                        {myList.length > 0 && (
                            <ul className="book-list">
                                {myList.map(book => (
                                    <li key={book.id} className="book-item">
                                        <div>
                                            <span className="book-title">{book.volumeInfo.title}</span> -{' '}
                                            <span className="book-author">{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</span>
                                        </div>
                                        <button
                                            onClick={() => removeFromMyList(book.id)}
                                            className="remove-btn"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default UserTable;

