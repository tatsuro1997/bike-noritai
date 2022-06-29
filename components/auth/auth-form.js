import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import classes from "./auth-form.module.css";

async function createUser(email, password, uid) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, uid }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const [error, setError] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [users, setUsers] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  const uid = users.length + 1;

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (result.error) {
        const errorMessage = (
          <div style={{ color: "#f78249", fontWeight: "bold" }}>
            入力された値が間違っています
          </div>
        );
        setError(errorMessage);
      }

      if (!result.error) {
        router.replace("/");
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword, uid);
      } catch (error) {
        console.log(error);
        const errorMessage = (
          <div style={{ color: "#f78249", fontWeight: "bold" }}>
            既にそのメールアドレスは使われているか、入力された値が間違っています
          </div>
        );
        setError(errorMessage);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {error}
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
        <div className={classes.control}>
          <input type="hidden" id="uid" required value={uid} />
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
