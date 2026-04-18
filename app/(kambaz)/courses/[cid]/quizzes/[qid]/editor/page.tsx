"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, Button, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { updateQuiz as updateQuizAction } from "../../reducer";
import * as quizzesClient from "../../client";

// Convert a stored date (string) back to YYYY-MM-DD for the input.
function toInputDate(stored: string): string {
  if (!stored) return "";
  const d = new Date(stored);
  if (isNaN(d.getTime())) return "";
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const dy = String(d.getDate()).padStart(2, "0");
  return `${yr}-${mo}-${dy}`;
}

// Convert a YYYY-MM-DD string from the input to a string for storage.
function toStoredDate(inputVal: string): string {
  if (!inputVal) return "";
  return `${inputVal}T12:00:00`;
}

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizReducer);

  const existingQuiz = quizzes.find((q: any) => q._id === qid);

  const [quiz, setQuiz] = useState<any>(
    existingQuiz
      ? {
          ...existingQuiz,
          dueDate: toInputDate(existingQuiz.dueDate),
          availableDate: toInputDate(existingQuiz.availableDate),
          untilDate: toInputDate(existingQuiz.untilDate),
        }
      : {
          title: "New Quiz",
          description: "",
          quizType: "GRADED_QUIZ",
          assignmentGroup: "QUIZZES",
          shuffleAnswers: true,
          timeLimit: 20,
          multipleAttempts: false,
          howManyAttempts: 1,
          showCorrectAnswers: "immediately",
          accessCode: "",
          oneQuestionAtATime: true,
          webcamRequired: false,
          lockQuestionsAfterAnswering: false,
          dueDate: "",
          availableDate: "",
          untilDate: "",
          published: false,
          questions: [],
        }
  );

  useEffect(() => {
    if (!existingQuiz) {
      quizzesClient.findQuizById(qid as string).then((data) => {
        if (data) {
          setQuiz({
            ...data,
            dueDate: toInputDate(data.dueDate),
            availableDate: toInputDate(data.availableDate),
            untilDate: toInputDate(data.untilDate),
          });
        }
      });
    }
  }, [qid]);

  const set = (field: string, value: any) =>
    setQuiz((prev: any) => ({ ...prev, [field]: value }));

  const handleSave = async (publish = false) => {
    const payload = {
      ...quiz,
      published: publish || quiz.published,
      dueDate: toStoredDate(quiz.dueDate),
      availableDate: toStoredDate(quiz.availableDate),
      untilDate: toStoredDate(quiz.untilDate),
    };
    await quizzesClient.updateQuiz(payload);
    dispatch(updateQuizAction(payload));
    if (publish) {
      router.push(`/courses/${cid}/quizzes`);
    } else {
      router.push(`/courses/${cid}/quizzes/${qid}`);
    }
  };

  const handleCancel = () => router.push(`/courses/${cid}/quizzes`);

  return (
    <div className="p-3">
      {/* Tabs */}
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link active>Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/questions`)
            }
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Form>
        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Title</Form.Label>
          <FormControl
            value={quiz.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Description</Form.Label>
          <FormControl
            as="textarea"
            rows={4}
            value={quiz.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Form.Group>

        <div className="row">
          {/* Quiz Type */}
          <Form.Group className="mb-3 col-md-6">
            <Form.Label className="fw-bold">Quiz Type</Form.Label>
            <Form.Select
              value={quiz.quizType}
              onChange={(e) => set("quizType", e.target.value)}
            >
              <option value="GRADED_QUIZ">Graded Quiz</option>
              <option value="PRACTICE_QUIZ">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </Form.Select>
          </Form.Group>

          {/* Assignment Group */}
          <Form.Group className="mb-3 col-md-6">
            <Form.Label className="fw-bold">Assignment Group</Form.Label>
            <Form.Select
              value={quiz.assignmentGroup}
              onChange={(e) => set("assignmentGroup", e.target.value)}
            >
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="PROJECT">Project</option>
            </Form.Select>
          </Form.Group>
        </div>

        <div className="row">
          {/* Shuffle Answers */}
          <Form.Group className="mb-3 col-md-6">
            <Form.Label className="fw-bold">Shuffle Answers</Form.Label>
            <Form.Select
              value={quiz.shuffleAnswers ? "yes" : "no"}
              onChange={(e) => set("shuffleAnswers", e.target.value === "yes")}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          {/* Time Limit */}
          <Form.Group className="mb-3 col-md-6">
            <Form.Label className="fw-bold">Time Limit (Minutes)</Form.Label>
            <FormControl
              type="number"
              min={1}
              value={quiz.timeLimit}
              onChange={(e) => set("timeLimit", Number(e.target.value))}
            />
          </Form.Group>
        </div>

        <div className="row">
          {/* Multiple Attempts */}
          <Form.Group className="mb-3 col-md-6">
            <Form.Label className="fw-bold">Multiple Attempts</Form.Label>
            <Form.Select
              value={quiz.multipleAttempts ? "yes" : "no"}
              onChange={(e) =>
                set("multipleAttempts", e.target.value === "yes")
              }
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Form.Select>
          </Form.Group>

          {/* How Many Attempts */}
          {quiz.multipleAttempts && (
            <Form.Group className="mb-3 col-md-6">
              <Form.Label className="fw-bold">How Many Attempts</Form.Label>
              <FormControl
                type="number"
                min={1}
                value={quiz.howManyAttempts}
                onChange={(e) => set("howManyAttempts", Number(e.target.value))}
              />
            </Form.Group>
          )}
        </div>

        <div className="row">
          {/* Show Correct Answers */}
          <Form.Group className="mb-3 col-md-6">
            <Form.Label className="fw-bold">Show Correct Answers</Form.Label>
            <Form.Select
              value={quiz.showCorrectAnswers}
              onChange={(e) => set("showCorrectAnswers", e.target.value)}
            >
              <option value="immediately">Immediately</option>
              <option value="after_due">After Due Date</option>
              <option value="never">Never</option>
            </Form.Select>
          </Form.Group>

          {/* Access Code */}
          <Form.Group className="mb-3 col-md-6">
            <Form.Label className="fw-bold">Access Code</Form.Label>
            <FormControl
              value={quiz.accessCode}
              placeholder="Leave blank for none"
              onChange={(e) => set("accessCode", e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="row">
          {/* One Question at a Time */}
          <Form.Group className="mb-3 col-md-4">
            <Form.Label className="fw-bold">One Question at a Time</Form.Label>
            <Form.Select
              value={quiz.oneQuestionAtATime ? "yes" : "no"}
              onChange={(e) =>
                set("oneQuestionAtATime", e.target.value === "yes")
              }
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          {/* Webcam Required */}
          <Form.Group className="mb-3 col-md-4">
            <Form.Label className="fw-bold">Webcam Required</Form.Label>
            <Form.Select
              value={quiz.webcamRequired ? "yes" : "no"}
              onChange={(e) => set("webcamRequired", e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Form.Select>
          </Form.Group>

          {/* Lock Questions After Answering */}
          <Form.Group className="mb-3 col-md-4">
            <Form.Label className="fw-bold">
              Lock Questions After Answering
            </Form.Label>
            <Form.Select
              value={quiz.lockQuestionsAfterAnswering ? "yes" : "no"}
              onChange={(e) =>
                set("lockQuestionsAfterAnswering", e.target.value === "yes")
              }
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Form.Select>
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-4">
            <Form.Label className="fw-bold">Due Date</Form.Label>
            <FormControl
              type="date"
              value={quiz.dueDate}
              onChange={(e) => set("dueDate", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-4">
            <Form.Label className="fw-bold">Available Date</Form.Label>
            <FormControl
              type="date"
              value={quiz.availableDate}
              onChange={(e) => set("availableDate", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-4">
            <Form.Label className="fw-bold">Until Date</Form.Label>
            <FormControl
              type="date"
              value={quiz.untilDate}
              onChange={(e) => set("untilDate", e.target.value)}
            />
          </Form.Group>
        </div>

        <hr />

        {/* Action buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="warning" onClick={() => handleSave(false)}>
            Save
          </Button>
          <Button variant="success" onClick={() => handleSave(true)}>
            Save &amp; Publish
          </Button>
        </div>
      </Form>
    </div>
  );
}
