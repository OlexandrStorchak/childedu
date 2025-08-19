import { useEffect, useState, FormEvent } from 'react';
import { fetchLoginLogs } from '../../utils/activity';

interface LoginLog {
  userId: string;
  email: string;
  name: string;
  timestamp: string;
}

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [logs, setLogs] = useState<LoginLog[]>([]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (password === process.env.ADMIN_PASSWORD) {
      setAuthorized(true);
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchLoginLogs().then(setLogs).catch(console.error);
    }
  }, [authorized]);

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

  return (
    <div>
      <h1>Login Logs</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.timestamp}>
            {log.email} - {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;

