import { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
// import { Modal } from "react-bootstrap";

function App(props) {
  const [input, setInput] = useState({ name: "", profession: "", age: "" });
  const [item, setItem] = useState([]);
  const [deleteItem, setDeleteItem] = useState("");
  const [editID, setEditID] = useState();
  const [update, setUpdate] = useState(false);
  const [modal, setModal] = useState(false);

  const backdrop = useRef();

  async function getDB() {
    const res = await axios.get(
      "https://react-http-7341c-default-rtdb.firebaseio.com/users.json"
    );
    const allData = res.data;
    let temp = [];
    for (const key in allData) {
      temp.push({
        id: allData[key].id,
        name: allData[key].name,
        profession: allData[key].profession,
        age: allData[key].age,
        parentId: key,
      });
    }
    setItem(temp);
  }
  useEffect(() => {
    getDB();
  }, []);

  const deleteItems = async (id) => {
    try {
      await axios.delete(
        `https://react-http-7341c-default-rtdb.firebaseio.com/users/${id}.json`
      );
      getDB();
      setModal(false);
      localStorage.setItem("allData",JSON.stringify(deleteItems))
    } catch (error) {}
  };
  const SubmitAddHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: input.name,
      profession: input.profession,
      age: input.age,
    };
    try {
      await axios.post(
        `https://react-http-7341c-default-rtdb.firebaseio.com/users.json`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
    getDB();
    setItem([...item, data]);
    console.log({item});
    setInput({ name: "", profession: "", age: "" });
    localStorage.setItem("allData" ,JSON.stringify([...item]))
  };


  useEffect(()=>{
const saveData =JSON.parse(localStorage.getItem("allData"))
if (saveData){
   setItem(saveData)
}
  },[])
  const handleUpdateSubmit = async (e) => {
    const data = {
      name: input.name,
      profession: input.profession,
      age: input.age,
    };
    e.preventDefault();
    try {
      await axios.put(
        `https://react-http-7341c-default-rtdb.firebaseio.com/users/${editID}.json`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
    getDB();
    setItem([...item, data]);
    setInput({ name: "", profession: "", age: "" });
    setUpdate(false);
  };

  const updateItems = (id) => {
    let newEdit1 = item.find((elem) => {
      return elem.parentId === id;
    });
    setUpdate(true);
    setEditID(id);
    setInput(newEdit1);
  };

  const changeInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const changeInputHandler1 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  if (backdrop.current) {
    console.log("Hello");
  }

  return (
    <>
      <div className="App">
        <div ref={backdrop} className={modal && "overlay"}></div>
        <div className="container">
          <h1>Todo App</h1>
        </div>
        <div className="add">
          <div className="submit">
            {!update && (
              <form onSubmit={SubmitAddHandler}>
                <input
                  type="text"
                  required
                  placeholder="Enter Name"
                  name="name"
                  onChange={changeInputHandler}
                  value={input.name}
                />
                <input
                  type="text"
                  required
                  placeholder="Enter Profession"
                  name="profession"
                  onChange={changeInputHandler}
                  value={input.profession}
                />
                <input
                  type="text"
                  required
                  placeholder="Enter Age"
                  name="age"
                  onChange={changeInputHandler}
                  value={input.age}
                />
                <button type="submit">Add </button>
              </form>
            )}
          </div>

          <div className="update">
            {update && (
              <form onSubmit={handleUpdateSubmit}>
                <input
                  type="text"
                  required
                  placeholder="Enter Update Name"
                  name="name"
                  onChange={changeInputHandler1}
                  value={input.name}
                />
                <input
                  type="text"
                  required
                  placeholder="Enter Update Profession"
                  name="profession"
                  onChange={changeInputHandler1}
                  value={input.profession}
                />
                <input
                  type="text"
                  required
                  placeholder="Enter Update Age"
                  name="age"
                  onChange={changeInputHandler1}
                  value={input.age}
                />

                <button type="submit">Update</button>
              </form>
            )}
          </div>
        </div>
        {/* </div> */}
        <div className="table-wrap">
          <table>
            <thead>
              {item.length > 0 && (
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PROFESSION</th>
                  <th>AGE</th>
                  <th>ACTION</th>
                </tr>
              )}
            </thead>
            <tbody>
              {item.map((elem, index) => {
                const { parentId, name, profession, age } = elem;
                return (
                  <tr key={parentId}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{profession}</td>
                    <td>{age}</td>
                    <td>
                      <div className="App-btn">
                        <i
                          className="far fa-trash-alt add-btn1"
                          title="Delete Item"
                          onClick={() => {
                            setModal(true);
                            setDeleteItem(elem.parentId);
                          }}
                        ></i>
                        <i
                          className="fas fa-edit add-btn1"
                          title="Edit Item"
                          onClick={() => updateItems(elem.parentId)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {modal && (
          <div className="parentModal ">
            <div className="xbtn">
              <button
                onClick={() => {
                  setModal(false);
                }}
              >
                x
              </button>
            </div>
            <div className="childmodal">
              <div className="textmodal">
                <p>Are You Sure You Want To Delete This Data?</p>
              </div>
              <div class="modal-btn">
                <button
                  type="button1"
                  className="delbtn
                "
                  onClick={() => deleteItems(deleteItem)}
                >
                  Sure
                </button>

                <button
                  type="button"
                  className="clbtn"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
