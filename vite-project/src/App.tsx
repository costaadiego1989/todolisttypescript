import { useState, ChangeEvent } from "react";

import "./App.css";

import Logo from "./assets/Logo.png";
import TaskIcon from "./assets/Clipboard.png";
import Trash from "./assets/trash.png";

import Input from "./components/input";
import Button from "./components/button";

interface ITask {
  id: string;
  title: string;
  active?: boolean;
  finished?: boolean;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<ITask[]>([]);
  const [checked, setChecked] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCreateTask = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    let count = 0;

    const addTask: ITask = {
      id: (count++).toString(),
      title: input,
      active: true,
      finished: false,
    };

    setTasks([...tasks, addTask]);
    setInput("");
  };

  const handleFinishTask = (
    props: ITask,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFinishedTasks([...finishedTasks, props]);

    if (finishedTasks.some((task) => task.title === event.target.value)) {
      setFinishedTasks(
        tasks.filter((task) => task.title !== event.target.value)
      );
    }
    setChecked(event.target.value);
  };

  const handleDelete = (props: ITask) => {
    setTasks(tasks.filter((task) => task.title !== props.title));
    setFinishedTasks(tasks.filter((task) => task.title !== props.title));
  };

  return (
    <>
      <div className="header-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      <div className="body-container">
        <form onSubmit={handleCreateTask}>
          <Input
            value={input}
            type="text"
            placeholder="Adicionar uma nova tarefa"
            onChange={handleChange}
          />
          <Button type="submit" text="Criar +" />
        </form>
      </div>

      <div className="body-warnings">
        <div>
          <p style={{ color: "#4EA8DE", fontWeight: "bold" }}>
            Tarefas criadas <span>{tasks.length}</span>
          </p>
        </div>
        <div>
          {tasks.length === 0 ? (
            <p style={{ color: "#8284FA", fontWeight: "bold" }}>Concluídas <span>{finishedTasks.length}</span></p>
          ) : (
            <p style={{ color: "#8284FA", fontWeight: "bold" }}>
              {tasks.length} de <span>{finishedTasks.length}</span> concluídas
            </p>
          )}
        </div>
      </div>

      <div className="body-content">
        {tasks.length === 0 ? (
          <div>
            <img src={TaskIcon} alt="Task Icon" />
            <p>
              Você ainda não tem tarefas cadastradas
              <br />
              Crie tarefas e organize seus itens a fazer.
            </p>
          </div>
        ) : (
          <ul>
            {tasks.map((task) => {
              return (
                <>
                  <li key={task.id}>
                    <Input
                      type="checkbox"
                      value={task.title}
                      name="test"
                      checked={checked === task.title}
                      placeholder="Adicionar uma nova tarefa"
                      onChange={(e) => handleFinishTask(task, e)}
                    />
                    {finishedTasks.some((task) => task.title === task.title) ? (
                      <h3 className="finished">{task.title}</h3>
                    ) : (
                      <h3>{task.title}</h3>
                    )}
                    <img
                      src={Trash}
                      alt="Trash"
                      onClick={() => handleDelete(task)}
                    />
                  </li>
                </>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
