import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'
import {MdLocationOn} from 'react-icons/md'
import {MdWork} from 'react-icons/md'

const JobDetailedCard = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [jobDetails, setJobDetails] = useState({})
  const [apiError, setApiError] = useState(false)

  const getJobDetails = async () => {
    try {
      const {match} = props
      const {params} = match
      const {id} = params

      const token = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        setJobDetails(data)
        setIsLoading(false)
      } else {
        setApiError(true)
      }
    } catch (error) {
      setApiError(true)
    }
  }

  useEffect(() => {
    getJobDetails()
  }, [])

  if (isLoading) {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
      </div>
    )
  }

  if (apiError) {
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
      </div>
    )
  }

  const {job_details: jobDetailsData, similar_jobs: similarJobs} = jobDetails

  return (
    <div className="detailed-job-page d-flex flex-column align-items-center">
      <Header />
      <div className="job-details-container bg-light p-3 shadow rounded">
        <div className="item-header-section d-flex align-items-center">
          <img
            className="card-img"
            src={jobDetailsData.company_logo_url}
            alt="job details company logo"
          />
          <div className="header-section-meta">
            <h1>{jobDetailsData.title}</h1>
            <div className="meta-items-section">
              <p>⭐ {jobDetailsData.rating}</p>
              <p>|</p>
              <p>
                <MdLocationOn /> {jobDetailsData.location}
              </p>
            </div>
            <div className="job-meta d-flex justify-content-between align-items-center">
              <div>
                <p>
                  <MdWork /> {jobDetailsData.employment_type}
                </p>
              </div>
              <p>{jobDetailsData.package_per_annum}</p>
            </div>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="card-footer d-flex flex-column">
          <h1>Description</h1>
          <p>{jobDetailsData.job_description}</p>
          <h1>Skills</h1>
          <ul className="skills-section">
            {jobDetailsData.skills.map(skill => (
              <li className="skills" key={skill.name}>
                <img
                  className="skill-logo"
                  src={skill.image_url}
                  alt={skill.name}
                />
                <p>{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="job-life-section">
            <p className="life-desc">
              {jobDetailsData.life_at_company.description}
            </p>
            <img
              src={jobDetailsData.life_at_company.image_url}
              alt="life at company"
            />
          </div>
        </div>
      </div>
      <div className="similar-jobs-container">
        <h1>Similar Jobs</h1>
        <ul className="similar-job-card-section">
          {similarJobs.map(job => (
            <SimilarJobCard key={job.id} job={job} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default JobDetailedCard
