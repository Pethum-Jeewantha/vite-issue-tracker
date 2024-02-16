import { Link as RadixLink } from '@radix-ui/themes'
import { Link as ReactLink } from "react-router-dom";

interface Props {
    href: string;
    children: string;
}

const Link = ({href, children}: Props) => {
  return (
    <ReactLink to={href}>
        <RadixLink>
            {children}
        </RadixLink>
    </ReactLink>
  )
}

export default Link
