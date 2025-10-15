export default function CategoriesPage() {
    const categories = [
        {
            name: "Mobiles",
            description: "Latest trends, tips, and comparisons in mobile technology.",
            icon: "📱"
        },
        {
            name: "Technology",
            description: "Insights into the newest tech innovations and tools.",
            icon: "💻"
        },
        {
            name: "Tips & Tricks",
            description: "Smart hacks to make your digital life easier.",
            icon: "💡"
        },
        {
            name: "Lifestyle",
            description: "Articles about modern living and personal growth.",
            icon: "🌿"
        },
        {
            name: "Health & Wellness",
            description: "Guides to maintaining a healthy and balanced life.",
            icon: "🏃‍♂️"
        },
        {
            name: "Entertainment",
            description: "Movies, music, and everything fun in between.",
            icon: "🎬"
        },
        {
            name: "Sports",
            description: "Stay updated with the world of sports and fitness.",
            icon: "⚽"
        }
    ];

    return (
        <main className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">Explore by Categories</h1>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
                Choose a topic that interests you and discover related blogs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(cat => (
                    <div
                        key={cat.name}
                        className="card bg-base-100 shadow-md p-5 hover:shadow-lg transition border border-gray-400 dark:border-gray-600"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {cat.icon} {cat.name}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{cat.description}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

