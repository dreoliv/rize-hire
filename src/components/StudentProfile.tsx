import { useParams, Link } from 'react-router-dom';
import type { Student } from '../types/student';
import './StudentProfile.css';

interface StudentProfileProps {
  students: Student[];
}

export function StudentProfile({ students }: StudentProfileProps) {
  const { id } = useParams<{ id: string }>();
  const student = students.find(s => s.id === id);

  if (!student) {
    return (
      <div className="profile-not-found">
        <h2>Student not found</h2>
        <Link to="/" className="back-link">← Back to all students</Link>
      </div>
    );
  }

  const getScoreClass = (score: number, max: number = 5) => {
    const percentage = (score / max) * 100;
    if (percentage >= 90) return 'score-excellent';
    if (percentage >= 75) return 'score-good';
    if (percentage >= 60) return 'score-average';
    return 'score-below';
  };

  const renderScoreBar = (score: number, max: number = 5) => {
    const percentage = (score / max) * 100;
    return (
      <div className="score-bar-container">
        <div
          className={`score-bar ${getScoreClass(score, max)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="profile-container">
      <Link to="/" className="back-link">← Back to all students</Link>

      <div className="profile-header">
        <img
          src={student.profilePicture}
          alt={student.name}
          className="profile-picture"
        />
        <div className="profile-header-info">
          <h1 className="profile-name">{student.name}</h1>
          <p className="profile-major">{student.major}</p>
          <p className="profile-college">{student.college} · Class of {student.graduationYear}</p>
          <div className="profile-contact">
            <span className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {student.email}
            </span>
            <span className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {student.location}
            </span>
          </div>
          <div className="profile-match-score">
            <span className="match-label">Match Score</span>
            <span className={`match-value ${getScoreClass(student.matchScore, 100)}`}>
              {student.matchScore}%
            </span>
          </div>
        </div>
      </div>

      <div className="profile-skills-tags">
        {student.skills.map(skill => (
          <span key={skill} className="skill-tag">{skill}</span>
        ))}
      </div>

      <div className="profile-grid">
        {/* Hard Skills Section */}
        <section className="profile-section hard-skills-section">
          <h2 className="section-title">Hard Skills</h2>

          {student.hardSkills.computerScience && (
            <div className="skill-category">
              <div className="skill-category-header">
                <h3>Computer Science</h3>
                <a
                  href={student.hardSkills.computerScience.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-link"
                >
                  View Portfolio →
                </a>
              </div>
              <div className="skills-list">
                {student.hardSkills.computerScience.skills.map(skill => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className={`skill-score ${getScoreClass(skill.score)}`}>
                        {skill.score}/5
                      </span>
                    </div>
                    {renderScoreBar(skill.score)}
                    <p className="skill-description">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {student.hardSkills.dataScience && (
            <div className="skill-category">
              <div className="skill-category-header">
                <h3>Data Science</h3>
                <a
                  href={student.hardSkills.dataScience.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-link"
                >
                  View Portfolio →
                </a>
              </div>
              <div className="skills-list">
                {student.hardSkills.dataScience.skills.map(skill => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className={`skill-score ${getScoreClass(skill.score)}`}>
                        {skill.score}/5
                      </span>
                    </div>
                    {renderScoreBar(skill.score)}
                    <p className="skill-description">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Soft Skills Section */}
        <section className="profile-section soft-skills-section">
          <h2 className="section-title">Soft Skills</h2>

          <div className="soft-skill-item">
            <div className="soft-skill-header">
              <span className="soft-skill-name">Proactivity</span>
              <span className={`soft-skill-score ${getScoreClass(student.softSkills.proactivity.score)}`}>
                {student.softSkills.proactivity.score}/5
              </span>
            </div>
            {renderScoreBar(student.softSkills.proactivity.score)}
            <p className="soft-skill-description">{student.softSkills.proactivity.description}</p>
            {student.softSkills.proactivity.details && (
              <p className="soft-skill-details">{student.softSkills.proactivity.details}</p>
            )}
          </div>

          <div className="soft-skill-item">
            <div className="soft-skill-header">
              <span className="soft-skill-name">Communication</span>
              <span className={`soft-skill-score ${getScoreClass(student.softSkills.communication.score)}`}>
                {student.softSkills.communication.score}/5
              </span>
            </div>
            {renderScoreBar(student.softSkills.communication.score)}
            <p className="soft-skill-description">{student.softSkills.communication.description}</p>
            {student.softSkills.communication.details && (
              <p className="soft-skill-details">{student.softSkills.communication.details}</p>
            )}
          </div>

          <div className="soft-skill-item">
            <div className="soft-skill-header">
              <span className="soft-skill-name">Presentation Skills</span>
              <span className={`soft-skill-score ${getScoreClass(student.softSkills.presentationSkills.score)}`}>
                {student.softSkills.presentationSkills.score}/5
              </span>
            </div>
            {renderScoreBar(student.softSkills.presentationSkills.score)}
            <p className="soft-skill-description">{student.softSkills.presentationSkills.description}</p>
            {student.softSkills.presentationSkills.standoutTraits && (
              <div className="standout-traits">
                <span className="traits-label">Standout traits:</span>
                {student.softSkills.presentationSkills.standoutTraits.map(trait => (
                  <span key={trait} className="trait-tag">{trait}</span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Performance Metrics Section */}
        <section className="profile-section metrics-section">
          <h2 className="section-title">Performance Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-value">{student.performanceMetrics.avgDaysBeforeDeadline}</span>
              <span className="metric-label">Avg. days before deadline</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{student.performanceMetrics.attendanceRate}%</span>
              <span className="metric-label">Attendance rate</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{student.performanceMetrics.engagementScore}/5</span>
              <span className="metric-label">Engagement score</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{student.performanceMetrics.messagesPerCourse}</span>
              <span className="metric-label">Messages per course</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{student.performanceMetrics.avgResponseTimeHours}h</span>
              <span className="metric-label">Avg. response time</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{student.performanceMetrics.careerMilestoneGrade}/5</span>
              <span className="metric-label">Career milestone grade</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{student.performanceMetrics.interviewingGrade}/5</span>
              <span className="metric-label">Interviewing grade</span>
            </div>
          </div>
        </section>

        {/* Instructor Feedback Section */}
        <section className="profile-section feedback-section">
          <h2 className="section-title">Instructor Feedback</h2>

          <div className="recommendation-rate">
            <div className="recommendation-circle">
              <span className="recommendation-value">{student.instructorFeedback.recommendationRate}%</span>
            </div>
            <span className="recommendation-label">Recommendation Rate</span>
            <p className="recommendation-description">
              of instructors would recommend this student to potential employers
            </p>
          </div>

          <div className="testimonials">
            <h3 className="testimonials-title">Testimonials</h3>
            {student.instructorFeedback.testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-item">
                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonial-attribution">
                  <span className="testimonial-instructor">{testimonial.instructor}</span>
                  <span className="testimonial-course">{testimonial.course}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
