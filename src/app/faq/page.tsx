import { CircleChevronDown } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
    const faqs = [
        {
            q: "What is Gyanrexa?",
            a: "Gyanrexa is a modern blogging platform where you can explore insightful articles on technology, lifestyle, health, entertainment, and more. Our goal is to share knowledge in a simple and engaging way.",
        },
        {
            q: "Can I contribute or write for Gyanrexa?",
            a: "Currently, we accept posts only from verified contributors and our editorial team. However, guest posting opportunities may open in the future. Keep an eye on our announcements!",
        },
        {
            q: "How do I contact the Gyanrexa team?",
            a: "You can contact us through our Contact page or directly via email at gyanrexa@gmail.com. We usually respond within 24–48 hours.",
        },
        {
            q: "Is the content on Gyanrexa free to read?",
            a: "Yes! All our articles are completely free to read. We believe that knowledge should be accessible to everyone.",
        },
        {
            q: "Can I share articles from Gyanrexa on social media?",
            a: "Absolutely. You’re welcome to share our articles as long as you give proper credit and link back to the original post.",
        },
        {
            q: "How often do you publish new articles?",
            a: "We try to publish fresh content every week, covering trending topics and evergreen guides to keep our readers informed and inspired.",
        },
        {
            q: "Do you have a newsletter or subscription option?",
            a: "We’re working on adding a newsletter feature soon so you can get the latest updates directly in your inbox!",
        },
    ];

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Here are some common questions about Gyanrexa and how we work.
            </p>

            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <details
                        key={idx}
                        className="group border border-gray-400 dark:border-gray-600 bg-base-100 rounded-xl p-4 transition-colors"
                    >
                        <summary className="flex justify-between items-center cursor-pointer list-none">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
                                {faq.q}
                            </h2>
                            <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">
                                <CircleChevronDown size={24} />
                            </span>
                        </summary>
                        <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                            {faq.a}
                        </p>
                    </details>
                ))}
            </div>

            <div className="mt-10 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    Still have questions?{" "}
                    <Link href="/contact" className="link link-primary">
                        Contact us
                    </Link>{" "}
                    — we’d love to help!
                </p>
            </div>
        </main>
    );
}
