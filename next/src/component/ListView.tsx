type ListViewProps = {
    cms: {
        List: {
            id: number,
            content: string
        }[];
    };
}

const ListView = (cms: ListViewProps) => {
    const list = cms.cms.List;

    return (
        <ul>
            {list.map((item: any) => (
                <li key={item.id}>{item.content}</li>
            ))}
        </ul>
    );
}

export default ListView;