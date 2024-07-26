interface RatingProps {
    cms: {
        communityRating: number;
        vertrauenRating: number;
        markttrendRating: number;
    };
}

const RatingView = ({cms}: RatingProps) => {
    const calculateAverageRating = () => {
        const totalRatings = cms.communityRating + cms.vertrauenRating + cms.markttrendRating;
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
            <div className="mb-2">
                <small>Die von uns vorgenommene Bewertung eines Meme-Coins spiegelt lediglich unsere Einschätzung und Meinung zu dessen aktuellem Stand und Potenzial wider. Es ist wichtig zu betonen, dass dies nicht als Aufforderung zum Kauf oder Verkauf der besprochenen digitalen Währung interpretiert werden sollte.</small>
            </div>
            <div>
                <div className="flex items-center"><div className="me-2">Community</div> {renderStars(cms.communityRating)}</div>
            </div>
            <div>
                <div className="flex items-center"><div className="me-2">Vertrauenswürdig</div> {renderStars(cms.vertrauenRating)}</div>
            </div>
            <div>
                <div className="flex items-center"><div className="me-2">Markttrend</div> {renderStars(cms.markttrendRating)}</div>
            </div>
            <div className="mt-2">
                <b>Bewertung: {calculateAverageRating()}</b>
            </div>
        </div>
    );
};

export default RatingView;
