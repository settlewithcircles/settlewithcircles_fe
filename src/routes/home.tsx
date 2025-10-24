import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface CirclesResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  created_by: {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
  };
}
export const Route = createFileRoute("/home")({
  component: RouteComponent,
});

const getCircles = async () => {
  const response = await fetch("http://localhost:8000/api/v1/circles/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get circles");
  }
  const data = await response.json();
  return data.results;
};

const handleCreateCircle = async (name: string) => {
  const response = await fetch("http://localhost:8000/api/v1/circles/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create circle");
  }
};
function RouteComponent() {
  const [circles, setCircles] = useState<CirclesResponse[]>([]);
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchCircles = async () => {
      const data = await getCircles();
      setCircles(data);
    };
    fetchCircles();
  }, []);
  return (
    <div>
      <input
        type="text"
        placeholder="Circle Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={() => handleCreateCircle(name)}>Create Circle</Button>
      <h1>Circles</h1>
      {circles.map((circle) => (
        <div key={circle.id}>{circle.name}</div>
      ))}
    </div>
  );
}
