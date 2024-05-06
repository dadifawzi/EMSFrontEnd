export class User {
  user_id: number;
 public username: string;
  email: string;
  jobTitle: string;
  password: string;
  phone: string;
  photo_link: string;
  role: string;
  [key: string]: any;
  constructor(
    user_id: number,
    username: string,
    email: string,
    jobTitle: string,
    password: string,
    phone: string,
    photo_link: string,
    role: string
  ) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.jobTitle = jobTitle;
    this.password = password;
    this.phone = phone;
    this.photo_link = photo_link;
    this.role = role;
  }
}
