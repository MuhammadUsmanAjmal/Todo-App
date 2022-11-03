import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const [data, setData] = useState(null);
  const [form, setForm] = useState([]);

  const changeHandler = (e) => {
    setData(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setForm([...form, data]);
    console.log(data);
  };

  const deleteItems = (item_id) => {
    console.log(item_id);
    const updateditems = data.filter((item) => {
      return item_id !== item.id;
    });
    setData(updateditems);
  };

  // const deleteItems = (index) => {
  // const newContacts = [...data];
  // const index = data.findIndex((user) => user.id === index);
  // newContacts.splice(index, 1);
  // setData(newContacts);
  // };

  return (
    <div className="App">
      <div className="container">Todo App</div>
      <div className="form">
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={changeHandler}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {form.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td>
                  <i
                    className="far fa-trash-alt add-btn1"
                    title="Delete Item"
                    onClick={deleteItems}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
