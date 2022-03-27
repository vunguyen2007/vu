import NavbarMenu from "../components/layout/NavbarMenu"
import { PostContext } from "../contexts/PostContext"
import { useContext } from "react"
import { useEffect } from "react"
import { AuthContext } from "../contexts/AuthContexts"
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col"
import Toast from "react-bootstrap/Toast"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip  from "react-bootstrap/Tooltip"
import SinglePost from "../components/posts/SinglePost"
import AddPostModal from "../components/posts/AddPostModal"
import addIcon from '../assets/plus-circle-fill.svg'
import UpdatePostModal from "../components/posts/UpdatePostModal"

const Dashboard = () => {
    
    //contexts
   
    const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)


    const {
        postState: {post, posts,postsLoading},
        getPosts,
        setShowAddPostModal,
        //showToast:{show, message,type},
        //setShowToast
    } = useContext(PostContext)
    //start: get all post
    useEffect(() => getPosts(), [])
    
    let body = null

    if(postsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info' />

            </div>
        )
    }else if (posts.length === 0){
        body = (
            <>
            <Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to LearnIt</Card.Title>
						<Card.Text>
							Click the button below to track your first skill to learn
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddPostModal.bind(this, true)}
						>
							LearnIt!
						</Button>
					</Card.Body>
				</Card>
            </>
        )
    }else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 max-auto mt-3'>
                    {posts.map( post =>(
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} />
                        </Col>

                    ))}
                </Row>
                {/* open add post modal*/}
                <OverlayTrigger placement='left' overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
                    <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
                        <img src={addIcon} alt="add-post" with='60' height='60'/>
                    </Button>
                </OverlayTrigger>
                
            </>
        )
    }

    return (
        <>
        <NavbarMenu></NavbarMenu>
        <>{body}</>
        <AddPostModal />
        {post !== null && <UpdatePostModal/>}
        {/* after post is added, showtoast
        <Toast show={true} style={{position:'fixed',top:'20%', right:'10px'}} className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {show:false, message:'',type:null})} delay={3000}
        >
            <Toast.Body>
                <strong>{message}</strong>
            </Toast.Body>
        </Toast> */}
        </>
        
    )
}

export default Dashboard