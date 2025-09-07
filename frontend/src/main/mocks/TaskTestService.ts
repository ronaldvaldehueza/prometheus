interface Task {
    id?: number;
    project_id: string;
    title: string;
    due_date: string;
    priority: string;
    users: string;
    status: string;
}

const _tasks: Task[] = [{
    "project_id": "Construire une maison", "title": "La préparation du terrain",
    "due_date": "12/12/2009", "priority": "Urgent", "users": "Melville Poissonnier", "status": "Active"
}];

const getAll = (): Task[] => {
    return _tasks;
};

const get = (id: number): Task | undefined => {
    return _tasks.find(item => item.id === id);
};

const create = (data: Task): void => {
    _tasks.push(data);
};

const update = (old: Task, data: Task): void => {
    const foundIndex = _tasks.findIndex(item => item === old);
    if (foundIndex > -1) {
        _tasks[foundIndex] = data;
    }
};

const remove = (id: number): void => {
    const index = _tasks.findIndex(item => item.id === id);
    if (index > -1) {
        _tasks.splice(index, 1);
    }
};

const removeAll = (): void => {
    _tasks.length = 0;
};

const findByTitle = (title: string): Task[] => {
    return _tasks.filter(item => item.title.includes(title));
};

const TaskTestService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default TaskTestService;