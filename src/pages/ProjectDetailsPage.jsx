import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Common/Navbar"
import StatsCard from "../components/Dashboard/StatsCard"
import Modal from "../components/Common/Modal"
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Target,
  Eye,
  Download,
  Edit,
  Trash2,
  ChevronDown,
} from "lucide-react"

// Dummy resume data
const dummyResumes = [
  {
    id: "1",
    name: "John Doe - Resume.pdf",
    score: 85,
    status: "accepted",
    uploadDate: "2023-10-26",
    notes: "Strong technical background",
  },
  {
    id: "2",
    name: "Jane Smith - Resume.pdf",
    score: 92,
    status: "accepted",
    uploadDate: "2023-10-25",
    notes: "Excellent leadership experience",
  },
  {
    id: "3",
    name: "Mike Johnson - Resume.pdf",
    score: 68,
    status: "pending",
    uploadDate: "2023-10-24",
    notes: "Good potential, needs more experience",
  },
  {
    id: "4",
    name: "Sarah Wilson - Resume.pdf",
    score: 45,
    status: "rejected",
    uploadDate: "2023-10-23",
    notes: "Does not meet minimum requirements",
  },
]

function ProjectDetailsPage() {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.id

  const [resumes, setResumes] = useState(dummyResumes)
  const [selectedResume, setSelectedResume] = useState(null)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [activeDropdown, setActiveDropdown] = useState(null)

  // Project data (in real app, this would be fetched based on projectId)
  const project = {
    id: projectId,
    title: "Software Engineer Hiring",
    description: "Hiring for our new product development team",
    jobTitle: "Full Stack Developer",
    jobDescription: "We are looking for an experienced full-stack developer to join our team...",
    threshold: 75,
    createdDate: "2023-10-26",
  }

  const acceptedResumes = resumes.filter((r) => r.status === "accepted").length
  const rejectedResumes = resumes.filter((r) => r.status === "rejected").length

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])

    // Simulate processing uploaded files
    files.forEach((file, index) => {
      setTimeout(
        () => {
          const newResume = {
            id: Date.now().toString() + index,
            name: file.name,
            score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
            status: "pending",
            uploadDate: new Date().toISOString().split("T")[0],
            notes: "Recently uploaded",
          }
          setResumes((prev) => [newResume, ...prev])
        },
        1000 * (index + 1),
      )
    })
  }

  const handleResumeAction = (resumeId, action) => {
    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === resumeId ? { ...resume, status: action === "accept" ? "accepted" : "rejected" } : resume,
      ),
    )
  }

  const handleDeleteResume = (resumeId) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== resumeId))
    setIsEditModalOpen(false)
  }

  const getScoreColor = (score, threshold) => {
    if (score >= threshold) return { color: "#059669" }
    if (score >= threshold - 10) return { color: "#d97706" }
    return { color: "#dc2626" }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "status-badge"
    switch (status) {
      case "accepted":
        return `${baseClasses} status-accepted`
      case "rejected":
        return `${baseClasses} status-rejected`
      default:
        return `${baseClasses} status-pending`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main style={{ paddingTop: "4rem" }}>
        <div className="container py-8">
          {/* Header with Back Button */}
          <div className="flex items-center mb-8">
            <button onClick={() => navigate("/dashboard")} className="back-button">
              <ArrowLeft size={18} /> {/* Slightly smaller icon */}
              Back to Dashboard
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-gray-600">{project.description}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Total Resumes" value={resumes.length} icon={<FileText size={32} />} />
            <StatsCard title="Accepted" value={acceptedResumes} icon={<CheckCircle size={32} />} />
            <StatsCard title="Rejected" value={rejectedResumes} icon={<XCircle size={32} />} />
            <StatsCard title="Threshold Score" value={`${project.threshold}%`} icon={<Target size={32} />} />
          </div>

          {/* Job Description Card */}
          <div className="card p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
            <p className="text-gray-600">{project.jobDescription}</p>
          </div>

          {/* File Upload Section */}
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
                onChange={handleFileUpload}
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

          {/* Resume List */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Resume List</h3>

            {resumes.length === 0 ? (
              <div className="text-center py-8">
                <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No resumes uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    style={{ borderColor: "#e5e7eb" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">{resume.name}</h4>
                          <span className={getStatusBadge(resume.status)}>
                            {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="font-semibold" style={getScoreColor(resume.score, project.threshold)}>
                            Score: {resume.score}%
                          </span>
                          <span>Uploaded: {resume.uploadDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1"> {/* Adjusted space-x for icon buttons */}
                        {/* Preview Button */}
                        <button
                          onClick={() => {
                            setSelectedResume(resume)
                            setIsPreviewModalOpen(true)
                          }}
                          className="resume-action-btn" // Using the new class
                          title="Preview"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Download Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === resume.id ? null : resume.id)}
                            className="resume-action-btn flex items-center" // Using the new class
                            title="Download"
                          >
                            <Download size={16} />
                            <ChevronDown size={12} className="ml-1" /> {/* Added margin for icon */}
                          </button>

                          {activeDropdown === resume.id && (
                            <div
                              className="dropdown-menu" // Ensure this class is used
                            >
                              <button className="dropdown-item"> {/* Ensure this class is used */}
                                Download PDF
                              </button>
                              <button className="dropdown-item"> {/* Ensure this class is used */}
                                Download DOCX
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Edit Button */}
                        <button
                          onClick={() => {
                            setSelectedResume(resume)
                            setIsEditModalOpen(true)
                          }}
                          className="resume-action-btn" // Using the new class
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>

                        {/* Accept/Reject Buttons */}
                        {resume.score < project.threshold && resume.status === "pending" && (
                          <div className="flex space-x-2 ml-4">
                            <button onClick={() => handleResumeAction(resume.id, "accept")} className="resume-accept-btn">
                              Accept
                            </button>
                            <button onClick={() => handleResumeAction(resume.id, "reject")} className="resume-reject-btn">
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      <Modal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} title="Resume Preview" size="lg">
        {selectedResume && (
          <div className="text-center py-8">
            <FileText size={64} className="text-teal mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedResume.name}</h3>
            <p className="text-3xl font-bold text-teal mb-4">Score: {selectedResume.score}%</p>
            <p className="text-gray-600">{selectedResume.notes}</p>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Resume" size="md">
        {selectedResume && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resume Name</label>
              <input type="text" value={selectedResume.name} className="input-field" readOnly />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
              <input type="number" value={selectedResume.score} className="input-field" readOnly />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={selectedResume.notes}
                className="input-field"
                style={{ resize: "none", height: "6rem" }}
                placeholder="Add notes about this resume"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => handleDeleteResume(selectedResume.id)}
                className="resume-reject-btn flex items-center space-x-2" // Re-using existing reject style for delete
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>

              <div className="flex space-x-3">
                <button onClick={() => setIsEditModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={() => setIsEditModalOpen(false)} className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div className="fixed inset-0" style={{ zIndex: 5 }} onClick={() => setActiveDropdown(null)} />
      )}
    </div>
  )
}

export default ProjectDetailsPage