import { useEffect, useState } from "react";
import type { employees } from "./Types.ts";

function App() {
  const [data, setData] = useState<employees[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const visibleEmployees = data.filter((employee) =>
    employee.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3001/api/employees");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const body = await response.text();
        if (!body) {
          setData([]);
          return;
        }

        const result = JSON.parse(body);
        if (!Array.isArray(result)) {
          throw new Error("Unexpected response");
        }
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

  if (data.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <main>
      <input
        type="search"
        value={query}
        placeholder="Search by name"
        aria-label="Search employees by name"
        onChange={(event) => setQuery(event.target.value)}
      />
      {visibleEmployees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {visibleEmployees.map((employee) => (
            <li key={employee.id}>{employee.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
export default App;
