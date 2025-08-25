interface NoteMessage {
    add: string;
    edit: string;
    delete: string;
}

const noteMessage: NoteMessage = {
    add: 'Item has been successfully added',
    edit: 'Item has been successfully edited',
    delete: 'Item has been successfully removed'
};

export default noteMessage;
