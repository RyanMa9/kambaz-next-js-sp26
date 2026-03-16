"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { setEnrollments } from "../../enrollments/reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../database";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();

  const signin = () => {
    // Find user in db.users
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) {
      alert("Invalid username or password");
      return;
    }

    // Set the current user in Redux
    dispatch(setCurrentUser(user));

    // Load this user's enrollments from db.enrollments
    const userEnrollments = db.enrollments.filter(
      (e: any) => e.user === user._id
    );
    dispatch(setEnrollments(userEnrollments));

    // Redirect to dashboard
    redirect("/dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        id="wd-username"
        defaultValue={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        placeholder="username"
        className="mb-2"
      />
      <FormControl
        id="wd-password"
        defaultValue={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}
