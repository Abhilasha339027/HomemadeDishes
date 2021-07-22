import React, { useEffect } from "react";
import indian from "../../../media/indian.svg";
import indianPopup from "../../../media/indian_popup.svg";
import middleeast from "../../../media/middleeast.png";
import middleeasthover from "../../../media/middleeasthover.png";
import italian from "../../../media/italian.svg";
import italianPopup from "../../../media/italian-popup.svg";
import chinese from "../../../media/chinese.svg";
import chinesePopup from "../../../media/chinese-popup.svg";
import all from "../../../media/all.svg";
import allPopup from "../../../media/all_popup.svg";
import korean from "../../../media/korean.svg";
import koreanPopup from "../../../media/korean-popup.svg";
import mexican from "../../../media/mexican.svg";
import mexicanPopup from "../../../media/mexican-popup.svg";

function CuisineImages({ cuisine }) {
  const [img, setImg] = React.useState("");

  useEffect(() => {
    if (cuisine === "Indian") {
      setImg(indian);
    } else if (cuisine === "Middle East") {
      setImg(middleeast);
    } else if (cuisine === "Chinese") {
      setImg(chinese);
    } else if (cuisine === "Italian") {
      setImg(italian);
    } else if (cuisine === "All") {
      setImg(all);
    } else if (cuisine === "Korean") {
      setImg(korean);
    } else if (cuisine === "Mexican") {
      setImg(mexican);
    }
  }, [cuisine]);

  const mouseEnter = () => {
    if (cuisine === "Indian") {
      setImg(indianPopup);
    } else if (cuisine === "Middle East") {
      setImg(middleeasthover);
    } else if (cuisine === "Chinese") {
      setImg(chinesePopup);
    } else if (cuisine === "Italian") {
      setImg(italianPopup);
    } else if (cuisine === "All") {
      setImg(allPopup);
    } else if (cuisine === "Korean") {
      setImg(koreanPopup);
    } else if (cuisine === "Mexican") {
      setImg(mexicanPopup);
    }
  };

  const mouseLeave = () => {
    if (cuisine === "Indian") {
      setImg(indian);
    } else if (cuisine === "Middle East") {
      setImg(middleeast);
    } else if (cuisine === "Chinese") {
      setImg(chinese);
    } else if (cuisine === "Italian") {
      setImg(italian);
    } else if (cuisine === "All") {
      setImg(all);
    } else if (cuisine === "Korean") {
      setImg(korean);
    }
  };

  return (
    <div>
      <img
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        src={img}
        alt={cuisine}
        width="100%"
      />
    </div>
  );
}

export default CuisineImages;
