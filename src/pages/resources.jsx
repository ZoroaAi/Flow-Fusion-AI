import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchResources = async () => {
      const res = await fetch("/api/resources");
      const data = await res.json();
      setResources(data.resources);
    };

    fetchResources();
  }, []);

  return (
    <div>
      <h1>Resources</h1>
      <ul>
        {resources.map(resource => (
          <li key={resource.id}>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            {resource.isFree || user?.hasPaid ? (
              <a href={resource.url} target="_blank" rel="noopener noreferrer">Access</a>
            ) : (
              <button onClick={() => handlePayment()}>Pay to Unlock</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
