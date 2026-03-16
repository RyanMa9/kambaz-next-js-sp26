"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { courses } from "../../database";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "../Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const [showCourseFaAlign, toggleCourseFaAlign] = useState(true);
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => toggleCourseFaAlign(!showCourseFaAlign)}
          style={{ cursor: "pointer" }}
        />
        {course?.name}
      </h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
              {" "}
              {showCourseFaAlign && <CourseNavigation />}
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
