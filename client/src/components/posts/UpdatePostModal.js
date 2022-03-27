import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { useState } from 'react'

const UpdatePostModal = () => {
    //contexts
    const {postState: {post},
    showAddPostModal,
    setShowAddPostModal,
    updatePost,
    
    }
     = useContext(PostContext)

    //state
    const [updatedPost, setUpdatedPost] = useState(post)

    const { title, description, url, status } = updatedPost

    const onChangeUpdatedPostForm = event =>
		setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })

    //const closeDialog = () =>{
    //   resetAddPostData()
    //}

    const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updatePost(updatedPost)
        //resetAddPostData()
        //setShowToast({show:true, message, type:success? 'success' : 'danger'})
    }

    const resetAddPostData = () =>{
        setNewPost({title:'', description:'', url:'', status:'TO LEARN'})
        setShowAddPostModal(false)
    }

    return (
        <Modal show={showUpdatePostModal} >
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit} >
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help'
                        value={title} onChange={onChangeUpdatePostForm} />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Control as='textarea' rows={3} placeholder='Description' name='description'
                        value={description} onChange={onChangeUpdatePostForm}/>
                    </Form.Group>
                    <p></p>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Url' name='url'
                        value={url} onChange={onChangeUpdatePostForm}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='select' value={status} name='status' 
                        onChange={onChangeUpdatePostForm}>
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                    </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' >Cancel</Button>
                    <Button variant='primary' type='submit'>LearnIt!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal