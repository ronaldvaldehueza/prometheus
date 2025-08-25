interface ClientMessage {
    add: string;
    edit: string;
    delete: string;
}

const clientMessage: ClientMessage = {
    add: 'Item has been successfully added',
    edit: 'Item has been successfully edited',
    delete: 'Item has been successfully removed'
};

export default clientMessage;
