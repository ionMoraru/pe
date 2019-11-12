import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

const dots = (
  <li>
    <span class="page-numbers dots">…</span>
  </li>
);

const Pagination = ({ pageNr, nextPage, jobsLength }) => {
  const pageNumbers = Array(pageNr).fill(1);

  return (
    <ul className="pagination text-center" role="navigation">
      <li>
        {pageNr > 1 && (
          <Link
            className="next page-numbers"
            to={`/${pageNr - 1}`}
            onClick={() => nextPage(pageNr)}
          >
            &larr;
          </Link>
        )}
      </li>
      {pageNumbers.map((number, index) => {
        return (
          <>
            <li
              key={index + 1}
              className={classNames({ current: index + 1 === pageNr })}
            >
              <Link
                className="next page-numbers"
                to={`/${index + 1}`}
                onClick={() => nextPage(index + 1)}
                style={{
                  pointerEvents: index + 1 === pageNr ? "none" : "auto"
                }}
              >
                {index + 1}
              </Link>
            </li>
          </>
        );
      })}
      {jobsLength && (
        <li>
          <Link
            className="next page-numbers"
            to={`/${pageNr + 1}`}
            onClick={() => nextPage(pageNr + 1)}
          >
            →
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
