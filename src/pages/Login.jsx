import LoginForm from "../components/LoginForm"

const Login = () => {
    const handleLogin = (data) => {
        console.log('Login exitoso:', data)
        alert(`Bienvenido, ${data.name}`)
    }
    return (
        <>
            <div className="container mt-5">
                <LoginForm onLogin={handleLogin}></LoginForm>
            </div>

        </>

    )
}

export default Login
