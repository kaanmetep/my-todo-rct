import { useState } from "react";

export default function Priority({ pri, onSetPri }) {
  const [num, setNum] = useState(1);
  const [tempNum, setTempNum] = useState(0);
  const handleOnClick = function (i) {
    setNum(i + 1);
    onSetPri(i + 1);
  };
  return (
    <div
      style={{
        fontSize: "14px",
        display: "grid",
        gridTemplateColumns: "1fr 30px",
        alignItems: "center",
        columnGap: "4px",
      }}
    >
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: 3 }, (_, i) => (
          <Circle
            onClick={() => handleOnClick(i)}
            fill={tempNum ? tempNum > i : num > i}
            onHoverIn={() => setTempNum(i + 1)}
            onHoverOut={() => setTempNum(0)}
            key={i}
          />
        ))}
      </div>
      <p>
        {num === 1 && "Low"}
        {num === 2 && "Medium"}
        {num === 3 && "High"}
      </p>
    </div>
  );
}

const Circle = ({ onClick, fill, onHoverIn, onHoverOut }) => {
  return (
    <div
      style={{
        borderRadius: "100px",
        height: "15px",
        width: "15px",
        border: "1px solid black",
        cursor: "pointer",
        backgroundColor: fill ? "black" : "",
        zIndex: "10",
      }}
      onClick={onClick}
      onMouseEnter={onHoverIn}
      onMouseOut={onHoverOut}
    ></div>
  );
};
