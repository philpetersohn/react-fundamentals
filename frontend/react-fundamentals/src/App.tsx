import { useEffect, useMemo, useState } from "react";
import type { Employees } from "./Types.ts";

function App() {
  const [data, setData] = useState<Employees[]>([]);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null,
  );

  const visibleEmployees = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    return data.filter((employee) =>
      employee.name.toLowerCase().includes(normalizedQuery),
    );
  }, [data, debouncedQuery]);

  const selectedEmployee = data.find(
    (employee) => employee.id === selectedEmployeeId,
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

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query]);

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
            <li key={employee.id}>
              <button
                type="button"
                aria-pressed={employee.id === selectedEmployeeId}
                onClick={() => setSelectedEmployeeId(employee.id)}
              >
                {employee.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedEmployee && (
        <section aria-label="Selected employee">
          <p>{selectedEmployee.name}</p>
          <p>{selectedEmployee.email}</p>
          <p>{selectedEmployee.role}</p>
          <p>{selectedEmployee.department}</p>
          <p>{selectedEmployee.company.name}</p>
        </section>
      )}
    </main>
  );
}
export default App;
