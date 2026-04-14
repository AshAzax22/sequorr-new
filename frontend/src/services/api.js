const BASE_URL = 'http://localhost:5000';

const api = {
    async request(endpoint, options = {}) {
        const userInfo = localStorage.getItem('userInfo');
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        };

        // Automatically inject JWT token
        if (userInfo) {
            const parsed = JSON.parse(userInfo);
            headers['Authorization'] = `Bearer ${parsed.token}`;
        }

        const config = {
            ...options,
            headers,
        };

        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        
        // Ensure consistent error bubbling
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `HTTP status ${response.status}`);
        }

        return response.json(); // Parses JSON directly
    },
    get(endpoint) { 
        return this.request(endpoint, { method: 'GET' }) 
    },
    post(endpoint, body) { 
        return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) }) 
    },
    put(endpoint, body) { 
        return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }) 
    },
    delete(endpoint) { 
        return this.request(endpoint, { method: 'DELETE' }) 
    }
};

export default api;
