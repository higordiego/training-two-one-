interface User {
    id?: number;
    username: string;
    password: string;
    email: string;
    profile_pic?: string;
    role: string;
    description?: string;
    full_name: string;
    date_of_birth: string;
    location: string;
}
  
export default User;
  