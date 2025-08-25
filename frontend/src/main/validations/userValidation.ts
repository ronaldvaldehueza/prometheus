interface UserValidation {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    groups: string;
}

const userValidation: UserValidation = {
    first_name: "First name is required.",
    last_name: "Last name is required.",
    email: "Email is required.",
    phone: "Telephone is required.",
    password: "password is required.",
    groups: "group is required."
};

export default userValidation;