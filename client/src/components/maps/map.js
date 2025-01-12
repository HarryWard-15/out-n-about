import Uwamap from "./uwa-grad";
import MandurahMap from "./mandurah-forshore";
import React from "react";

export default function Map(props) {
  console.log(props);
  const tier = props.data.currentQuest.tierName;
  console.log(tier);

  if (tier === "Pedestrian") {
    return MandurahMap();
  } else if (tier === "Rambler") {
    return Uwamap();
  } else
    return (
      <div>
        <h2>You Have Completed All Available Quests! Come Back Soon</h2>
      </div>
    );
}
