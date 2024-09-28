import NavBar from "../components/navbar"

function Register() {
    return (
        <>
            <NavBar />

            <div className="container register-login-form-container">
                <div class="card">
                    <div class="card-header">
                        Register
                    </div>
                    <div class="card-body">
                    <div class="mb-3">
                            <label for="first-name" class="form-label">First Name</label>
                            <input type="text" class="form-control" aria-describedby="firstName" />
                        </div>
                        <div class="mb-3">
                            <label for="last-name" class="form-label">Last Name</label>
                            <input type="text" class="form-control" aria-describedby="secondName" />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" />
                        </div>
                        <button type="submit" class="btn btn-success">Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register