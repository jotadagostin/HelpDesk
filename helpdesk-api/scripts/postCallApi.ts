// import fetch from 'node-fetch';

async function main() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkNMSUVOVCIsImlhdCI6MTc2NDQzNTg1NSwiZXhwIjoxNzY0NDM5NDU1fQ.MxMUMDTrYKGVfKHcxC6x4R1-qPSmCqkWZGNzZ1Y2M0c";
  const res = await fetch("http://localhost:3000/api/calls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: "Call via API script",
      description: "testing",
      category: "internet",
    }),
  });
  console.log("status", res.status);
  console.log("body", await res.text());
}

main().catch((e) => console.error(e));
