import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import startPlaybackWithURL from "../receiver/CastVideos";

const Description = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tempBook = location.state?.book;

  const [book, setBook] = useState(tempBook);

  function href(link) {
    window.open(link, "_blank");
  }

  return (
    <div className="container m-5">
      <button
        className="btn btn-outline-secondary btn-large"
        onClick={() => navigate("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>
      <br/>
      <br/>
      <div className="row text-center">
        <h1>{book?.title}</h1>
      </div>
      <div className="row">
        <div className="col-lg-2 m-5">
          <img src={book.formats?.["image/jpeg"]} alt="na" />
        </div>
        <div className="col-lg-6 my-5">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Author</th>
                <td>
                  {book.authors[0].name} ({book.authors[0].birth_year} -{" "}
                  {book.authors[0].death_year})
                </td>
              </tr>
              <tr>
                <th scope="row">Subjects</th>
                <td>
                  {book.subjects.map((subject) => {
                    return (
                      <>
                        {subject} <br />
                      </>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <th scope="row">Language</th>
                <td>English</td>
              </tr>
              <tr>
                <th scope="row">Copyright</th>
                <td>{book.copyright ? <>True</> : <>False</>}</td>
              </tr>
              <tr>
                <th scope="row">Downloads</th>
                <td>{book.download_count}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-lg-2 my-5 text-center">
          <div className="row">
            <button
              onClick={() => href(book.formats?.["text/html"])}
              type="button"
              className="btn btn-success btn-small"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-filetype-html"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zm-9.736 7.35v3.999h-.791v-1.714H1.79v1.714H1V11.85h.791v1.626h1.682V11.85h.79Zm2.251.662v3.337h-.794v-3.337H4.588v-.662h3.064v.662zm2.176 3.337v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H9.93L8.79 11.85h-.805v3.999zm4.71-.674h1.696v.674H12.61V11.85h.79v3.325Z"
                />
              </svg>{" "}
              text/html
            </button>
          </div>
          <br />
          <div className="row">
            <button
              onClick={() => href(book.formats?.["application/epub+zip"])}
              type="button"
              className="btn btn-success btn-small"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-earmark-zip"
                viewBox="0 0 16 16"
              >
                <path d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438z" />
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
              </svg>{" "}
              epub+zip
            </button>
          </div>
          <br />
          <div className="row">
            <button
              type="button"
              onClick={() =>
                href(book.formats?.["text/plain; charset=us-ascii"])
              }
              className="btn btn-success btn-small"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-earmark-text"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
              </svg>{" "}
              text/plain
            </button>
          </div>
          <br />
          <div className="row">
            <button type="button" className="btn btn-primary btn-small">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cast"
                viewBox="0 0 16 16"
              >
                <path d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0" />
                <path d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086z" />
              </svg>{" "}
              cast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
