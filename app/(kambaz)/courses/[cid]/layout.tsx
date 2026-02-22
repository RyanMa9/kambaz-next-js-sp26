import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { courses } from "../../database";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "../Breadcrumb";

export default async function CoursesLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  const course = courses.find((course) => course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
              {" "}
              <CourseNavigation />{" "}
            </td>
            <td valign="top" width="100%">
              {" "}
              {children}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
