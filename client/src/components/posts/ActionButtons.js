import Button from "react-bootstrap/esm/Button";
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";



const ActionButtons = ({url, _id}) =>{

    const {deletePost, findPost, setShowUpdateModal, showUpdateModal} = useContext(PostContext)
    const choosePost = postId => {
        findPost(postId) 
        setShowUpdateModal(true)
    }
    return (
        <>
        <Button className="post-button" href={url} target='_blank'>
            <img src={playIcon} alt="play" width='32' height='32' />
        </Button>
        <Button className="post-button" onClick={choosePost.bind(this,_id)}>
            <img src={editIcon} alt="play" width='24' height='24' />
        </Button>
        <Button className="post-button" onClick={deletePost.bind(this, _id)}>
            <img src={deleteIcon} alt="play" width='24' height='24' />
        </Button>
        </>
    )
}

export default ActionButtons