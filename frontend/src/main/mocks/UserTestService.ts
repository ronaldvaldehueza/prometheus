interface User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    groups: string;
    state: string;
}

const _user: User[] = [{
    "first_name": "Laurent", "last_name": "Fecteau",
    "email": "LaurentFecteau@teleworm.us", "phone": "04.76.36.38.36",
    "groups": "Nomal", "state": "Active"
}];

const getAll = (): User[] => {
    return _user;
};

const get = (id: number): User | undefined => {
    return _user.find(item => item.id === id);
};

const create = (data: User): void => {
    _user.push(data);
};

const update = (old: User, data: User): void => {
    const foundIndex = _user.findIndex(item => item === old);
    if (foundIndex > -1) {
        _user[foundIndex] = data;
    }
};

const remove = (id: number): void => {
    const index = _user.findIndex(item => item.id === id);
    if (index > -1) {
        _user.splice(index, 1);
    }
};

const removeAll = (): void => {
    _user.length = 0;
};

const findByTitle = (title: string): User[] => {
    return _user.filter(item => item.first_name.includes(title) || item.last_name.includes(title));
};

const UserTestService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default UserTestService;