export interface Employees {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  company: {
    name: string;
  };
}
