interface MyTaskMessage {
    add: string;
    edit: string;
    delete: string;
}

const myTaskMessage: MyTaskMessage = {
    add: 'Item has been successfully added',
    edit: 'Item has been successfully edited',
    delete: 'Item has been successfully removed'
};

export default myTaskMessage;
