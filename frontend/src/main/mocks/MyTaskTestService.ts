interface Category {
    id: number;
    name: string;
}

const _categories: Category[] = [];

const getAll = (): Category[] => {
    return _categories;
};

const get = (id: number): Category | undefined => {
    return _categories.find(item => item.id === id);
};

const create = (data: Category): void => {
    _categories.push(data);
};

const update = (old: Category, data: Category): void => {
    const foundIndex = _categories.findIndex(item => item.id === old.id);
    if (foundIndex > -1) {
        _categories[foundIndex] = data;
    }
};

const remove = (id: number): void => {
    const index = _categories.findIndex(item => item.id === id);
    if (index > -1) {
        _categories.splice(index, 1);
    }
};

const removeAll = (): void => {
    _categories.length = 0;
};

const findByTitle = (title: string): Category[] => {
    return _categories.filter(item => item.name.includes(title));
};

const MyTaskTestService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default MyTaskTestService;