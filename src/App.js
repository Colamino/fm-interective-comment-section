import { useState } from "react";
import "./App.css";
import Comments from "./components/Comments";
import CurrentUserC from "./components/currentUserC/CurrentUserC";
import Modal from "./components/modal/Modal";
import dataJson from "./data.json";

function App() {
  const [data, setData] = useState(dataJson);
  const [selectedC, setSelectC] = useState("");
  const [selectedR, setSelectR] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);

  return (
    <div className="App">
      {deleteMode && (
        <Modal
          setDeleteMode={setDeleteMode}
          selectedC={selectedC}
          selectedR={selectedR}
          setData={setData}
          data={data}
          setSelectR={setSelectR}
          setSelectC={setSelectC}
        />
      )}
      {data?.comments?.map((comment) => (
        <Comments
          key={comment?.id}
          id={comment?.id}
          userImg={comment?.user?.image?.png}
          username={comment?.user?.username}
          createAt={comment?.createdAt}
          content={comment?.content}
          scores={comment?.score}
          replies={comment?.replies}
          data={data}
          setData={setData}
          setDeleteMode={setDeleteMode}
          setSelectC={setSelectC}
          setSelectR={setSelectR}
        />
      ))}
      <CurrentUserC setData={setData} />
    </div>
  );
}

export default App;
