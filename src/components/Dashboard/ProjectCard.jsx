"use client"
import { Calendar, Users, Target, Briefcase } from "lucide-react"

function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-card-content">
        <div className="project-card-header">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-description">{project.description}</p>
        </div>

        <div className="project-card-meta">
          <div className="project-card-meta-item">
            <Briefcase size={16} className="project-card-meta-icon" />
            <span className="project-card-meta-text">{project.jobTitle}</span>
          </div>

          <div className="project-card-meta-item">
            <Users size={16} className="project-card-meta-icon" />
            <span className="project-card-meta-text">{project.resumeCount} Resumes</span>
          </div>

          <div className="project-card-meta-item">
            <Target size={16} className="project-card-meta-icon" />
            <span className="project-card-meta-text">Threshold: {project.threshold}%</span>
          </div>

          <div className="project-card-meta-item">
            <Calendar size={16} className="project-card-meta-icon" />
            <span className="project-card-meta-text">{project.createdDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
