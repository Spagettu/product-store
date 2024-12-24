import React, { ChangeEvent, useState } from "react";
import { SVGStar } from "../../../custom-icons";
import styled from "styled-components";
import { CustomButton } from "../../../components";

export const NewReview = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [newReview, setNewReview] = useState("");

  const handleChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };
  return (
    <NewReviewContainer>
      <div className="newscore">
        {new Array(5).fill("").map((_, id: number) => (
          <SVGStar
            key={id}
            fillColor={id < currentScore && !!currentScore ? "yellow" : "white"}
            onClick={() => setCurrentScore(id + 1)}
          />
        ))}
      </div>

      <textarea
        placeholder="Напишите отзыв..."
        wrap="soft"
        cols={10}
        rows={20}
        value={newReview}
        onChange={handleChangeReview}
      />
      <CustomButton disabled={!currentScore || !newReview.length}>
        Добавить отзыв
      </CustomButton>
    </NewReviewContainer>
  );
};

const NewReviewContainer = styled.div({
  width: "100%",
  minHeight: "200px",
  marginTop: "50px",

  textarea: {
    background: "transparent",
    color: "white",
    fontSize: "18px",

    width: "100%",
    minHeight: "50px",

    resize: "none",
    overflow: "hidden",

    padding: "5px 3px",
  },

  ".newscore": {
    display: "flex",
    justifyContent: "start",
    paddingLeft: "10px",
  },
});
