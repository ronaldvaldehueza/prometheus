interface Skill {
    id: number;
    content: string;
}

const _skills: Skill[] = [];

const getAll = (): Skill[] => {
    return _skills;
};

const get = (id: number): Skill | undefined => {
    return _skills.find(item => item.id === id);
};

const create = (data: Skill): void => {
    _skills.push(data);
};

const update = (old: Skill, data: Skill): void => {
    const foundIndex = _skills.findIndex(item => item.id === old.id);
    if (foundIndex > -1) {
        _skills[foundIndex] = data;
    }
};

const remove = (id: number): void => {
    const index = _skills.findIndex(item => item.id === id);
    if (index > -1) {
        _skills.splice(index, 1);
    }
};

const removeAll = (): void => {
    _skills.length = 0;
};

const findByTitle = (title: string): Skill[] => {
    return _skills.filter(item => item.content.includes(title));
};

const MessageTestService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default MessageTestService;