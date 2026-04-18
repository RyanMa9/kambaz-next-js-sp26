"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, FormControl, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as quizzesClient from "../../client";
import GreenCheckmark from "../../../modules/GreenCheckmark";
import RedXMark from "../../../modules/RedXMark";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { quizzes } = useSelector((state: RootState) => state.quizReducer);

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [quiz, setQuiz] = useState<any>(
    quizzes.find((q: any) => q._id === qid) || null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!quiz) {
      quizzesClient.findQuizById(qid as string).then((data) => {
        if (data) setQuiz(data);
      });
    }
  }, [qid]);

  if (!quiz) return <div className="p-3">Loading...</div>;

  const questions = quiz.questions || [];
  const currentQ = questions[currentIndex];

  const setAnswer = (qId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    if (isFaculty) {
      // Grade locally for preview — don't persist
      let score = 0;
      let total = 0;
      for (const q of questions) {
        total += q.points;
        const userAnswer = answers[q._id];
        if (q.type === "MULTIPLE_CHOICE") {
          const correct = q.choices?.find((c: any) => c.isCorrect);
          if (correct && userAnswer === correct._id) score += q.points;
        } else if (q.type === "TRUE_FALSE") {
          if (userAnswer === q.correctAnswer) score += q.points;
        } else if (q.type === "FILL_BLANK") {
          const accepted = q.blanks?.map((b: string) => b.toLowerCase()) || [];
          if (userAnswer && accepted.includes(userAnswer.toLowerCase()))
            score += q.points;
        }
      }
      setResult({ score, total, answers });
    } else {
      try {
        const attempt = await quizzesClient.submitAttempt(
          qid as string,
          answers
        );
        setResult(attempt);
      } catch (err: any) {
        alert(err?.response?.data?.message || "Could not submit quiz.");
        return;
      }
    }
    setSubmitted(true);
    setCurrentIndex(0);
  };

  const isCorrect = (q: any): boolean => {
    const userAnswer = answers[q._id];
    if (q.type === "MULTIPLE_CHOICE") {
      const correct = q.choices?.find((c: any) => c.isCorrect);
      return correct && userAnswer === correct._id;
    }
    if (q.type === "TRUE_FALSE") return userAnswer === q.correctAnswer;
    if (q.type === "FILL_BLANK") {
      const accepted = q.blanks?.map((b: string) => b.toLowerCase()) || [];
      return userAnswer && accepted.includes(userAnswer.toLowerCase());
    }
    return false;
  };

  return (
    <div className="p-4">
      {isFaculty && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          <span> This is a preview. Student answers are not saved.</span>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/questions`)
            }
          >
            Edit Quiz
          </Button>
        </div>
      )}

      <h4>{quiz.title}</h4>
      {quiz.timeLimit && (
        <p className="text-muted">Time Limit: {quiz.timeLimit} minutes</p>
      )}

      {!submitted ? (
        <>
          {/* Progress */}
          <div className="mb-3">
            <ProgressBar
              now={((currentIndex + 1) / questions.length) * 100}
              label={`${currentIndex + 1} / ${questions.length}`}
            />
          </div>

          {/* Question */}
          {currentQ && (
            <div className="border rounded p-3 mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold">
                  Question {currentIndex + 1}: {currentQ.title}
                </span>
                <span className="text-muted">
                  {currentQ.points} pt{currentQ.points !== 1 ? "s" : ""}
                </span>
              </div>
              <p>{currentQ.question}</p>

              {currentQ.type === "MULTIPLE_CHOICE" &&
                (currentQ.choices || []).map((choice: any) => (
                  <Form.Check
                    key={choice._id}
                    type="radio"
                    name={`q-${currentQ._id}`}
                    label={choice.text}
                    checked={answers[currentQ._id] === choice._id}
                    onChange={() => setAnswer(currentQ._id, choice._id)}
                  />
                ))}

              {currentQ.type === "TRUE_FALSE" && (
                <div className="d-flex gap-4">
                  <Form.Check
                    type="radio"
                    name={`q-${currentQ._id}`}
                    label="True"
                    checked={answers[currentQ._id] === true}
                    onChange={() => setAnswer(currentQ._id, true)}
                  />
                  <Form.Check
                    type="radio"
                    name={`q-${currentQ._id}`}
                    label="False"
                    checked={answers[currentQ._id] === false}
                    onChange={() => setAnswer(currentQ._id, false)}
                  />
                </div>
              )}

              {currentQ.type === "FILL_BLANK" && (
                <FormControl
                  placeholder="Type your answer"
                  value={answers[currentQ._id] || ""}
                  onChange={(e) => setAnswer(currentQ._id, e.target.value)}
                />
              )}
            </div>
          )}

          {/* Question navigation */}
          <div className="d-flex gap-2 flex-wrap mb-3">
            {questions.map((_: any, i: number) => (
              <Button
                key={i}
                size="sm"
                variant={i === currentIndex ? "primary" : "outline-secondary"}
                onClick={() => setCurrentIndex(i)}
              >
                {i + 1}
              </Button>
            ))}
          </div>

          {/* Prev / Next / Submit */}
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => p - 1)}
            >
              Previous
            </Button>
            {currentIndex < questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => setCurrentIndex((p) => p + 1)}
              >
                Next
              </Button>
            ) : (
              <Button variant="success" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            )}
          </div>
        </>
      ) : (
        /* Results screen */
        <div>
          <div className="alert alert-success fs-5">
            Score:{" "}
            <strong>
              {result?.score ?? 0} / {result?.total ?? 0}
            </strong>
          </div>

          {questions.map((q: any, i: number) => {
            const correct = isCorrect(q);
            return (
              <div
                key={q._id}
                className={`border rounded p-3 mb-3 ${
                  correct
                    ? "border-success bg-success bg-opacity-10"
                    : "border-danger bg-danger bg-opacity-10"
                }`}
              >
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-bold">
                    {correct ? <GreenCheckmark /> : <RedXMark />} Q{i + 1}:{" "}
                    {q.title}
                  </span>
                  <span>
                    {q.points} pt{q.points !== 1 ? "s" : ""}
                  </span>
                </div>
                <p>{q.question}</p>
                <p>
                  <b>Your answer: </b>
                  {q.type === "MULTIPLE_CHOICE"
                    ? q.choices?.find((c: any) => c._id === answers[q._id])
                        ?.text || "—"
                    : String(answers[q._id] ?? "—")}
                </p>
                {!correct && (
                  <p className="text-success">
                    <b>Correct answer: </b>
                    {q.type === "MULTIPLE_CHOICE"
                      ? q.choices?.find((c: any) => c.isCorrect)?.text
                      : q.type === "TRUE_FALSE"
                      ? String(q.correctAnswer)
                      : q.blanks?.join(", ")}
                  </p>
                )}
              </div>
            );
          })}

          <div className="d-flex gap-2">
            {isFaculty && (
              <Button
                variant="secondary"
                onClick={() =>
                  router.push(`/courses/${cid}/quizzes/${qid}/questions`)
                }
              >
                Edit Quiz
              </Button>
            )}
            <Button
              variant="outline-primary"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
            >
              Back to Quiz Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
