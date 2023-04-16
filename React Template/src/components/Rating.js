import React from "react";


const Rating = ({ value, text }) => {
    return (
        <div className="rating">
            <i
                className={
                    value >= 1
                        ? "fas fa-star yellow"
                        : value >= 0.5
                            ? "fas fa-star-half-alt yellow"
                            : "far fa-star"
                }
            ></i>

            <i
                className={
                    value >= 2
                        ? "fas fa-star yellow"
                        : value >= 1.5
                            ? "fas fa-star-half-alt yellow"
                            : "far fa-star"
                }
            ></i>
            <i
                className={
                    value >= 3
                        ? "fas fa-star yellow"
                        : value >= 2.5
                            ? "fas fa-star-half-alt yellow"
                            : "far fa-star"
                }
            ></i>
            <i
                className={
                    value >= 4
                        ? "fas fa-star yellow"
                        : value >= 3.5
                            ? "fas fa-star-half-alt yellow"
                            : "far fa-star"
                }
            ></i>
            <i
                className={
                    value >= 5
                        ? "fas fa-star yellow"
                        : value >= 4.5
                            ? "fas fa-star-half-alt yellow"
                            : "far fa-star"
                }
            ></i>
            <span>{text && text}</span>
        </div>
    );
};

export default Rating;
