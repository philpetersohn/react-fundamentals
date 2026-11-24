import { useEffect, useState } from "react";
import type { employees } from "./Types.ts";

function App() {
  const [data, setData] = useState<employees[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3001/api/employees");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Request failed");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <p>
      {data.map((employee) => (
        <li key={employee.id}>{employee.name}</li>
      ))}
    </p>
  );
}
export default App;
