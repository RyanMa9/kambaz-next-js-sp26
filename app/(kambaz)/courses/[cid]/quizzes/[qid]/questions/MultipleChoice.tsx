"use client";

import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function MultipleChoiceEditor({
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
  const [choices, setChoices] = useState<any[]>(
    question.choices?.length
      ? question.choices
      : [
          { _id: uuidv4(), text: "", isCorrect: true },
          { _id: uuidv4(), text: "", isCorrect: false },
        ]
  );

  const updateChoice = (id: string, field: string, value: any) => {
    setChoices((prev) =>
      prev.map((c) => (c._id === id ? { ...c, [field]: value } : c))
    );
  };

  const setCorrect = (id: string) => {
    setChoices((prev) => prev.map((c) => ({ ...c, isCorrect: c._id === id })));
  };

  const addChoice = () =>
    setChoices((prev) => [
      ...prev,
      { _id: uuidv4(), text: "", isCorrect: false },
    ]);

  const removeChoice = (id: string) =>
    setChoices((prev) => prev.filter((c) => c._id !== id));

  const handleSave = () => {
    onSave({
      ...question,
      title,
      points,
      question: text,
      type: "MULTIPLE_CHOICE",
      choices,
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

      <Form.Label className="fw-bold">Choices</Form.Label>
      {choices.map((choice) => (
        <div key={choice._id} className="d-flex align-items-center mb-2 gap-2">
          <Form.Check
            type="radio"
            name={`correct-${question._id}`}
            checked={choice.isCorrect}
            onChange={() => setCorrect(choice._id)}
            title="Mark as correct answer"
          />
          <FormControl
            value={choice.text}
            placeholder="Choice text"
            onChange={(e) => updateChoice(choice._id, "text", e.target.value)}
          />
          <FaTrash
            className="text-danger"
            style={{ cursor: "pointer", flexShrink: 0 }}
            onClick={() => removeChoice(choice._id)}
          />
        </div>
      ))}
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={addChoice}
        className="mb-3"
      >
        <FaPlus className="me-1" /> Add Choice
      </Button>

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
