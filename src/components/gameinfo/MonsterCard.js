import React, { useState } from "react";

function Card(props) {
  const [data, setData] = useState(props.monster);

  function handleModal() {
    // props.onHandleCard(query);
    alert("It will show the detail information about monster you clicked");
  }
  console.log(data);
  return (
    <>
      <div className="card" onClick={handleModal}>
        <div className="w-3/5">
          <div className="pl-4">
            <h4 className="modal__content-otherStatsTitle">Stats</h4>
            <div className="modal__content-otherStat">
              <div className="modal__content-otherStatContent">
                <span className="modal__content-otherStatContentPower">HP</span>
                <span className="modal__content-otherStatContentValue">
                  {data.hp}
                </span>
              </div>

              <div className="modal__content-otherStatTimeLine">
                <div
                  className="modal__content-otherStatTimeLineStat bg-red-500"
                  style={{ width: data.hp + "%" }}
                ></div>
              </div>
            </div>
            <div className="modal__content-otherStat">
              <div className="modal__content-otherStatContent">
                <span className="modal__content-otherStatContentPower">EP</span>
                <span className="modal__content-otherStatContentValue">
                  {data.ep}
                </span>
              </div>
              <div className="modal__content-otherStatTimeLine">
                <div
                  className="modal__content-otherStatTimeLineStat bg-blue-500"
                  style={{ width: data.ep + "%" }}
                ></div>
              </div>
            </div>

            <div className="modal__content-otherStat">
              <div className="modal__content-otherStatContent">
                <span className="modal__content-otherStatContentPower">
                  attack
                </span>
                <span className="modal__content-otherStatContentValue">
                  {data.attack}
                </span>
              </div>
              <div className="modal__content-otherStatTimeLine">
                <div
                  className="modal__content-otherStatTimeLineStat bg-cyan-300"
                  style={{ width: data.attack + "%" }}
                ></div>
              </div>
            </div>
            <div className="modal__content-otherStat">
              <div className="modal__content-otherStatContent">
                <span className="modal__content-otherStatContentPower">
                  defense
                </span>
                <span className="modal__content-otherStatContentValue">
                  {data.defense}
                </span>
              </div>
              <div className="modal__content-otherStatTimeLine">
                <div
                  className="modal__content-otherStatTimeLineStat bg-blue-700"
                  style={{ width: data.defense + "%" }}
                ></div>
              </div>
            </div>

            <div className="modal__content-otherStat">
              <div className="modal__content-otherStatContent">
                <span className="modal__content-otherStatContentPower">
                  speed
                </span>
                <span className="modal__content-otherStatContentValue">
                  {data.speed}
                </span>
              </div>
              <div className="modal__content-otherStatTimeLine">
                <div
                  className="modal__content-otherStatTimeLineStat bg-yellow-600 "
                  style={{ width: data.speed + "%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/5">
          <p className="text-right mr-4">{data.primary}</p>
          <img
            className="mx-auto"
            width={200}
            height={200}
            src={data.url}
            alt=""
            loading="lazy"
          />
          <h3 className="text-center">{data.name}</h3>
          {/* <h3>{data.primary}</h3> */}
        </div>
      </div>
    </>
  );
}

export default Card;
