
async function login(username: string, password: string) {
    const LOGIN_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login'
    // const LOGIN_URL = import.meta.env.VITE_JWT_TOKEN as string
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    const dataLogin = await response.json()
    
    console.log('login', dataLogin);
    localStorage.setItem('token', dataLogin.token)
    localStorage.setItem('username', username)
    
    return dataLogin
}

export default login

// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InY3N…M0MH0.kk0hIM3f2flRjqRoaCmeznpPY5LPVvIKVd20mSiBDhc'