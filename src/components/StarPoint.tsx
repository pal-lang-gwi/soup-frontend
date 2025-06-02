import styled from 'styled-components';

const StarPoint = () => {
    return (
        <StyledWrapper>
        <div className="rating">
            <input type="radio" id="star5" name="rating" defaultValue={5} />
            <label htmlFor="star5" />
            <input type="radio" id="star4" name="rating" defaultValue={4} />
            <label htmlFor="star4" />
            <input type="radio" id="star3" name="rating" defaultValue={3} />
            <label htmlFor="star3" />
            <input type="radio" id="star2" name="rating" defaultValue={2} />
            <label htmlFor="star2" />
            <input type="radio" id="star1" name="rating" defaultValue={1} />
            <label htmlFor="star1" />
        </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
.rating {
    display: inline-block;
    direction: rtl;
}

.rating input {
    display: none;
}

.rating label {
    display: inline-block;
    font-size: 30px;
    color: #e0e0e0;
    cursor: pointer;
    transition: color 0.3s;
    position: relative;
}

.rating label::before {
    content: "★";
    font-size: 30px;
}

.rating input:checked ~ label {
    color: #ffd700;
}

.rating label:hover,
.rating label:hover ~ label {
    color: #ffd700;
}
`;

export default StarPoint;
