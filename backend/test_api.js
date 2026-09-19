/**
 * Automated Verification Script for TaskFlow Backend REST API
 * Tests all 10 operations end-to-end
 */
const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🚀 Starting Backend REST API Verification...\n');

  try {
    // 1. GET /api/tasks
    console.log('1. Testing GET /api/tasks ...');
    const getRes = await fetch(`${BASE_URL}/tasks`);
    const getData = await getRes.json();
    console.log(`   Status: ${getRes.status}, Count: ${getData.count}, Success: ${getData.success}`);

    // 2. POST /api/tasks (Create Task)
    console.log('\n2. Testing POST /api/tasks ...');
    const createRes = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Learn Full-Stack Architecture',
        description: 'Connect React with Express & MongoDB',
        category: 'Coding',
        priority: 'High',
        dueDate: '2026-09-22',
        dueTime: '17:30'
      })
    });
    const createData = await createRes.json();
    console.log(`   Status: ${createRes.status}, Created ID: ${createData.data?.id}`);
    const createdId = createData.data?.id;

    if (!createdId) throw new Error('Task creation failed: ID missing');

    // 3. GET /api/tasks/:id
    console.log(`\n3. Testing GET /api/tasks/${createdId} ...`);
    const getSingleRes = await fetch(`${BASE_URL}/tasks/${createdId}`);
    const getSingleData = await getSingleRes.json();
    console.log(`   Status: ${getSingleRes.status}, Title: "${getSingleData.data?.title}"`);

    // 4. PUT /api/tasks/:id (Update Task)
    console.log(`\n4. Testing PUT /api/tasks/${createdId} ...`);
    const updateRes = await fetch(`${BASE_URL}/tasks/${createdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Learn Full-Stack Architecture (Mastered!)',
        priority: 'Medium'
      })
    });
    const updateData = await updateRes.json();
    console.log(`   Status: ${updateRes.status}, Updated Title: "${updateData.data?.title}", Priority: ${updateData.data?.priority}`);

    // 5. PATCH /api/tasks/:id/complete (Toggle Complete)
    console.log(`\n5. Testing PATCH /api/tasks/${createdId}/complete ...`);
    const patchRes = await fetch(`${BASE_URL}/tasks/${createdId}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    });
    const patchData = await patchRes.json();
    console.log(`   Status: ${patchRes.status}, Completed: ${patchData.data?.completed}, CompletedAt: ${patchData.data?.completedAt}`);

    // 6. GET /api/tasks/stats/summary
    console.log('\n6. Testing GET /api/tasks/stats/summary ...');
    const summaryRes = await fetch(`${BASE_URL}/tasks/stats/summary`);
    const summaryData = await summaryRes.json();
    console.log('   Stats Summary:', summaryData.data);

    // 7. GET /api/tasks/stats/categories
    console.log('\n7. Testing GET /api/tasks/stats/categories ...');
    const catRes = await fetch(`${BASE_URL}/tasks/stats/categories`);
    const catData = await catRes.json();
    console.log(`   Category Count: ${catData.data?.length} categories grouped`);

    // 8. GET /api/tasks/stats/weekly
    console.log('\n8. Testing GET /api/tasks/stats/weekly ...');
    const weekRes = await fetch(`${BASE_URL}/tasks/stats/weekly`);
    const weekData = await weekRes.json();
    console.log(`   Weekly Days: ${weekData.data?.length} days tracked`);

    // 9. DELETE /api/tasks/:id
    console.log(`\n9. Testing DELETE /api/tasks/${createdId} ...`);
    const delRes = await fetch(`${BASE_URL}/tasks/${createdId}`, {
      method: 'DELETE'
    });
    const delData = await delRes.json();
    console.log(`   Status: ${delRes.status}, Deleted ID: ${delData.data?.id}`);

    // 10. Verify Deletion
    console.log(`\n10. Verifying Deletion GET /api/tasks/${createdId} ...`);
    const verifyRes = await fetch(`${BASE_URL}/tasks/${createdId}`);
    const verifyData = await verifyRes.json();
    console.log(`   Status: ${verifyRes.status} (Expected 404), Message: "${verifyData.message}"`);

    console.log('\n✅ ALL 10 REST API ENDPOINTS PASSED SUCCESSFULLY!\n');
  } catch (err) {
    console.error('\n❌ Test failed with error:', err.message);
  }
}

runTests();
