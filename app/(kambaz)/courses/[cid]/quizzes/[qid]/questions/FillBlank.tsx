"use client";

import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function FillBlankEditor({
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
  const [blanks, setBlanks] = useState<string[]>(
    question.blanks?.length ? question.blanks : [""]
  );

  const updateBlank = (index: number, value: string) => {
    setBlanks((prev) => prev.map((b, i) => (i === index ? value : b)));
  };

  const addBlank = () => setBlanks((prev) => [...prev, ""]);

  const removeBlank = (index: number) =>
    setBlanks((prev) => prev.filter((_, i) => i !== index));

  const handleSave = () => {
    onSave({
      ...question,
      title,
      points,
      question: text,
      type: "FILL_BLANK",
      blanks: blanks.filter((b) => b.trim() !== ""),
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

      <Form.Label className="fw-bold">
        Accepted Answers (case-insensitive)
      </Form.Label>
      {blanks.map((blank, index) => (
        <div key={index} className="d-flex align-items-center mb-2 gap-2">
          <FormControl
            value={blank}
            placeholder={`Accepted answer ${index + 1}`}
            onChange={(e) => updateBlank(index, e.target.value)}
          />
          <FaTrash
            className="text-danger"
            style={{ cursor: "pointer", flexShrink: 0 }}
            onClick={() => removeBlank(index)}
          />
        </div>
      ))}
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={addBlank}
        className="mb-3"
      >
        <FaPlus className="me-1" /> Add Answer
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
