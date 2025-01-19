import './index.css'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Header from '../Header'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Jobs = () => {
  const [profile, setProfile] = useState({})
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [employmentTypes, setEmploymentTypes] = useState([])
  const [salaryRange, setSalaryRange] = useState('')
  const [apiStatus, setApiStatus] = useState('SUCCESS') // SUCCESS | FAILURE | NO_DATA
  const history = useHistory()

  const token = Cookies.get('jwt_token')

  const fetchProfileDetails = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/profile', {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile_details)
      } else {
        setApiStatus('FAILURE')
      }
    } catch {
      setApiStatus('FAILURE')
    }
  }

  const fetchJobs = async () => {
    setIsLoading(true)
    const employmentTypeParam = employmentTypes.join(',')
    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${employmentTypeParam}&minimum_package=${salaryRange}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      })

      if (response.ok) {
        const data = await response.json()
        if (data.jobs.length === 0) {
          setApiStatus('NO_DATA')
        } else {
          setJobs(
            data.jobs.map(job => ({
              id: job.id,
              companyLogoUrl: job.company_logo_url,
              title: job.title,
              rating: job.rating,
              location: job.location,
              employmentType: job.employment_type,
              jobDescription: job.job_description,
              packagePerAnnum: job.package_per_annum,
            })),
          )
          setApiStatus('SUCCESS')
        }
      } else {
        setApiStatus('FAILURE')
      }
    } catch {
      setApiStatus('FAILURE')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfileDetails()
    fetchJobs()
  }, [])

  const handleSearch = () => {
    fetchJobs()
  }

  const handleEmploymentTypeChange = event => {
    const {id, checked} = event.target
    if (checked) {
      setEmploymentTypes(prevTypes => [...prevTypes, id])
    } else {
      setEmploymentTypes(prevTypes => prevTypes.filter(type => type !== id))
    }
  }

  const handleSalaryRangeChange = event => {
    setSalaryRange(event.target.id)
  }

  const retryFetch = () => {
    fetchProfileDetails()
    fetchJobs()
  }

  const navigateToJobDetails = id => {
    history.push(`/jobs/${id}`)
  }

  const renderJobs = () => {
    if (apiStatus === 'NO_DATA') {
      return (
        <div className="no-jobs-view">
          <img src="No Jobs view image URL" alt="no jobs" />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }

    return (
      <ul>
        {jobs.map(job => (
          <li
            key={job.id}
            onClick={() => navigateToJobDetails(job.id)}
            className="job-item"
          >
            <img src={job.companyLogoUrl} alt="company logo" />
            <h1>{job.title}</h1>
            <p>{job.rating}</p>
            <p>{job.location}</p>
            <p>{job.employmentType}</p>
            <h1>Description</h1>
            <p>{job.jobDescription}</p>
          </li>
        ))}
      </ul>
    )
  }

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={retryFetch}>
        Retry
      </button>
    </div>
  )

  const renderContent = () => {
    switch (apiStatus) {
      case 'SUCCESS':
        return renderJobs()
      case 'FAILURE':
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="job-container">
      <Header onClick={() => history.push('/')} />
      <div className="container mt-4">
        <div className="row gap-10px">
          <div className="card-container col-md-3">
            <div className="card bg-light p-3 shadow-rounded">
              <img
                className="profile-logo"
                src={profile.profile_image_url}
                alt="profile"
              />
              <div className="profile-desc p-3">
                <h2>{profile.name}</h2>
                <p>{profile.short_bio}</p>
              </div>
            </div>
            <div>
              <h3 className="sub-heading">Type of Employment</h3>
              <ul className="employment-section">
                {employmentTypesList.map(eachType => (
                  <li key={eachType.employmentTypeId}>
                    <input
                      type="checkbox"
                      id={eachType.employmentTypeId}
                      onChange={handleEmploymentTypeChange}
                    />
                    <label htmlFor={eachType.employmentTypeId}>
                      {eachType.label}
                    </label>
                  </li>
                ))}
              </ul>
              <h3 className="sub-heading">Salary Range</h3>
              <ul className="salary-section">
                {salaryRangesList.map(eachSalary => (
                  <li key={eachSalary.salaryRangeId}>
                    <input
                      type="radio"
                      name="salary"
                      id={eachSalary.salaryRangeId}
                      onChange={handleSalaryRangeChange}
                    />
                    <label htmlFor={eachSalary.salaryRangeId}>
                      {eachSalary.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={event => setSearchInput(event.target.value)}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={handleSearch}
              >
                <BsSearch />
              </button>
            </div>
            {isLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
