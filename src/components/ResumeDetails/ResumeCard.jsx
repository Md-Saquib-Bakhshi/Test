import { Eye, Download, Edit } from "lucide-react"

function ResumeCard({ resume, onPreview, onEdit, onDownload, onAction, threshold }) {
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
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow" style={{ borderColor: "#e5e7eb" }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h4 className="font-medium text-gray-900">{resume.name}</h4>
            <span className={getStatusBadge(resume.status)}>
              {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <span className="font-semibold" style={getScoreColor(resume.score, threshold)}>
              Score: {resume.score}%
            </span>
            <span>Uploaded: {resume.uploadDate}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPreview(resume)}
            className="p-2 text-gray-400 hover:text-teal transition-colors"
            title="Preview"
          >
            <Eye size={16} />
          </button>

          <button
            onClick={() => onDownload(resume)}
            className="p-2 text-gray-400 hover:text-teal transition-colors"
            title="Download"
          >
            <Download size={16} />
          </button>

          <button
            onClick={() => onEdit(resume)}
            className="p-2 text-gray-400 hover:text-teal transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>

          {resume.score < threshold && resume.status === "pending" && (
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onAction(resume.id, "accept")}
                className="px-3 py-1 rounded-md transition-colors text-sm"
                style={{ backgroundColor: "#dcfce7", color: "#166534" }}
              >
                Accept
              </button>
              <button
                onClick={() => onAction(resume.id, "reject")}
                className="px-3 py-1 rounded-md transition-colors text-sm"
                style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeCard
