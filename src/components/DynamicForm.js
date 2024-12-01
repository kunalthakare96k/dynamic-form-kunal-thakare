import React, { useState } from "react";
import { motion } from "framer-motion";

const mockApiResponses = {
  "User Information": {
    fields: [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "age", type: "number", label: "Age", required: false },
    ],
  },
  "Address Information": {
    fields: [
      { name: "street", type: "text", label: "Street", required: true },
      { name: "city", type: "text", label: "City", required: true },
      { name: "state", type: "dropdown", label: "State", options: ["Maharashtra", "Gujarat", "Rajasthan", "Karnataka", "Tamil Nadu"], required: true },
      { name: "zipCode", type: "text", label: "Zip Code", required: false },
    ],
  },
  "Payment Information": {
    fields: [
      { name: "cardNumber", type: "text", label: "Card Number", required: true },
      { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
      { name: "cvv", type: "password", label: "CVV", required: true },
      { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
    ],
  },
};

function DynamicForm({ onSubmit }) {
  const [selectedForm, setSelectedForm] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleDropdownChange = (e) => {
    const formType = e.target.value;
    setSelectedForm(formType);
    setFormFields(mockApiResponses[formType]?.fields || []);
    setFormData({});
  };

  const handleInputChange = (e, field) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    formFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Dynamic Form</h2>
      <label>Select Form Type:</label>
      <select onChange={handleDropdownChange}>
        <option value="">-- Select --</option>
        <option value="User Information">User Information</option>
        <option value="Address Information">Address Information</option>
        <option value="Payment Information">Payment Information</option> {/* Added */}
      </select>

      {formFields.length > 0 && (
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label>{field.label}</label>
              {field.type === "dropdown" ? (
                <select
                  name={field.name}
                  onChange={(e) => handleInputChange(e, field)}
                  required={field.required}
                >
                  <option value="">-- Select --</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  onChange={(e) => handleInputChange(e, field)}
                  required={field.required}
                />
              )}
              {errors[field.name] && <p style={{ color: "red" }}>{errors[field.name]}</p>}
            </motion.div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </motion.div>
  );
}

export default DynamicForm;
