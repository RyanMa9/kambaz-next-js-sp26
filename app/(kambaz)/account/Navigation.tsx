import Link from "next/link";
export default function AccountNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href="/account/signin"
        id="wd-course-home-link"
        className="list-group-item active border-0"
      >
        Signin
      </Link>
      <Link
        href="/account/signup"
        id="wd-course-modules-link"
        className="list-group-item text-danger border-0"
      >
        Signup
      </Link>

      <Link
        href="/account/profile"
        id="wd-course-piazza-link"
        className="list-group-item text-danger border-0"
      >
        Profile
      </Link>
    </div>
  );
}
