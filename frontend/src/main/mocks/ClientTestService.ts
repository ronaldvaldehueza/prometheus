interface Staff {
    id?: number;
    company: string;
    last_name: string;
    first_name: string;
    email: string;
    phone: string;
}

const _staff: Staff[] = [{
    "company": "Exact Realty", "last_name": "Zerbino",
    "first_name": "Aubé", "email": "ZerbinoAube@armyspy.com", "phone": "01.42.64.12.81"
}];

const getAll = (): Staff[] => {
    return _staff;
};

const get = (id: number): Staff | undefined => {
    return _staff.find(item => item.id === id);
};

const create = (data: Staff): void => {
    _staff.push(data);
};

const update = (old: Staff, data: Staff): void => {
    const foundIndex = _staff.findIndex(item => item === old);
    if (foundIndex > -1) {
        _staff[foundIndex] = data;
    }
};

const remove = (id: number): void => {
    // This is likely buggy as items don't have numeric ids to splice by
    _staff.splice(id, 1);
};

const removeAll = (): void => {
    _staff.length = 0;
};

const findByTitle = (title: string): Staff[] => {
    return _staff.filter(item => item.first_name.includes(title) || item.last_name.includes(title));
};

const ClientTestService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default ClientTestService;