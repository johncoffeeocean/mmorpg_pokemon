import React, { useState } from "react";
import Card from "./MonsterCard";

function Grid(props) {
  function handleButton() {
    // props.onHandleGrid(query);
  }

  return (
    <div className="grid">
      <div className="grid__pokemon">
        {props.monsters.map((monster) => (
          <Card key={monster.name} monster={monster}></Card>
        ))}
      </div>
      {props.monsters.length >= 20 && (
        <div className="grid__wrapper-button">
          <button className="grid__button" type="button" onClick={handleButton}>
            Show more
          </button>
        </div>
      )}
    </div>
  );
}

export default Grid;
