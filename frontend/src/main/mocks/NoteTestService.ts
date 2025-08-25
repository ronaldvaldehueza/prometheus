interface Location {
    id: number;
    title: string;
}

const _location: Location[] = [];

const getAll = (): Location[] => {
    return _location;
};

const get = (id: number): Location | undefined => {
    return _location.find(item => item.id === id);
};

const create = (data: Location): void => {
    _location.push(data);
};

const update = (old: Location, data: Location): void => {
    const foundIndex = _location.findIndex(item => item.id === old.id);
    if (foundIndex > -1) {
        _location[foundIndex] = data;
    }
};

const remove = (id: number): void => {
    const index = _location.findIndex(item => item.id === id);
    if (index > -1) {
        _location.splice(index, 1);
    }
};

const removeAll = (): void => {
    _location.length = 0;
};

const findByTitle = (title: string): Location[] => {
    return _location.filter(item => item.title.includes(title));
};

const NoteTestService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default NoteTestService;