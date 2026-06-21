import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';


const errorRate = new Rate('errors');


export const options = {
    stages: [
        { duration: '10s', target: 0 },  
        { duration: '15s', target: 15 },   
        { duration: '10s', target: 0 },   
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], 
        errors: ['rate<0.1'],             
    },
};


const BASE_URL = 'http://localhost:3000';
const testUser = {
    username: `testuser_${Date.now()}`,
    password: 'testpass123'
};

export function setup() {
    
    const signupRes = http.post(`${BASE_URL}/auth/signup`, JSON.stringify(testUser), {
        headers: { 'Content-Type': 'application/json' }
    });
    
    const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify(testUser), {
        headers: { 'Content-Type': 'application/json' }
    });
    
    const token = JSON.parse(loginRes.body).token;
    return { token, userId: testUser.username };
}

export default function (data) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.token}`
    };

   
    let res = http.get(`${BASE_URL}/todos`, { headers });
    check(res, {
        'GET todos status is 200': (r) => r.status === 200,
    }) || errorRate.add(1);

    sleep(1);

  
    const todoData = {
        text: `Load test todo ${Date.now()}`
    };
    res = http.post(`${BASE_URL}/todos`, JSON.stringify(todoData), { headers });
    check(res, {
        'POST todo status is 200': (r) => r.status === 200,
        'POST todo has id': (r) => JSON.parse(r.body).id !== undefined,
    }) || errorRate.add(1);

    const todoId = JSON.parse(res.body).id;
    sleep(1);

  
    if (todoId) {
        res = http.del(`${BASE_URL}/todos/${todoId}`, null, { headers });
        check(res, {
            'DELETE todo status is 200': (r) => r.status === 200,
        }) || errorRate.add(1);
    }

    sleep(1);
}

export function teardown(data) {
    console.log('Test completed for user:', data.userId);
}