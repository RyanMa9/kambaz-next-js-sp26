"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import AssignmentControls from "./AssignmentControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../modules/LessonControlButtons";
import { FaChevronDown } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { redirect, useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setAssignments, deleteAssignment } from "./reducer";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { useState, useEffect } from "react";
import AssignmentDeleteModal from "../assignments/[aid]/AssignmentDeleteModal";
import * as coursesClient from "../../client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // Redirect if not signed in
  if (!currentUser) {
    redirect("/account/signin");
  }

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null
  );

  const fetchAssignments = async () => {
    const data = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(data));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const onRemoveAssignment = async (assignmentId: string) => {
    await coursesClient.deleteAssignmentById(assignmentId);
    dispatch(
      setAssignments(assignments.filter((a: any) => a._id !== assignmentId))
    );
  };

  return (
    <div>
      {isFaculty && <AssignmentControls />}

      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray bg-secondary">
          {/* Top part of assignments category */}
          <div className="d-flex justify-content-between">
            <div className="wd-title p-3 ps-2 fw-bold">
              <BsGripVertical className="me-2 fs-3" />
              <FaChevronDown className="me-2 fs-5" />
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

          <ListGroup className="wd-lessons rounded-0"></ListGroup>
          {assignments
            .filter((assignment) => assignment.course === cid)
            .map((assignment) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-start"
              >
                <BsGripVertical className="me-1 fs-3" />
                <LuNotebookPen className="me-2 fs-4 text-success" />
                <div className="flex-fill ms-2">
                  {isFaculty && (
                    <Link
                      href={`/courses/${cid}/assignments/${assignment._id}`}
                      className="wd-assignment-link fw-bold text-dark text-decoration-none"
                    >
                      {assignment._id + " - " + assignment.title}
                    </Link>
                  )}
                  <div>
                    <span className="text-danger fw-bold">
                      {assignment.modules || "Multiple Modules"}
                    </span>
                    <span className="wd-assignment-info fw-bold">
                      {assignment.available_at || assignment.available_at_date}
                    </span>
                    <div className="wd-assignment-due-date">
                      <b>Due </b> {assignment.due || assignment.due_date} |{" "}
                      {assignment.pts} pts
                    </div>
                  </div>
                </div>
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
                {isFaculty && (
                  <FaTrash
                    className="text-danger me-2 mb-1"
                    onClick={() => {
                      setAssignmentToDelete(assignment._id);
                      setShowDeleteModal(true);
                    }}
                  />
                )}
              </ListGroupItem>
            ))}
        </ListGroupItem>
      </ListGroup>

      <AssignmentDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={() => {
          if (assignmentToDelete) {
            onRemoveAssignment(assignmentToDelete);
            setAssignmentToDelete(null);
          }
        }}
      />
    </div>
  );
}
