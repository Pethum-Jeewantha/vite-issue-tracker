import {useState} from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SimpleMDE from 'react-simplemde-editor';
// import {useWebSocket} from "@/app/contexts/WebSocketContext";
import {IssueInterface} from "../../../interfaces/issue.interface.ts";
import {useNavigate} from "react-router-dom";
import {issueSchema} from "../../../schema/issueSchemas.ts";
import {ErrorMessage, Spinner} from "../../../components/common";
import {useAppDispatch} from "../../../store/hooks.ts";
import API_CONFIG from "../../../config/api.config.ts";
import {create, update} from "../../../store/features/issue/issue.service.ts";

type IssueFormData = z.infer<typeof issueSchema>;

const endPoint = API_CONFIG.issues;

const IssueForm = ({ issue }: { issue?: IssueInterface }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // const {sendMessage} = useWebSocket();

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const { data: session } = useSession();

    const onSubmit = handleSubmit(async (data: IssueFormData) => {
        setIsSubmitting(true);

        if (issue) {
            const payload = {
                url: endPoint + `/${issue.id}`,
                data: data
            }
            dispatch(update(payload)).then((resp) => {
                if (resp.payload) navigate('/issues/list');

                setIsSubmitting(false);
                setError('An unexpected error occurred')
            });
        } else {
            const payload = {
                url: endPoint,
                data: data
            }
            dispatch(create(payload)).then((resp) => {
                if (resp.payload) navigate('/issues/list');

                setIsSubmitting(false);
                setError('An unexpected error occurred')
            });
        }
        //Todo: show error
    });

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color='red' className='mb-5'><Callout.Text>{error}</Callout.Text></Callout.Root>}
            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm
