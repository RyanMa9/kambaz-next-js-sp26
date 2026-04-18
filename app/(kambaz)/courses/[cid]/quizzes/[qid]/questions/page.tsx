"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Nav, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { updateQuiz as updateQuizAction } from "../../reducer";
import * as quizzesClient from "../../client";
import MultipleChoiceEditor from "./MultipleChoice";
import TrueFalseEditor from "./TrueFalse";
import FillBlankEditor from "./FillBlank";
import { v4 as uuidv4 } from "uuid";

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizReducer);

  const existingQuiz = quizzes.find((q: any) => q._id === qid);
  const [quiz, setQuiz] = useState<any>(existingQuiz || null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!existingQuiz) {
      quizzesClient.findQuizById(qid as string).then((data) => {
        if (data) setQuiz(data);
      });
    }
  }, [qid]);

  if (!quiz) return <div className="p-3">Loading...</div>;

  const totalPoints = (quiz.questions || []).reduce(
    (sum: number, q: any) => sum + (q.points || 0),
    0
  );

  const handleAddQuestion = () => {
    const newQ = {
      _id: uuidv4(),
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: [
        { _id: uuidv4(), text: "", isCorrect: true },
        { _id: uuidv4(), text: "", isCorrect: false },
      ],
    };
    const updated = { ...quiz, questions: [...(quiz.questions || []), newQ] };
    setQuiz(updated);
    setEditingId(newQ._id);
  };

  const handleSaveQuestion = async (savedQ: any) => {
    const updatedQuestions = (quiz.questions || []).map((q: any) =>
      q._id === savedQ._id ? savedQ : q
    );
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
      points: updatedQuestions.reduce(
        (s: number, q: any) => s + (q.points || 0),
        0
      ),
    };
    await quizzesClient.updateQuiz(updatedQuiz);
    dispatch(updateQuizAction(updatedQuiz));
    setQuiz(updatedQuiz);
    setEditingId(null);
  };

  const handleDeleteQuestion = async (qId: string) => {
    const updatedQuestions = (quiz.questions || []).filter(
      (q: any) => q._id !== qId
    );
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
      points: updatedQuestions.reduce(
        (s: number, q: any) => s + (q.points || 0),
        0
      ),
    };
    await quizzesClient.updateQuiz(updatedQuiz);
    dispatch(updateQuizAction(updatedQuiz));
    setQuiz(updatedQuiz);
  };

  const handleTypeChange = (qId: string, newType: string) => {
    const updatedQuestions = (quiz.questions || []).map((q: any) =>
      q._id === qId ? { ...q, type: newType } : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSaveAll = async (publish = false) => {
    const updatedQuiz = { ...quiz, published: publish || quiz.published };
    await quizzesClient.updateQuiz(updatedQuiz);
    dispatch(updateQuizAction(updatedQuiz));
    if (publish) {
      router.push(`/courses/${cid}/quizzes`);
    } else {
      router.push(`/courses/${cid}/quizzes/${qid}`);
    }
  };

  return (
    <div className="p-3">
      {/* Tabs */}
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active>Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold fs-5">Points: {totalPoints}</span>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleAddQuestion}
        >
          <FaPlus className="me-1" /> New Question
        </Button>
      </div>

      {quiz.questions?.length === 0 && (
        <div className="text-center text-muted py-4">
          No questions yet. Click <strong>New Question</strong> to add one.
        </div>
      )}

      <ListGroup className="rounded-0">
        {(quiz.questions || []).map((q: any) => (
          <ListGroupItem key={q._id} className="p-3">
            {editingId === q._id ? (
              <>
                {/* Type selector while editing */}
                <div className="mb-2 d-flex align-items-center gap-2">
                  <span className="fw-bold">Question Type:</span>
                  <Form.Select
                    style={{ width: "auto" }}
                    value={q.type}
                    onChange={(e) => handleTypeChange(q._id, e.target.value)}
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True / False</option>
                    <option value="FILL_BLANK">Fill in the Blank</option>
                  </Form.Select>
                </div>

                {q.type === "MULTIPLE_CHOICE" && (
                  <MultipleChoiceEditor
                    question={q}
                    onSave={handleSaveQuestion}
                    onCancel={() => setEditingId(null)}
                  />
                )}
                {q.type === "TRUE_FALSE" && (
                  <TrueFalseEditor
                    question={q}
                    onSave={handleSaveQuestion}
                    onCancel={() => setEditingId(null)}
                  />
                )}
                {q.type === "FILL_BLANK" && (
                  <FillBlankEditor
                    question={q}
                    onSave={handleSaveQuestion}
                    onCancel={() => setEditingId(null)}
                  />
                )}
              </>
            ) : (
              /* Collapsed view */
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-4 text-muted" />
                  <div>
                    <span className="fw-bold">
                      {q.title || "Untitled Question"}
                    </span>
                    <span className="text-muted ms-2 fs-6">
                      ({q.type?.replace(/_/g, " ")}) — {q.points} pt
                      {q.points !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <FaEdit
                    style={{ cursor: "pointer" }}
                    className="text-primary fs-5"
                    onClick={() => setEditingId(q._id)}
                  />
                  <FaTrash
                    style={{ cursor: "pointer" }}
                    className="text-danger fs-5"
                    onClick={() => handleDeleteQuestion(q._id)}
                  />
                </div>
              </div>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleSaveAll(false)}>
          Save
        </Button>
        <Button variant="success" onClick={() => handleSaveAll(true)}>
          Save &amp; Publish
        </Button>
      </div>
    </div>
  );
}
