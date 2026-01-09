export default function HeadingSmall({ title, description, ...props }) {
    return (
        <div {...props}>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
        </div>
    );
}


