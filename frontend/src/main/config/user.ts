interface UserDetail {
    name: string;
    birthday: string;
    email: string;
    telephone: string;
    address: string;
    role: string;
}

export default class CurrentUser {
    static USER_NAME = "Admin";
    static CONNECTED_USER = false;
    static HTTP_ERR_MESSAGE = "";
    static USER_DETAIL: UserDetail = {
        name: '',
        birthday: '',
        email: '',
        telephone: '',
        address: '',
        role: ''
    };
    static DELTE_MSG = 'Are you sure you want to delete ?';
    static SETTINGS_UPDATE_MSG = "Your settings has been updated.";
}