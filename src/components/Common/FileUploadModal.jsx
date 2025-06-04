import React, { useState } from "react"
import Modal from "./Modal" // Adjust path if your Modal component is elsewhere
import { Upload, FileText, X } from "lucide-react"

function FileUploadModal({ isOpen, onClose, onFileSelect, allowedFileTypes, currentFileName }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      onFileSelect(file)
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      onFileSelect(file)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Job Description File" size="sm">
      <div
        className={`upload-area ${dragActive ? "border-primary-teal" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="upload-job-description-file-input" // Unique ID for this input
          className="upload-input"
          accept={allowedFileTypes}
          onChange={handleChange}
        />
        <label htmlFor="upload-job-description-file-input" className="cursor-pointer block">
          <Upload size={48} className="upload-area-icon" />
          <p className="upload-area-text">Drag and drop your file here, or click to browse.</p>
          <p className="text-sm text-gray-500">
            (Supported formats: {allowedFileTypes.split(",").map((type) => type.replace(".", "").toUpperCase()).join(", ")})
          </p>
        </label>
      </div>
      <div className="flex justify-end mt-4">
        <button type="button" onClick={onClose} className="btn-secondary">
          Close
        </button>
      </div>
    </Modal>
  )
}

export default FileUploadModal