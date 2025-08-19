import { useEffect, useState, FormEvent, useContext } from 'react';
import { fetchLoginLogs } from '../../utils/activity';
import { AuthContext } from '../../context/AuthContext';

interface LogEntry {
  email: string;
  timestamp: string;
}

const AdminPage = () => {
  const { profile } = useContext(AuthContext);
  const adminEmail = process.env.ADMIN_EMAIL;
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      password === process.env.ADMIN_PASSWORD &&
      profile?.email === adminEmail
    ) {
      setAuthorized(true);
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchLoginLogs().then(setLogs).catch(console.error);
    }
  }, [authorized]);

  if (profile?.email !== adminEmail) {
    return <p>Unauthorized</p>;
  }

  if (!authorized) {
    return (
      <form onSubmit={submitHandler}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
        />
        <button type="submit">Enter</button>
      </form>
    );
  }
  const paginated = logs.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div>
      <h1>Login Logs</h1>
      <label>
        Per page:
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(0);
          }}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <ul>
        {paginated.map((log) => (
          <li key={`${log.email}-${log.timestamp}`}>
            {log.email} - {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
          Prev
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={(page + 1) * pageSize >= logs.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPage;

