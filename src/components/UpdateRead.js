import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

function UpdateRead() {
  const navigate = useNavigate();

  let [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if (snapshot.exists) {
      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map((myFireId) => {
        return {
          ...myData[myFireId],
          fruitId: myFireId,
        };
      });

      setFruitArray(temporaryArray);
    } else {
      alert("Error");
    }
  };

  const deleteFruit = async (fruitIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits/" + fruitIdParam);
    await remove(dbRef);
    window.location.reload();
  };

  return (
    <div>
      <h1>UPDATE READ</h1>
      <button button onClick={fetchData}>
        {" "}
        Display Button
      </button>
      <ul>
        {fruitArray.map((item, index) => (
          <li key={index}>
            {item.fruitName}: {item.fruitDefinition} :{item.fruitId}
            <button
              className="button1"
              onClick={() => navigate(`/updatewrite/${item.fruitId}`)}
            >
              UPDATE
            </button>
            <button
              className="button1"
              onClick={() => deleteFruit(item.fruitId)}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
      <button className="button1" onClick={() => navigate("/")}>
        Go HOMEPAGE
      </button>{" "}
      <br></br>
      <button className="button1" onClick={() => navigate("/read")}>
        Go READ PAGE
      </button>
    </div>
  );
}

export default UpdateRead;
