export type Employee = {
  id: number;
  name: string;
  email: string;
  department: "Engineering" | "Design" | "Product" | "Operations";
  role: string;
  company: { name: string };
};

const names = [
  ["Alice Johnson", "Frontend Engineer", "Engineering"],
  ["Bob Smith", "Product Designer", "Design"],
  ["Carol Lee", "Backend Engineer", "Engineering"],
  ["David Chen", "Product Manager", "Product"],
  ["Eva Martinez", "QA Engineer", "Engineering"],
  ["Frank Wilson", "Operations Analyst", "Operations"],
  ["Grace Kim", "UX Researcher", "Design"],
  ["Henry Patel", "Platform Engineer", "Engineering"],
  ["Iris Brown", "Product Analyst", "Product"],
  ["Jack Nguyen", "Support Specialist", "Operations"],
  ["Kara Davis", "Mobile Engineer", "Engineering"],
  ["Leo Thompson", "Design Lead", "Design"],
] as const;

export const employees: Employee[] = names.map(([name, role, department], index) => ({
  id: index + 1,
  name,
  email: `${name.toLowerCase().replace(" ", ".")}@northstar.example`,
  role,
  department,
  company: { name: "Northstar Labs" },
}));
