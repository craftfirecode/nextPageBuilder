import {Link} from "react-router-dom";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";

const RichText = ({content}: any) => {
    return (
        <BlocksRenderer
            content={content}
            blocks={{
                paragraph: ({children}) => <p className="text-neutral900 max-w-prose">{children}</p>,
                heading: ({children, level}) => {
                    switch (level) {
                        case 1:
                            return <h1>{children}</h1>
                        case 2:
                            return <h2>{children}</h2>
                        case 3:
                            return <h3>{children}</h3>
                        case 4:
                            return <h4>{children}</h4>
                        case 5:
                            return <h5>{children}</h5>
                        case 6:
                            return <h6>{children}</h6>
                        default:
                            return <h1 className="bg-amber-300">{children}</h1>
                    }
                },
                // For links, you may want to use the component from your router or framework
                link: ({children, url}) => <Link to={url}>{children}</Link>,
            }}
            modifiers={{
                bold: ({children}) => <strong>{children}</strong>,
                italic: ({children}) => <span className="italic">{children}</span>,
            }}
        />
    )
}

export default RichText;