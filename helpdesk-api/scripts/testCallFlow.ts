async function testCallFlow() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkNMSUVOVCIsImlhdCI6MTc2NDUyNTE0MiwiZXhwIjoxNzY0NTI4NzQyfQ.s3DCr-yyS_9pc0nm7uEoN6qvWVKeVdkpSwoZNWciqT8";

  try {
    // 1️⃣ POST /api/calls (criar uma chamada)
    console.log("\n📤 POST /api/calls...");
    const createRes = await fetch("http://localhost:3000/api/calls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Test Call from script",
        description: "Testing the complete flow",
        category: "data-recover",
      }),
    });

    console.log(`Status: ${createRes.status}`);
    const createData = await createRes.json();
    console.log("Response:", JSON.stringify(createData, null, 2));

    if (!createRes.ok) {
      console.error("❌ Failed to create call");
      return;
    }

    console.log("✅ Call created successfully!");

    // 2️⃣ GET /api/calls (listar todas as chamadas)
    console.log("\n📥 GET /api/calls...");
    const listRes = await fetch("http://localhost:3000/api/calls", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(`Status: ${listRes.status}`);
    const listData = await listRes.json();
    console.log(`Total calls: ${listData.length}`);
    console.log("Calls:", JSON.stringify(listData, null, 2));

    if (listData.length > 0) {
      console.log("\n✅ The newly created call should be in this list!");
    }
  } catch (e) {
    console.error("❌ Error:", e);
  }
}

testCallFlow();
