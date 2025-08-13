const API_URL = "http://localhost:3001";

export async function startGame() {
  const res = await fetch(`${API_URL}/start`, {
    method: "POST",
  });
  return res.json();
}

export async function hit() {
  const res = await fetch(`${API_URL}/hit`, {
    method: "POST",
  });
  return res.json();
}

export async function stand() {
  const res = await fetch(`${API_URL}/stand`, {
    method: "POST",
  });
  return res.json();
}

export async function double() {
  const res = await fetch(`${API_URL}/double`, {
    method: "POST",
  });
  return res.json();
}