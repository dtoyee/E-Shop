import NavBar from "../components/navbar"
import RegisterForm from "../components/register-form"

function Register() {
    return (
        <>
            <NavBar />

            <div className="container register-login-form-container">
                <RegisterForm />
            </div>
        </>
    )
}

export default Register