export function TeamSection() {
    const teamMembers = [
        {
            name: 'Sarah Osei',
            role: 'Founder & CEO',
            image: '/assets/visitors/team/sarah.jpg',
        },
        {
            name: 'Kwame Mensah',
            role: 'Head of Operations',
            image: '/assets/visitors/team/kwame.jpg',
        },
        {
            name: 'Ama Boateng',
            role: 'Community Lead',
            image: '/assets/visitors/team/ama.jpg',
        },
    ];

    return (
        <div className="bg-background-light px-6 py-20 lg:px-20">
            <div className="mx-auto max-w-[1280px] text-center">
                <h2 className="mb-12 text-3xl font-bold">Meet the Team</h2>
                <div className="flex flex-wrap justify-center gap-10">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex w-[200px] flex-col items-center gap-3">
                            <div
                                className="size-32 overflow-hidden rounded-full border-4 border-white shadow-lg"
                                style={{
                                    backgroundImage: `url(${member.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <div>
                                <h3 className="text-lg font-bold">{member.name}</h3>
                                <p className="text-sm font-medium text-[var(--primary)]">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

