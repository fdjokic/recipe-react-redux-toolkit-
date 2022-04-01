import React from "react";

const List = ({ monday }) => {
  console.log(monday);
  if (monday === undefined) return;
  return (
    <div>
      {monday.map((item) => {
        return <p key={item.id}>{item.title}</p>;
      })}
    </div>
  );
};

export default List;
