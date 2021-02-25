import { useState, useEffect, React } from 'react'
import { feedbackService } from '../../Service/FeedbackService'
import { EventBus } from '../../Service/EventBus'
import { useSelector } from "react-redux";
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Feedback({ feedback }) {
  const [feedbackUpdate, setFeedbackUpdate] = useState(false)
  const user = useSelector(state => state.userReducer.user)// from redux

  useEffect(() => {
    EventBus.on('updated', () => {
      setFeedbackUpdate(false)
    });
  })

  const updateFeedback = () => {
    setFeedbackUpdate(true)
  }

  const deleteFeedback = async (feedbackId) => {
    await feedbackService.remove(feedbackId)
  }

  return (
    <tr style={{ marginBottom: "14px" }}>
      <td> {feedback.published_date}</td>
      <td> {feedback.company_name}</td>
      <td>{feedback.feedback}</td>
      <td>{feedback.rating}</td>
      <td>
        {user.admin && <IconButton onClick={() => { deleteFeedback(feedback.id) }}><DeleteIcon /></IconButton>}
      </td>
    </tr>

  )
}
