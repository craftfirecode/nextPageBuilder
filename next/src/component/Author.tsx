type AuthorProps = {
    data: {
        username: string;
        name: string;
        email: string;
    };
}

const Author: React.FC<AuthorProps> = ({data}) => {
    return (
        <div>
            <h6>Author: {data.name}</h6>
            {/*<p>{data.name}</p>*/}
            {/*<p>{data.email}</p>*/}
        </div>
    );
}

export default Author;