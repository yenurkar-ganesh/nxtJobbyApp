import './index.css'

const SimilarJobCard = ({job}) => {
  return (
    <li
      key={job.id}
      className="similar-job-card bg-light p-4 shadow rounded text-black"
    >
      <section className="card-header">
        <img
          className="similar-card-img"
          src={job.company_logo_url}
          alt="similar job company logo"
        />
        <div className="card-meta">
          <h1>{job.title}</h1>
          <div className="card-meta-info">
            <p>⭐ {job.rating}</p>
            <p>|</p>
            <p>{job.location}</p>
          </div>
          <p className="job-type">{job.employment_type}</p>
        </div>
      </section>
      <hr className="hr-line" />
      <h3 className='desc'>Description</h3>
      <p>{job.job_description}</p>
    </li>
  )
}

export default SimilarJobCard
