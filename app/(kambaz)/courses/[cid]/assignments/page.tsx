"use client";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AssignmentControls from "./AssignmentControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../modules/LessonControlButtons";
import { FaChevronDown } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { useParams } from "next/navigation";
import * as db from "@/app/(kambaz)/database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
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

          <ListGroup className="wd-lessons rounded-0 "></ListGroup>
          {assignments
            .filter((assignment) => assignment.course === cid)
            .map((assignment) => (
              <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-start">
                <BsGripVertical className="me-1 fs-3" />
                <LuNotebookPen className="me-2 fs-4 text-success" />
                <div className="flex-fill ms-2">
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="wd-assignment-link fw-bold text-dark text-decoration-none"
                  >
                    {assignment._id + " - " + assignment.title}
                  </Link>
                  <div>
                    <span className="text-danger fw-bold">
                      {assignment.modules}
                    </span>
                    <span className="wd-assignment-info fw-bold">
                      {assignment.available_at}
                    </span>
                    <div className="wd-assignment-due-date">
                      <b>Due </b> {assignment.due} | {assignment.pts} pts
                    </div>
                  </div>
                </div>
                <LessonControlButtons />
              </ListGroupItem>
            ))}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
