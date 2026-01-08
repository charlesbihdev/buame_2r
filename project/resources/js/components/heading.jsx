export default function Heading({ title, description, ...props }) {
    return (
        <div {...props}>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
                <p className="text-muted-foreground mt-2 text-sm">
                    {description}
                </p>
            )}
        </div>
    );
}

