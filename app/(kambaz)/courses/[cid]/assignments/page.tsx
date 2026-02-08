import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AssignmentControls from "./AssignmentControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../modules/LessonControlButtons";
import { FaChevronDown } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";

export default function Assignments() {
  return (
    <div>
      <AssignmentControls></AssignmentControls>
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray bg-secondary">
          {/* top part of assignments category*/}
          <div className="d-flex justify-content-between">
            <div className="wd-title p-3 ps-2 fw-bold">
              <BsGripVertical className="me-2 fs-3" />
              <FaChevronDown className="me-2 fs-5 "></FaChevronDown>
              Assignments
            </div>
            <div className="wd-title p-3 ps-2">
              <span className="fs-6 rounded-pill border border-grey">
                40% of Total{" "}
              </span>
              <FaPlus className="me-2 fs-5" />
              <BsThreeDotsVertical className="me-2 fs-3" />
            </div>
          </div>

          {/* assignments*/}
          <ListGroup className="wd-lessons rounded-0 ">
            {/* assignment 1*/}
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-start">
              <BsGripVertical className="me-1 fs-3" />
              <LuNotebookPen className="me-2 fs-4 text-success" />
              <div className="flex-fill ms-2">
                <Link
                  href="/courses/1234/assignments/1234"
                  className="wd-assignment-link fw-bold text-dark text-decoration-none"
                >
                  A1 - HTML
                </Link>
                <div>
                  <span className="text-danger fw-bold">Multiple Modules </span>
                  <span className="wd-assignment-info fw-bold">
                    | Not Available until May 6 at 12:00 am
                  </span>
                  <div className="wd-assignment-due-date">
                    <b>Due </b> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>
              <LessonControlButtons />
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start">
              <BsGripVertical className="me-1 fs-3" />
              <LuNotebookPen className="me-2 fs-4 text-success" />
              <div className="flex-fill ms-2">
                <Link
                  href="/courses/1234/assignments/123"
                  className="wd-assignment-link fw-bold text-dark text-decoration-none"
                >
                  A2 - CSS
                </Link>
                <div>
                  <span className="text-danger fw-bold">Multiple Modules </span>
                  <span className="wd-assignment-info fw-bold">
                    | Not Available until May 6 at 12:00 am
                  </span>
                  <div className="wd-assignment-due-date">
                    <b>Due </b> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start">
              <BsGripVertical className="me-1 fs-3" />
              <LuNotebookPen className="me-2 fs-4 text-success" />
              <div className="flex-fill ms-2">
                <Link
                  href="/courses/1234/assignments/123"
                  className="wd-assignment-link fw-bold text-dark text-decoration-none"
                >
                  A3 - JavaScript
                </Link>
                <div>
                  <span className="text-danger fw-bold">Multiple Modules </span>
                  <span className="wd-assignment-info fw-bold">
                    | Not Available until May 6 at 12:00 am
                  </span>
                  <div className="wd-assignment-due-date">
                    <b>Due </b> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
