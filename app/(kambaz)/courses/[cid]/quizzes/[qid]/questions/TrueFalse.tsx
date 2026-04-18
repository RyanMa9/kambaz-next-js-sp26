"use client";

import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

export default function TrueFalseEditor({
  question,
  onSave,
  onCancel,
}: {
  question: any;
  onSave: (q: any) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(question.title || "");
  const [points, setPoints] = useState(question.points || 1);
  const [text, setText] = useState(question.question || "");
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(
    question.correctAnswer ?? true
  );

  const handleSave = () => {
    onSave({
      ...question,
      title,
      points,
      question: text,
      type: "TRUE_FALSE",
      correctAnswer,
    });
  };

  return (
    <div className="border rounded p-3 mb-3 bg-light">
      <div className="row mb-2">
        <Form.Group className="col-md-8">
          <Form.Label className="fw-bold">Title</Form.Label>
          <FormControl
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="col-md-4">
          <Form.Label className="fw-bold">Points</Form.Label>
          <FormControl
            type="number"
            min={0}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Question</Form.Label>
        <FormControl
          as="textarea"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Group>

      <Form.Label className="fw-bold">Correct Answer</Form.Label>
      <div className="d-flex gap-4 mb-3">
        <Form.Check
          type="radio"
          label="True"
          checked={correctAnswer === true}
          onChange={() => setCorrectAnswer(true)}
        />
        <Form.Check
          type="radio"
          label="False"
          checked={correctAnswer === false}
          onChange={() => setCorrectAnswer(false)}
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={handleSave}>
          Update Question
        </Button>
      </div>
    </div>
  );
}
