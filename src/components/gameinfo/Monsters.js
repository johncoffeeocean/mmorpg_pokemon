import React, { useState, useEffect } from "react";

import Search from "../utils/Search";
import Grid from "./MonsterGrid";

import MonsterDB from "../database/monster.json";

const Monsters = () => {
  const [monsters, setMonsters] = useState(MonsterDB);
  console.log("monsters", monsters);

  function handleSearch(textSerach) {
    let filtered = [];
    MonsterDB.map((monster) => {
      if (monster.name.indexOf(textSerach) > -1) {
        filtered.push(monster);
      }
    });
    setMonsters(filtered);
  }

  return (
    <div className=" p-8 ">
      <Search onHandleSearch={handleSearch} />
      {monsters ? <Grid monsters={monsters} /> : <div>'Pokemon not found'</div>}
    </div>
  );
};

export default Monsters;
