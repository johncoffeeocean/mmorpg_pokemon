import React, { useState, useEffect } from "react";

import Search from "../utils/Search";
import Grid from "./MonsterGrid";

import MonsterDB from "../database/monster.json";

const Monsters = () => {
  // const [monsters, setMonsters] = useState(MonsterDB);
  // console.log("monsters", monsters);

  // function handleSearch(textSerach) {
  //   console.log(textSerach);
  //   let filtered = [];
  //   MonsterDB.map((monster) => {
  //     if (monster.name.indexOf(textSerach) > -1) {
  //       filtered.push(monster);
  //     }
  //   });
  //   setMonsters(filtered);
  // }

  const [monsters, setMonsters] = useState(MonsterDB);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let filtered = [];
    MonsterDB.map((monster) => {
      if (monster.name.indexOf(searchText) > -1) {
        filtered.push(monster);
      }
    });
    setMonsters(filtered);
    console.log(monsters, searchText, filtered);
  }, [searchText]);

  function handleSearch(textSearch) {
    if (textSearch) {
      setSearchText(textSearch);
    } else {
      setMonsters(MonsterDB);
    }
  }

  return (
    <div className="mt-13 p-8 ">
      <div className="content-title" style={{ textAlign: "center" }}>
        Monster
      </div>
      <Search onHandleSearch={handleSearch} />
      {monsters.length ? (
        <Grid monsters={monsters} />
      ) : (
        <div>'Pokemon not found'</div>
      )}
    </div>
  );
};

export default Monsters;
