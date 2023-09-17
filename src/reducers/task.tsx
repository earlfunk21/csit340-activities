const ADD_TASK = "ADD_TASK";
const ADMIT_TASK = "ADMIT_TASK";
const REMOVE_HIGH_PRIO_QUEUE = "REMOVE_HIGH_PRIO_QUEUE";
const REMOVE_RANDOM_QUEUE_1 = "REMOVE_RANDOM_QUEUE_1";
const REMOVE_RANDOM_QUEUE_2 = "REMOVE_RANDOM_QUEUE_2";
const REMOVE_RANDOM_QUEUE_3 = "REMOVE_RANDOM_QUEUE_3";

export const taskReducer = (state: any, action: any) => {
	switch (action.type) {
		case ADD_TASK:
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			};
		case ADMIT_TASK:
			if (state.tasks.length > 0) {
				const [removeTask, ...updatedTasks] = state.tasks;
				if (removeTask.prio) {
					return {
						...state,
            tasks: updatedTasks,
						highPrio: [...state.highPrio, removeTask],
					};
				} else {
					const queueList = ["queue1", "queue2", "queue3"];
					const randomNumber = Math.floor(Math.random() * 3);
					const newQueue = queueList[randomNumber];
					return {
						...state,
            tasks: updatedTasks,
						[newQueue]: [...state[newQueue], removeTask],
					};
				}
			}
			return state;
    case REMOVE_HIGH_PRIO_QUEUE:
			return {
				...state,
				highPrio: state.highPrio.slice(1),
			};
		case REMOVE_RANDOM_QUEUE_1:
			return {
				...state,
				queue1: state.queue1.slice(1),
			};
		case REMOVE_RANDOM_QUEUE_2:
			return {
				...state,
				queue2: state.queue2.slice(2),
			};
		case REMOVE_RANDOM_QUEUE_3:
			return {
				...state,
				queue3: state.queue3.slice(3),
			};
	}
};


export const ACTION = {ADD_TASK, ADMIT_TASK, REMOVE_HIGH_PRIO_QUEUE, REMOVE_RANDOM_QUEUE_1, REMOVE_RANDOM_QUEUE_2, REMOVE_RANDOM_QUEUE_3};

