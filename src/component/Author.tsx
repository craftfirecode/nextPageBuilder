import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

type AuthorProps = {
    data: {
        username: string;
        name: string;
        email: string;
    };
}

const Author: React.FC<AuthorProps> = ({data}) => {
    return (
        <div className="my-5 flex items-center gap-3">
            Author
            <Avatar className="h-[45px] w-[45px] flex">
                <AvatarFallback className="text-purple-400 uppercase rounded-full leading-1 flex h-full w-full items-center justify-center bg-gray-100 text-[15px] font-medium">{data.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            {/*<p>{data.name}</p>*/}
            {/*<p>{data.email}</p>*/}
        </div>
    );
}

export default Author;