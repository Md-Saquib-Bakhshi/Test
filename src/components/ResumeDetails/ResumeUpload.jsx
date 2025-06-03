import { Upload } from "lucide-react"

function ResumeUpload({ onFileUpload, uploadedFiles }) {
  return (
    <div className="card p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Resumes</h3>
      <div
        className="border rounded-lg p-8 text-center hover:border-teal transition-colors"
        style={{
          borderWidth: "2px",
          borderStyle: "dashed",
          borderColor: "#d1d5db",
        }}
      >
        <Upload size={48} className="text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={onFileUpload}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="btn-primary cursor-pointer">
          Choose Files
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Uploaded Files:</h4>
          <ul className="space-y-1">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="text-sm text-gray-600">
                {file.name} - Processing...
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ResumeUpload
