import { useState } from 'react'
import './App.css'
import { DeleteOutlined } from '@ant-design/icons';
import { Tabs, Input, Button, Checkbox } from "antd";

const { TabPane } = Tabs;

function App() {
 const [tasks, setTasks] = useState([]);
 const [activeTab, setActiveTab] = useState ("All");
 const [taskName, setTaskName] = useState("");

//  addTask
const addTask = (name) => {
  if (name.trim()) {
    setTasks([...tasks, { id: Date.now(), name: name.trim(), active: true }]);
    setTaskName(""); 
  }
};

const handleSubmitForm = (e) => {
  e.preventDefault(); 
  addTask(taskName);
};

// deleteTask
 const deleteTask = (taskId) => {
  setTasks(tasks.filter((task) => task.id !== taskId));
 }
// deleteAllCompletedTasks
 const deleteAllCompletedTasks = () => {
  setTasks(tasks.filter((task) => task.active))
 }

 const toggleTask = (taskId) => {
  setTasks(tasks.map((task) => task.id === taskId ? {...task, active: !task.active} : task))
 }

 const filteredTasks = tasks.filter((task) => {
  if (activeTab === "All") return true;
  if (activeTab === "Active") return task.active;
  if (activeTab === "Completed") return !task.active;
  return false;
});

  return (
    <>
    <div>
      <h1 className="text-black text-5xl text-center p-8">#todo</h1>
      <div>
        <Tabs defaultActiveKey= {activeTab} centered onChange={setActiveTab} className="w-full">
          <TabPane tab={<span className="w-full text-center">All</span>} key="All"/>
          <TabPane tab="Active" key="Active"/>
          <TabPane tab="Completed" key="Completed"/>
        </Tabs>

        {/* addTask */}
        {activeTab !== "Completed" && (
          <form onSubmit={handleSubmitForm} className="flex flex-row gap-4 m-4">
            <Input 
              className="!h-10 !px-4 !py-6" 
              placeholder="add details" 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
             />
            <Button 
              className="!h-10 !px-8 !py-6" 
              type="primary" 
              onClick={handleSubmitForm}
              >
                Add
            </Button>
          </form>
          )
        }


        <ul className="m-4">
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            <Checkbox
              checked={!task.active}
              onChange={() => toggleTask(task.id)}
            />
            <span className={`ml-2 ${task.active ? "" : "line-through"}`}>
              {task.name}
            </span>
            {activeTab === "Completed" && (
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => deleteTask(task.id)}
                className="ml-auto !text-xl !text-gray-500 hover:!text-red-500 !border-none !shadow-none"
              >
              </Button>
            )}
          </li>
        ))}
      </ul>
      {/* Delete All Completed */}
      {activeTab === "Completed" && (
        <div className="flex justify-end">
        <Button
          type="primary"
          danger
          onClick={deleteAllCompletedTasks}
          className="m-4 text-center "
          icon={<DeleteOutlined />}
        >
          Delete All
        </Button>
        </div>
      )}
      </div>
      </div>
    </>
  )
}

export default App
