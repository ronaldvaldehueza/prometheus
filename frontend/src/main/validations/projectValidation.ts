interface ProjectValidation {
    title: string;
    description: string;
    starting_date: string;
    ending_date: string;
    users: string;
    client: string;
    status: string;
}

const projectValidation: ProjectValidation = {
    title: "title is required",
    description: "description is required",
    starting_date: "starting date is required",
    ending_date: "ending date is required",
    users: "users is required ",
    client: "client is required",
    status: "status is required"
};

export default projectValidation;