import React from "react";

function Queue({ title, tasks, removeTask }) {
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		let timer;

		if (count > 0) {
			timer = setInterval(() => {
				setCount((prevCount) => prevCount - 1);
			}, 1000);
		}

		if (count <= 0) {
			removeTask();
		}

		return () => {
			if (timer) {
				clearInterval(timer);
			}
		};
	}, [count]);

  React.useEffect(() => {
    if(tasks.length > 0 && count === 0){
      setCount(10);
    }
  }, [tasks])

	return (
		<div className="queue">
			<h3>{title}</h3>
			<div className="tasks">
				{tasks.map((task, index) => (
					<div
						key={index}
						className={task.prio ? "task prio" : "task"}>
						{task.number}
					</div>
				))}
			</div>
      <h3>Duration</h3>
      <div className="duration">
        <div style={{width: `${(count * 10)}%`}} className="progress"></div>
      </div>
		</div>
	);
}

function App() {
	const [tasks, setTasks] = React.useState([]);
	const [highPrioTasks, setHighPrioTasks] = React.useState([]);
	const [randomQ1, setRandomQ1] = React.useState([]);
	const [randomQ2, setRandomQ2] = React.useState([]);
	const [randomQ3, setRandomQ3] = React.useState([]);

	const addRandomTask = () => {
		let randomNumber = Math.floor(Math.random() * 200);
		let randomPrio = Math.random() < 0.5;
		let newTask = {
			number: randomNumber,
			prio: randomPrio,
		};
		setTasks((prev) => [...prev, newTask]);
		console.log(newTask);
	};

	const admitTask = () => {
		if (tasks.length > 0) {
			const removeTask = tasks[0];
			const updatedTasks = tasks.slice(1);
			setTasks(updatedTasks);
			if (!removeTask.prio) {
				const randomListQ = [setRandomQ1, setRandomQ2, setRandomQ3];
				const randomNumber = Math.floor(Math.random() * 3);
				const randomQueue = randomListQ[randomNumber];
				randomQueue((prev) => [...prev, removeTask]);
				return;
			}
			setHighPrioTasks((prev) => [...prev, removeTask]);
		}
	};

	return (
		<div className="App">
			<button
				className="btn"
				onClick={addRandomTask}>
				ADD RANDOM TASKS
			</button>
			<h3>Tasks Queue</h3>
			<div className="tasks">
				{tasks.map((task, index) => (
					<div
						key={index}
						className={task.prio ? "task prio" : "task"}>
						{task.number}
					</div>
				))}
			</div>
			<button
				className="btn"
				onClick={admitTask}>
				ADMIT TASK
			</button>

			<Queue
				title="High Priority Queue"
				tasks={highPrioTasks}
				removeTask={() => setHighPrioTasks(highPrioTasks.slice(1))}
			/>
			<Queue
				title="Random Queue 1"
				tasks={randomQ1}
				removeTask={() => setRandomQ1(randomQ1.slice(1))}
			/>
			<Queue
				title="Random Queue 2"
				tasks={randomQ2}
				removeTask={() => setRandomQ2(randomQ2.slice(1))}
			/>
			<Queue
				title="Random Queue 3"
				tasks={randomQ3}
				removeTask={() => setRandomQ3(randomQ3.slice(1))}
			/>
		</div>
	);
}

export default App;
