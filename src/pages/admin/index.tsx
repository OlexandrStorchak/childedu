import { useEffect, useState, FormEvent, useContext } from 'react';
import { fetchLoginLogs } from '../../utils/activity';
import { AuthContext } from '../../context/AuthContext';

interface LoginLog {
  userId: string;
  email: string;
  name: string;
  timestamp: string;
}

const AdminPage = () => {
  const { profile } = useContext(AuthContext);
  const adminEmail = process.env.ADMIN_EMAIL;
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [logs, setLogs] = useState<LoginLog[]>([]);

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

