import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Landing = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1)

    const [hoveredCard, setHoveredCard] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        const getBooks = async () => {
            const response = await axios.get(`https://gutendex.com/books/?page=${page}`);
            let data = response?.data;
            setBooks(data?.results);
        };
        getBooks();
        console.log(page)
    }, [page]);

    return (
        <div className="container">
            <div className='mx-2 row row-cols-5'>
                {books.map((book, index) => {
                    const isHovered = hoveredCard === index;
                    const cardStyle = {
                        width: '15rem',
                        margin: '15px',
                        borderRadius: '0.25rem',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${book.formats?.["image/jpeg"]})`,
                        color: 'white',
                        position: 'relative',
                        transition: 'transform 0.3s ease, background-color 0.3s ease',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        zIndex: isHovered ? 2 : 1,
                        cursor: isHovered ? 'pointer' : null
                    };

                    const overlayStyle = {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.8)',
                        borderRadius: 'inherit',
                        transition: 'background-color 0.3s ease',
                    };

                    return (
                        <div
                            className="card "
                            style={cardStyle}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={() => navigate("/description", { state: { book: book }})}
                        >
                            <div className="overlay" style={overlayStyle}></div>
                            <div className="card-body" style={{ position: 'relative', zIndex: 3 }}>
                                <h5 className="card-title">{
                                    book.title.length > 20 ? book.title.slice(0, 25) + "..." : book.title
                                }</h5>
                                <p className="card-text">
                                    Author: <b>{book.authors.length !== 0 ? book.authors[0].name : 'N/A'}</b> <br />
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <nav>
                <ul class="pagination justify-content-between">
                    <li class="page-item">
                        {page === 1 ?
                            <button type='button' disabled className='btn btn-outline-primary'>Previous</button>
                            :
                            <button type='button' className='btn btn-outline-primary' onClick={() => {setPage(prevPage => prevPage - 1); window.scrollTo(0, 0);}}>Previous</button>
                        }
                    </li>
                    <li class="page-item">
                        <button type='button' className='btn btn-outline-primary' onClick={() => {setPage(prevPage => prevPage + 1); window.scrollTo(0, 0);}}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Landing;
