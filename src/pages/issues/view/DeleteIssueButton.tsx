import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {Spinner} from "../../../components/common";
import {useWebSocket} from "../../../context/WebSocketContext.tsx";
import LocalStorageUtil from "../../../lib/localStorage.lib.ts";
import {BasicUserInfo} from "@asgardeo/auth-react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const navigate = useNavigate();
    const {sendMessage} = useWebSocket();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    // const { data: session } = useSession();


    const deleteIssue = async () => {
        try {
            setDeleting(true);
            await axios.delete(`/api/issues/${issueId}`);
            navigate('/issues/list');

            sendMessage({ message: {isMessageSent: true, user: LocalStorageUtil.getItem<BasicUserInfo>("user")!.username!}});
        } catch (error) {
            setDeleting(false);
            setError(true);
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>
                        Delete Issue
                        {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this issue? This action cannot be undone.
                    </AlertDialog.Description>
                    <Flex mt='4' gap='3'>
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant='soft' color='red' onClick={deleteIssue}>Delete Issue</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Error
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue could not be deleted.
                    </AlertDialog.Description>
                    <Button mt='2' color='gray' variant='soft' onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
