interface RatingProps {
    cms: {
        rating0: number;
        rating1: number;
        rating2: number;
    };
}

const RatingView = ({cms}: RatingProps) => {
    const calculateAverageRating = () => {
        const totalRatings = cms.rating0 + cms.rating1 + cms.rating2;
        const averageRating = totalRatings / 3;
        return averageRating.toFixed(1);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<div key={i}>
                    <svg width="19" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.325 19L5.95 11.975L0.5 7.25L7.7 6.625L10.5 0L13.3 6.625L20.5 7.25L15.05 11.975L16.675 19L10.5 15.275L4.325 19Z"
                            fill="currentColor"/>
                    </svg>
                </div>);
            } else {
                stars.push(<div key={i}>
                    <svg width="19" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.35 14.825L10.5 12.925L13.65 14.85L12.825 11.25L15.6 8.85L11.95 8.525L10.5 5.125L9.05 8.5L5.4 8.825L8.175 11.25L7.35 14.825ZM4.325 19L5.95 11.975L0.5 7.25L7.7 6.625L10.5 0L13.3 6.625L20.5 7.25L15.05 11.975L16.675 19L10.5 15.275L4.325 19Z"
                            fill="currentColor"/>
                    </svg>
                </div>);
            }
        }
        return stars;
    };

    return (
        <div className="py-3 my-5 border-y">
            <h4 className="mb-2">Bewertung</h4>
            <div>
                <div className="flex items-center"><div className="me-2">Community</div> {renderStars(cms.rating0)}</div>
            </div>
            <div>
                <div className="flex items-center"><div className="me-2">Vertrauenswürdig</div> {renderStars(cms.rating1)}</div>
            </div>
            <div>
                <div className="flex items-center"><div className="me-2">Markttrend</div> {renderStars(cms.rating2)}</div>
            </div>
            <div className="mt-2">
                <b>Bewertung: {calculateAverageRating()}</b>
            </div>
        </div>
    );
};

export default RatingView;
