import './index.css'
import {MdLocationOn} from 'react-icons/md'
import {MdWork} from 'react-icons/md'
import {Link} from 'react-router-dom'

const JobCard = ({eachJob}) => {
  const {
    id,
    company_logo_url,
    employment_type,
    job_description,
    package_per_annum,
    title,
    location,
    rating,
  } = eachJob

  return (
    <Link className="text-decoration-none" to={`/jobs/${id}`}>
      <li
        key={id}
        className="bg-light p-3 d-flex flex-column shadow rounded mb-4"
      >
        <div className="d-flex flex-row align-items-center mb-3">
          <img
            src={company_logo_url}
            alt={`${title} logo`}
            className="me-3 company-logo"
          />
          <div className="d-flex flex-column flex-grow-1">
            <div className="d-flex flex-column ">
              <h5 className="mb-1 job-title">{title}</h5>
              <span className="job-rating">⭐ {rating}</span>
            </div>
          </div>
        </div>

        <div className="job-details-section mb-3">
          <div className="location-section ">
            <p className="mb-0 text-muted icon-section ">
              <MdLocationOn size={20} />
              {location}
            </p>
            <p className="mb-0 text-muted icon-section">
              <MdWork size={20} />
              {employment_type}
            </p>
          </div>
          <div>
            <p className="mb-0 text-muted">{package_per_annum}</p>
          </div>
        </div>

        <hr className="line" />

        <div className="job-desc">
          <h6 className="mb-2">Description</h6>
          <p className="text-muted">{job_description}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
