import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Navbar from "../components/Common/Navbar"
import StatsCard from "../components/Dashboard/StatsCard"
import ProjectCard from "../components/Dashboard/ProjectCard"
import Modal from "../components/Common/Modal"
import { Plus, FolderOpen, FileText } from "lucide-react"

// Dummy data
const dummyProjects = [
  {
    id: "1",
    title: "Software Engineer Hiring",
    description: "Hiring for our new product development team. Looking for experienced full-stack developers.",
    jobTitle: "Full Stack Developer",
    resumeCount: 45,
    threshold: 75,
    createdDate: "2023-10-26",
  },
  {
    id: "2",
    title: "Marketing Manager Position",
    description: "Seeking a creative marketing manager to lead our digital marketing initiatives.",
    jobTitle: "Marketing Manager",
    resumeCount: 32,
    threshold: 80,
    createdDate: "2023-10-25",
  },
  {
    id: "3",
    title: "Data Scientist Role",
    description: "Looking for a data scientist to join our analytics team and drive data-driven decisions.",
    jobTitle: "Data Scientist",
    resumeCount: 28,
    threshold: 85,
    createdDate: "2023-10-24",
  },
]

function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState(dummyProjects)
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    jobTitle: "",
    jobDescription: "",
    threshold: 75,
  })
  const [errors, setErrors] = useState({})

  const totalResumes = projects.reduce((sum, project) => sum + project.resumeCount, 0)

  const handleAddProject = () => {
    // Validate form
    const newErrors = {}

    if (!newProject.title.trim()) newErrors.title = "Project title is required"
    if (!newProject.description.trim()) newErrors.description = "Project description is required"
    if (!newProject.jobTitle.trim()) newErrors.jobTitle = "Job title is required"
    if (!newProject.jobDescription.trim()) newErrors.jobDescription = "Job description is required"
    if (newProject.threshold < 0 || newProject.threshold > 100) {
      newErrors.threshold = "Threshold must be between 0 and 100"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Add project
      const project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        jobTitle: newProject.jobTitle,
        resumeCount: 0,
        threshold: newProject.threshold,
        createdDate: new Date().toISOString().split("T")[0],
      }

      setProjects((prev) => [project, ...prev])
      setIsAddProjectModalOpen(false)
      setNewProject({
        title: "",
        description: "",
        jobTitle: "",
        jobDescription: "",
        threshold: 75,
      })
      setErrors({})
    }
  }

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main style={{ paddingTop: "4rem" }}>
        <div className="container py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hello, {user.name}!</h1>
              <p className="text-gray-600 mt-1">Welcome back to UST HR Tool</p>
            </div>

            <button onClick={() => setIsAddProjectModalOpen(true)} className="btn-primary flex items-center space-x-2">
              <Plus size={20} />
              <span>Add Project</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatsCard title="Total Resumes" value={totalResumes} icon={<FileText size={32} />} />
            <StatsCard title="Total Projects" value={projects.length} icon={<FolderOpen size={32} />} />
          </div>

          {/* Projects Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Projects</h2>

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first project</p>
                <button onClick={() => setIsAddProjectModalOpen(true)} className="btn-primary">
                  Create Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project.id)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Project Modal */}
      <Modal
        isOpen={isAddProjectModalOpen}
        onClose={() => {
          setIsAddProjectModalOpen(false)
          setErrors({})
        }}
        title="Add New Project"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
              className={`input-field ${errors.title ? "input-error" : ""}`}
              placeholder="Enter project title"
            />
            {errors.title && <p className="text-error">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
              className={`input-field ${errors.description ? "input-error" : ""}`}
              style={{ resize: "none", height: "6rem" }}
              placeholder="Describe the project"
            />
            {errors.description && <p className="text-error">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              value={newProject.jobTitle}
              onChange={(e) => setNewProject((prev) => ({ ...prev, jobTitle: e.target.value }))}
              className={`input-field ${errors.jobTitle ? "input-error" : ""}`}
              placeholder="Enter job title"
            />
            {errors.jobTitle && <p className="text-error">{errors.jobTitle}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
            <textarea
              value={newProject.jobDescription}
              onChange={(e) => setNewProject((prev) => ({ ...prev, jobDescription: e.target.value }))}
              className={`input-field ${errors.jobDescription ? "input-error" : ""}`}
              style={{ resize: "none", height: "8rem" }}
              placeholder="Describe the job requirements and responsibilities"
            />
            {errors.jobDescription && <p className="text-error">{errors.jobDescription}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Threshold Value (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={newProject.threshold}
              onChange={(e) => setNewProject((prev) => ({ ...prev, threshold: Number.parseInt(e.target.value) || 0 }))}
              className={`input-field ${errors.threshold ? "input-error" : ""}`}
              placeholder="Enter threshold percentage"
            />
            {errors.threshold && <p className="text-error">{errors.threshold}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setIsAddProjectModalOpen(false)
                setErrors({})
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleAddProject} className="btn-primary">
              Create Project
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DashboardPage
