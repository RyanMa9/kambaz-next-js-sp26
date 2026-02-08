import Link from "next/link";
import { Button, FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl
        defaultValue="alice"
        placeholder="username"
        type="username"
        className="wd-username"
      />
      <FormControl
        defaultValue="123"
        placeholder="password"
        type="password"
        className="wd-password"
      />
      <FormControl
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
      />
      <FormControl
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
      />
      <FormControl type="date" id="wd-dob" />
      <FormControl
        defaultValue="alice@wonderland.com"
        type="email"
        id="wd-email"
      />
      <FormSelect defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Button type="submit" className="btn btn-danger">
        <Link href="signin"> </Link>
        Sign out
      </Button>{" "}
    </div>
  );
}
