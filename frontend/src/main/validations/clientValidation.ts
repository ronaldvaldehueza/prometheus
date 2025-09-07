interface CandidateValidation {
    first_name: string;
    last_name: string;
    phone: string;
    password: string;
    email: string;
    company: string;
}

const candidateValidation: CandidateValidation = {
    first_name: "First name is required.",
    last_name: "Last name is required.",
    phone: "Telephone is required.",
    password: "Password is required.",
    email: "Email is required",
    company: "Company is required."
};

export default candidateValidation;