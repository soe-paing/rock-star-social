import { ButtonGroup, IconButton, Button } from "@mui/material";

import { 
    ChatBubbleOutline as CommentIcon,
} from "@mui/icons-material"

export default function CommentButton({ item, showCommentForm }) {
    return (
        <ButtonGroup
            sx={{ ml: 3 }}
        >
            <IconButton
                size="small"
                onClick={ e => {
                showCommentForm(prev => !prev);
                e.stopPropagation();
            }}>
                <CommentIcon
                    fontSize="small"
                    color="info"
                />
            </IconButton>
            <Button
                size="small"
                variant="text">
                {item.comments ? item.comments.length : 0}
            </Button>
        </ButtonGroup>
    )
}