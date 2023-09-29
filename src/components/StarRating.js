import React from 'react';

const StarRating = ({ rating }) => {
    const maxRating = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const renderFullStars = () => {
        return Array(fullStars)
            .fill()
            .map((_, index) => (
                <span key={index} className="star">&#9733;</span>
            ));
    };

    const renderHalfStar = () => {
        if (hasHalfStar) {
            return <span className="star">&#9734;</span>;
        }
        return null;
    };

    const renderEmptyStars = () => {
        const remainingStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
        return Array(remainingStars)
            .fill()
            .map((_, index) => (
                <span key={index} className="star">&#9734;</span>
            ));
    };

    return (
        <div className="star-rating">
            {renderFullStars()}
            {renderHalfStar()}
            {renderEmptyStars()}
        </div>
    );
};

export default StarRating;
