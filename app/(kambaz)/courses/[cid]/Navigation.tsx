"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
export default function CourseNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  const path = usePathname();
  const { cid } = useParams();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 ">
      {links.map((link) => (
        <Link
          key={link}
          href={`/courses/${cid}/${link.toLowerCase()}`}
          id="wd-course-modules-link"
          className={`${
            path.endsWith(link.toLowerCase())
              ? "list-group-item active border-0"
              : "list-group-item text-danger border-0"
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
