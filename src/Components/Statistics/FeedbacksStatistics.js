import { feedbackService } from '../../Service/FeedbackService'
import { useState, React } from 'react'

const FeedbacksStatistics = () => {
  const [feedbacks, setFeedbacks] = useState(null)
  const [feedbacksCouter, setFeedbacksCounter] = useState(0)
  const [rate0, setrate0] = useState(0)
  const [rate1, setrate1] = useState(0)
  const [rate2, setrate2] = useState(0)
  const [rate3, setrate3] = useState(0)
  const [rate4, setrate4] = useState(0)
  const [rate5, setrate5] = useState(0)
  const [feedbacksCouter1, setFeedbacksCounter1] = useState(0);
  const [filterBy, setFilterBy] = useState({})
  const [company_name, setCompanyName] = useState('')
  const [published_date, setPublishedDate] = useState('')
  const [flag, setFlag] = useState(false)

  const getFeedbacks = async (test) => {

    const data = await feedbackService.query(test)
    setFeedbacks(data);
    let count5 = 0
    let count4 = 0
    let count3 = 0
    let count2 = 0
    let count1 = 0
    let count0 = 0
    data.map(feedback => {
      if (feedback.rating === 0) {
        count0 += 1
        setrate0(count0)
      }
      if (feedback.rating === 1) {
        count1 += 1
        setrate1(count1)
      }
      if (feedback.rating === 2) {
        count2 += 1
        setrate2(count2)
      }
      if (feedback.rating === 3) {
        count3 += 1
        setrate3(count3)
      }
      if (feedback.rating === 4) {
        count4 += 1
        setrate4(count4)
      }
      if (feedback.rating === 5) {
        count5 += 1
        setrate5(count5)
      }
    })

  }

  const inputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'company_name') setCompanyName(value);
    if (name === 'published_date') setPublishedDate(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filterObj = {
      company_name: company_name,
      published_date: published_date
    }
    setFilterBy(filterObj)
    getFeedbacks(filterObj);
    setrate0(0)
    setrate1(0)
    setrate2(0)
    setrate3(0)
    setrate4(0)
    setrate5(0)

  }


  return (
    <div>
      <h3>Feedbacks Statistics</h3>
      <form onSubmit={handleSubmit}>
        <input className="inputFlights" onChange={inputChange} type="text" name="company_name" placeholder="Company Name"></input>
        <input className="inputFlights" onChange={inputChange} type="text" name="published_date" placeholder="mm/dd/yyyy"></input>
        <input type="submit" value="Search" />
      </form>

      {feedbacks && <div>
        <p>Number of feedbacks: {feedbacks.length}</p>
        <p>rating 0: {rate0}</p>
        <p>rating 1: {rate1}</p>
        <p>rating 2: {rate2}</p>
        <p>rating 3: {rate3}</p>
        <p>rating 4: {rate4}</p>
        <p>rating 5: {rate5}</p>
      </div>}
    </div>
  )
}

export default FeedbacksStatistics