import { useState } from "react";
import Priority from "./Priority";
import "./App.css";

const taskList = [
  { id: 0, task: "Go to school", done: false, priority: 1 },
  {
    id: 1,
    task: "Go to gym",
    done: false,
    priority: 1,
  },
  {
    id: 2,
    task: "Study 2 hours",
    done: false,
    priority: 1,
  },
  {
    id: 3,
    task: "Read book 30 minutes",
    done: false,
    priority: 1,
  },
];

const App = () => {
  const [finalTaskList, setFinalTaskList] = useState(taskList);
  return (
    <div className="app">
      <Header />
      {finalTaskList.length === 0 ? (
        <NoTask />
      ) : (
        <TaskList
          finalTaskList={finalTaskList}
          setFinalTaskList={setFinalTaskList}
        />
      )}

      <AddNewTask
        finalTaskList={finalTaskList}
        setFinalTaskList={setFinalTaskList}
      />
    </div>
  );
};

const Header = () => {
  return (
    <div className="header">
      <h1 className="header__title">Today's TODO</h1>
      <h2 className="header__subtitle">
        Keep Going: One Step Closer Every Day!
      </h2>
    </div>
  );
};
const AddNewTask = ({ finalTaskList, setFinalTaskList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [pri, setPri] = useState(1);
  const handleSubmit = function (e) {
    e.preventDefault();
    if (!newTask) return;
    const newItem = {
      id: !finalTaskList.length ? 0 : finalTaskList.length,
      task: newTask,
      done: false,
      priority: pri,
    };
    setFinalTaskList((items) => [...items, newItem]);
    setNewTask("");
    setIsOpen(false);
  };
  return (
    <div className="newtask__container">
      <button
        className="btn newtask__button"
        onClick={() => setIsOpen((o) => !o)}
      >
        {isOpen === true ? "Close" : "Add new task"}
      </button>

      {isOpen && (
        <>
          <form className="newtask__form" onSubmit={handleSubmit}>
            <label htmlFor="">What's your plan?</label>
            <input
              type="text"
              className="newtask__input"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <label htmlFor="priortiy" style={{ marginTop: "-4px" }}>
                Priority:
              </label>
              <Priority pri={pri} onSetPri={setPri} />
            </div>
            <button className="btn  newtask__add-btn">Add!</button>
          </form>
        </>
      )}
    </div>
  );
};

const TaskList = ({ finalTaskList, setFinalTaskList }) => {
  const sortedList = finalTaskList.slice().sort((a, b) => {
    if (!a.done && !b.done) {
      return Number(b.priority) - Number(a.priority);
    }
  });
  return (
    <ul className="tasks__list">
      {sortedList.map((task) => (
        <Task
          taskObj={task}
          finalTaskList={finalTaskList}
          setFinalTaskList={setFinalTaskList}
          key={task.id}
        />
      ))}
    </ul>
  );
};

const Task = ({ taskObj, finalTaskList, setFinalTaskList }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <li className={`task__item ${isSelected === true ? "task__done" : ""}`}>
      {taskObj.task}
      <Delete
        finalTaskList={finalTaskList}
        setFinalTaskList={setFinalTaskList}
        taskObj={taskObj}
      />
      <CheckBox
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        finalTaskList={finalTaskList}
        setFinalTaskList={setFinalTaskList}
        taskObj={taskObj}
      />
      <span
        className={`task__item-priority ${
          taskObj.priority === 1
            ? "task__item-priority--low"
            : taskObj.priority === 2
            ? "task__item-priority--med"
            : "task__item-priority--high"
        }`}
      >
        {taskObj.priority === 1 && "Low"}
        {taskObj.priority === 2 && "Medium"}
        {taskObj.priority === 3 && "High"}
      </span>
    </li>
  );
};

const CheckBox = ({
  isSelected,
  setIsSelected,
  finalTaskList,
  setFinalTaskList,
  taskObj,
}) => {
  const handleCheckboxChange = () => {
    setIsSelected((isSelected) => !isSelected);
    const updatedFinalTaskList = finalTaskList.map((task) =>
      task.id === taskObj.id ? { ...task, done: !isSelected } : task
    );
    updatedFinalTaskList.sort((a, b) => Number(a.done) - Number(b.done));
    setFinalTaskList(updatedFinalTaskList);
  };
  return (
    <input
      type="checkbox"
      checked={isSelected}
      onChange={handleCheckboxChange}
    />
  );
};

const Delete = ({ finalTaskList, setFinalTaskList, taskObj }) => {
  const handleClick = () => {
    const updatedFinalTaskList = finalTaskList.filter(
      (task) => task.id !== taskObj.id
    );
    setFinalTaskList(updatedFinalTaskList);
  };
  return (
    <button className="task__item-delete" onClick={handleClick}>
      X
    </button>
  );
};

const NoTask = () => {
  return <h3 className="header__notask">Start adding tasks for today!</h3>;
};

export default App;
