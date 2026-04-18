"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { updateQuiz } from "../reducer";
import * as quizzesClient from "../client";

// Format dates, example is YYYY-MM-DD as "July 1, 2025"
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

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { quizzes } = useSelector((state: RootState) => state.quizReducer);

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [quiz, setQuiz] = useState<any>(
    quizzes.find((q: any) => q._id === qid) || null
  );
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (!quiz) {
        const data = await quizzesClient.findQuizById(qid as string);
        setQuiz(data);
      }
      if (!isFaculty) {
        const [attempt, countData] = await Promise.all([
          quizzesClient.getMyLastAttempt(qid as string),
          quizzesClient.getMyAttemptCount(qid as string),
        ]);
        setLastAttempt(attempt);
        setAttemptCount(countData.count);
      }
    };
    load();
  }, [qid]);

  const handleTogglePublish = async () => {
    const updated = { ...quiz, published: !quiz.published };
    await quizzesClient.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    setQuiz(updated);
  };

  if (!quiz) return <div className="p-3">Loading...</div>;

  const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const canTakeQuiz = !isFaculty && attemptCount < maxAttempts;

  // Availability check — compare today's YYYY-MM-DD against stored date strings
  const today = new Date().toISOString().slice(0, 10);
  const isNotYetAvailable = !!quiz.availableDate && today < quiz.availableDate;
  const isClosed = !!quiz.untilDate && today > quiz.untilDate;
  const isAvailable = !isNotYetAvailable && !isClosed;

  return (
    <div className="p-4">
      {/* Faculty action buttons only */}
      {isFaculty && (
        <div className="d-flex gap-2 mb-4">
          <Button
            variant="secondary"
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/preview`)
            }
          >
            Preview
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}
          >
            Edit
          </Button>
          <Button
            variant={quiz.published ? "success" : "outline-secondary"}
            onClick={handleTogglePublish}
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </Button>
        </div>
      )}

      {/* Students: only see Take Quiz / Retake  */}
      {!isFaculty && (
        <div className="mb-4">
          {lastAttempt && (
            <div className="alert alert-info">
              Last attempt score:{" "}
              <strong>
                {lastAttempt.score} / {lastAttempt.total}
              </strong>
            </div>
          )}
          {isClosed && (
            <div className="alert alert-danger">
              This quiz closed on {formatDate(quiz.untilDate)}.
            </div>
          )}
          {isNotYetAvailable && (
            <div className="alert alert-warning">
              This quiz is not available until {formatDate(quiz.availableDate)}.
            </div>
          )}
          {isAvailable && canTakeQuiz && (
            <Button
              variant="danger"
              onClick={() =>
                router.push(`/courses/${cid}/quizzes/${qid}/preview`)
              }
            >
              {lastAttempt ? "Retake Quiz" : "Take Quiz"}
            </Button>
          )}
          {isAvailable && !canTakeQuiz && (
            <div className="text-muted">
              You have used all {maxAttempts} attempt
              {maxAttempts > 1 ? "s" : ""}.
            </div>
          )}
        </div>
      )}

      <hr />

      {/* Quiz title + description — visible to all */}
      <h3>{quiz.title}</h3>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}

      {/* Details table — faculty only */}
      {isFaculty && (
        <table className="table table-borderless w-auto mt-3">
          <tbody>
            <tr>
              <td className="fw-bold pe-4">Quiz Type</td>
              <td>{quiz.quizType?.replace(/_/g, " ")}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Points</td>
              <td>{quiz.points ?? 0}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Assignment Group</td>
              <td>{quiz.assignmentGroup}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Shuffle Answers</td>
              <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Time Limit</td>
              <td>{quiz.timeLimit} Minutes</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Multiple Attempts</td>
              <td>
                {quiz.multipleAttempts ? `Yes (${quiz.howManyAttempts})` : "No"}
              </td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Show Correct Answers</td>
              <td>{quiz.showCorrectAnswers}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Access Code</td>
              <td>{quiz.accessCode || "None"}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">One Question at a Time</td>
              <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Webcam Required</td>
              <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Lock Questions After Answering</td>
              <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Due Date</td>
              <td>{formatDate(quiz.dueDate)}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Available Date</td>
              <td>{formatDate(quiz.availableDate)}</td>
            </tr>
            <tr>
              <td className="fw-bold pe-4">Until Date</td>
              <td>{formatDate(quiz.untilDate)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
