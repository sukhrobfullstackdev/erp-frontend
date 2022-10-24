import React, { memo } from "react";
import styled, { css } from "styled-components";
import { Rating } from "react-simple-star-rating";

const Style = styled.div`
  .emoji {
    font-size: 15px;
  }
  .empty {
    opacity: 0.3;
  }
  ${({ readonly }) =>
    readonly &&
    css`
      span {
        cursor: default !important;
      }
    `}
`;

const RatingComponent = ({ iconsCount = 0, codePoint, initialRating, editable = false, onClick = () => {} }) => {
  const onChange = (val) => {
    onClick(val / (100 / iconsCount));
  };
  let emojiCode = String.fromCodePoint(parseInt("1F44D", 16));
  try {
    emojiCode = String.fromCodePoint(parseInt(codePoint, 16));
  } catch (e) {
    console.log(e);
  }

  return (
    <Style className="rating-input" readonly={!editable}>
      <Rating
        onClick={onChange}
        ratingValue={(100 / iconsCount) * initialRating}
        size={100}
        transition
        allowHalfIcon={false}
        iconsCount={iconsCount}
        readonly={!editable}
        initialValue={initialRating}
        emptyIcon={<span className={"emoji empty"}>{emojiCode}</span>}
        fullIcon={<span className={"emoji"}>{emojiCode}</span>}
      />
    </Style>
  );
};

export default memo(RatingComponent);
