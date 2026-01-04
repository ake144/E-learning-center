"use client"

export default function Partners() {
    const partners = [
        { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
        { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
        { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
        { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    ]

    return (
        <section className="py-12 bg-gray-50 border-y border-gray-100">
            <div className="container mx-auto px-6">
                <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    Trusted by leading organizations and universities
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {partners.map((partner) => (
                        <img
                            key={partner.name}
                            src={partner.logo}
                            alt={partner.name}
                            className="h-8 w-auto object-contain"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
