
async function register(username: string, password: string) {
    const SIGNUP_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup'
    const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    const dataSignup = await response.json()
    console.log(dataSignup);
    return dataSignup
}

export default register