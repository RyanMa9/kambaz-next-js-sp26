"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem, Modal, Button } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes, deleteQuiz, updateQuiz, addQuiz } from "./reducer";
import * as quizzesClient from "./client";
import GreenCheckmark from "../modules/GreenCheckmark";
import RedXMark from "../modules/RedXMark";

// Format YYYY-MM-DD as "July 1, 2025" without any Date object
function formatDate(dateStr: string): string {
  if (!dateStr) return "None";
  const [year, month, day] = dateStr.slice(0, 10).split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { quizzes } = useSelector((state: RootState) => state.quizReducer);

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [studentScores, setStudentScores] = useState<
    Record<string, number | null>
  >({});

  const fetchQuizzes = async () => {
    const data = await quizzesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  };

  const fetchStudentScores = async (quizList: any[]) => {
    if (isFaculty) return;
    const scores: Record<string, number | null> = {};
    await Promise.all(
      quizList.map(async (q: any) => {
        try {
          const attempt = await quizzesClient.getMyLastAttempt(q._id);
          scores[q._id] = attempt ? attempt.score : null;
        } catch {
          scores[q._id] = null;
        }
      })
    );
    setStudentScores(scores);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (quizzes.length > 0) fetchStudentScores(quizzes);
  }, [quizzes]);

  const handleAddQuiz = async () => {
    const newQuiz = {
      title: "New Quiz",
      description: "",
      course: cid,
      published: false,
      questions: [],
    };
    const created = await quizzesClient.createQuiz(cid as string, newQuiz);
    dispatch(addQuiz(created));
    router.push(`/courses/${cid}/quizzes/${created._id}/editor`);
  };

  const handleDeleteQuiz = async () => {
    if (!quizToDelete) return;
    await quizzesClient.deleteQuiz(quizToDelete);
    dispatch(deleteQuiz(quizToDelete));
    setQuizToDelete(null);
  };

  const handleTogglePublish = async (quiz: any) => {
    const updated = { ...quiz, published: !quiz.published };
    await quizzesClient.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    setOpenMenu(null);
  };

  const today = new Date().toISOString().slice(0, 10);

  const getAvailabilityLabel = (quiz: any) => {
    const avail = quiz.availableDate || null;
    const until = quiz.untilDate || null;
    if (until && today > until)
      return <span className="text-danger fw-bold">Closed</span>;
    if (avail && today < avail)
      return (
        <span>
          <span className="fw-bold">Not available until </span>
          {formatDate(avail)}
        </span>
      );
    return <span className="text-success fw-bold">Available</span>;
  };

  // Faculty sees all quizzes for the course.
  // Students only see published quizzes.
  // Both views sorted by availableDate (nulls last).
  const courseQuizzes = quizzes
    .filter((q: any) => {
      if (q.course !== cid) return false;
      if (!isFaculty && !q.published) return false;
      return true;
    })
    .slice()
    .sort((a: any, b: any) => {
      const da = a.availableDate || "9999-99-99";
      const db = b.availableDate || "9999-99-99";
      return da < db ? -1 : da > db ? 1 : 0;
    });

  return (
    <div>
      {/* Toolbar */}
      <div className="d-flex justify-content-end mb-3">
        {isFaculty && (
          <Button variant="danger" onClick={handleAddQuiz}>
            <FaPlus className="me-1" /> Quiz
          </Button>
        )}
      </div>

      {courseQuizzes.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <p>
            {isFaculty ? (
              <>
                No quizzes yet. Click <strong>+ Quiz</strong> to add one.
              </>
            ) : (
              "No quizzes are available for this course yet."
            )}
          </p>
        </div>
      ) : (
        <ListGroup className="rounded-0" id="wd-quizzes">
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray bg-secondary">
            <div className="d-flex justify-content-between">
              <div className="wd-title p-3 ps-2 fw-bold">
                <BsGripVertical className="me-2 fs-3" />
                <FaChevronDown className="me-2 fs-5" />
                Quizzes
              </div>
              <div className="wd-title p-3 ps-2">
                {isFaculty && (
                  <FaPlus
                    className="me-2 fs-5"
                    style={{ cursor: "pointer" }}
                    onClick={handleAddQuiz}
                  />
                )}
                <BsThreeDotsVertical className="me-2 fs-3" />
              </div>
            </div>

            <ListGroup className="wd-lessons rounded-0">
              {courseQuizzes.map((quiz: any) => (
                <ListGroupItem
                  key={quiz._id}
                  className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-start"
                >
                  <BsGripVertical className="me-1 fs-3" />
                  <LuClipboardList className="me-2 fs-4 text-success" />

                  <div className="flex-fill ms-2">
                    <Link
                      href={`/courses/${cid}/quizzes/${quiz._id}`}
                      className="wd-quiz-link fw-bold text-dark text-decoration-none"
                    >
                      {quiz.title}
                    </Link>
                    <div className="fs-6 text-muted">
                      {getAvailabilityLabel(quiz)}
                      {" | "}
                      <b>Due </b>
                      {quiz.dueDate ? formatDate(quiz.dueDate) : "No due date"}
                      {" | "}
                      {quiz.points ?? 0} pts
                      {" | "}
                      {quiz.questions?.length ?? 0} Questions
                      {!isFaculty && studentScores[quiz._id] != null && (
                        <span> | Score: {studentScores[quiz._id]}</span>
                      )}
                    </div>
                  </div>

                  {/* Published indicator — faculty only */}
                  {isFaculty && (
                    <span className="me-2 fs-5">
                      {quiz.published ? (
                        <span title="Published">
                          <GreenCheckmark />
                        </span>
                      ) : (
                        <span title="Unpublished">
                          <RedXMark />
                        </span>
                      )}
                    </span>
                  )}

                  {/* Context menu — faculty only */}
                  {isFaculty && (
                    <div className="position-relative">
                      <IoEllipsisVertical
                        className="fs-4"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setOpenMenu(openMenu === quiz._id ? null : quiz._id)
                        }
                      />
                      {openMenu === quiz._id && (
                        <div
                          className="position-absolute bg-white border rounded shadow"
                          style={{ right: 0, zIndex: 100, minWidth: 140 }}
                        >
                          <div
                            className="p-2 ps-3 border-bottom"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setOpenMenu(null);
                              router.push(
                                `/courses/${cid}/quizzes/${quiz._id}/editor`
                              );
                            }}
                          >
                            Edit
                          </div>
                          <div
                            className="p-2 ps-3 border-bottom"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleTogglePublish(quiz)}
                          >
                            {quiz.published ? "Unpublish" : "Publish"}
                          </div>
                          <div
                            className="p-2 ps-3 text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setQuizToDelete(quiz._id);
                              setShowDeleteModal(true);
                              setOpenMenu(null);
                            }}
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ListGroupItem>
              ))}
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      )}

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This cannot be reversed.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteQuiz();
              setShowDeleteModal(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
