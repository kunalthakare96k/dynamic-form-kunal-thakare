import React, { useState } from "react";
import DynamicForm from "./components/DynamicForm";
import ProgressBar from "./components/ProgressBar";
import TableDisplay from "./components/TableDisplay";

function App() {
  const [formDataList, setFormDataList] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleFormSubmit = (formData) => {
    setFormDataList((prev) => [...prev, formData]);
  };

  const handleDelete = (index) => {
    setFormDataList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    console.log("Edit feature not implemented yet!");
  };

  return (
    <div>
      <DynamicForm onSubmit={handleFormSubmit} />
      <ProgressBar progress={progress} />
      {formDataList.length > 0 && (
        <TableDisplay
          data={formDataList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
