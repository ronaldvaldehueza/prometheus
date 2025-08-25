interface Task {
    id?: number;
    title: string;
    starting_date: string;
    ending_date: string;
    users: string;
    client: string;
    status: string;
}

const _tasks: Task[] = [{
    "title": "Contruire une Maison", "starting_date": "12/12/2009",
    "ending_date": "13/12/2010", "users": "Manville Goudreau", "client": "Laure Saucier", "status": "en cours"
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

const ProjectTestService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default ProjectTestService;