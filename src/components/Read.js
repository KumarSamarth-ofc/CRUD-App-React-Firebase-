import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Read() {
  const navigate = useNavigate();
  let [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if (snapshot.exists) {
      setFruitArray(Object.values(snapshot.val()));
    } else {
      alert("Error");
    }
  };

  return (
      <div>
          <h1>READ</h1>
      <button button onClick={fetchData}>
        {" "}
        Display Button
      </button>
      <ul>
        {fruitArray.map((item, index) => (
          <li key={index}>
            {item.fruitName}: {item.fruitDefinition}
          </li>
        ))}
      </ul>
      <br />
      <br />
      <button className="button1" onClick={() => navigate("/updateread")}>
        Go UPDATEREAD
      </button>{" "}
      <br></br>
      <button className="button1" onClick={() => navigate("/")}>
        Go HOMEPAGE
      </button>
    </div>
  );
}

export default Read;
