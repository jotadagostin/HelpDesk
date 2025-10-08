export function Login() {
  return (
    <div className="w-full h-screen bg-login  bg-cover bg-center ">
      <div>
        <div>logo</div>
        <div>
          <form action="">
            <h1>Acess the portal</h1>
            <p>Log in using your e-mail and password registered</p>

            <label htmlFor="email">Email</label>
            <input id="email" type="email" />

            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" />

            <button type="submit">Enter</button>
          </form>
          <div>
            <h1>Don't have an account yet?</h1>
            <p>Register right now</p>
            <button>Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
