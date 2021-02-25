import { TextField } from '@material-ui/core';
import { useState, useEffect, React} from 'react'
import {feedbackService} from '../../Service/FeedbackService'
import { withRouter } from 'react-router-dom';
import {EventBus} from '../../Service/EventBus'
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from "react-redux";


function _FeedbackForm(props) {
    const [feedbackObj, setFeedbackObj]  = useState(null)
    const [companyName, setCompanyName]  = useState('')
    const [feedback, setFeedback]  = useState('')
    const [rating, setRating]  = useState('')
    const [count, setCount]  = useState(0)
    const user = useSelector(state => state.userReducer.user)// from redux

    useEffect(() => {
        if(props.feedbackId && count===0){
            const getFeedback=(async() =>{
                const feedbackById=await feedbackService.getById(props.feedbackId)
                setFeedbackObj(feedbackById)
                setCompanyName(feedbackById.company_name)
                setRating(feedbackById.rating)
                setFeedback(feedbackById.feedback)
                setCount(count+1)
            })();
        }
    })
    const onInputChange=(event) =>{
        let name = event.target.name;
        let value = event.target.value;
        if (name === 'companyName'){
            setCompanyName(value)
        }
        if (name === 'feedback'){
            setFeedback(value)
        }
        if (name === 'rating'){
            setRating(value)
        }
    }

    const onSubmit= async (event) =>{
        event.preventDefault();
        const feedbackForSave={
            id:feedbackObj ? feedbackObj.id : null,
            user_id: user.googleId,
            company_name: companyName,
            feedback: feedback,
            rating: rating
        }
        await feedbackService.save(feedbackForSave)
        EventBus.emit('added')
        EventBus.emit('updated')
    }

    const onClose =() =>{
        EventBus.emit('added')
        EventBus.emit('updated')
    }
    
    return (
        <div className="modal-wrapper">
            <div className="modal-content">
                <form >
                <CloseIcon onClick={onClose}></CloseIcon>   

                    <div>
                    <TextField style={{marginBottom:"5px"}} error={ true } id="outlined-basic" label="Company Name" name="companyName" variant="outlined" defaultValue={companyName} onChange={onInputChange} />
                    </div>
                    <div>
                    <TextField style={{marginBottom:"5px"}} error={ true } id="outlined-basic" label="Feedback" name="feedback" variant="outlined" defaultValue={feedback} onChange={onInputChange} />
                    </div>
                    <div>
                    <TextField style={{width:"90%"}} error={ true } id="outlined-basic" type="number" inputProps={{ min: 0, max: 5 }} label="Rating" name="rating" variant="outlined" defaultValue={rating} onChange={onInputChange}/>
                    </div>
                    <button style={{backgroundColor: '#ED4D47', border: '0',color: 'White',borderRadius: '5px',width: '100px',height: '40px',fontWeight: 'bold',fontSize: '1rem',marginTop:'5px'}}onClick={onSubmit}>Save</button>   
                </form>
            </div>
        </div>
    )
}

export const FeedbackForm = withRouter(_FeedbackForm)
