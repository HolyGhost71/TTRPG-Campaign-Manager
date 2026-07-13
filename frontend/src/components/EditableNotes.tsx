import { useEffect, useState } from "react";

interface EditableNotesProps {
  initialValue?: string;
  onSave: (value: string) => void | Promise<void>;
}

export default function EditableNotes({
  initialValue,
  onSave,
}: EditableNotesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || "");

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  const handleSave = async () => {
    await onSave(value);
    setIsEditing(false);
  };

  return (
    <div className="notes-box" onDoubleClick={() => setIsEditing(true)}>
      {!isEditing ? (
        <div className="notes-text">
          {value ||
            "Be the first to add notes for this entity. Double click to add notes..."}
        </div>
      ) : (
        <div className="notes-editor">
          <textarea
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            autoFocus
          />

          <div className="notes-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
