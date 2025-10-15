export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Have questions, suggestions, or just want to say hello?  
        We’d love to hear from you!
      </p>

      <form className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input type="text" className="input input-bordered border-gray-400 dark:border-gray-600 w-full" placeholder="Your name" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input type="email" className="input input-bordered border-gray-400 dark:border-gray-600 w-full" placeholder="Your email" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Message</label>
          <textarea className="textarea textarea-bordered border-gray-400 dark:border-gray-600 w-full" rows={4} placeholder="Write your message..." required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>

      <p className="text-gray-700 dark:text-gray-300 mt-6">
        Or reach us directly at: <a href="mailto:gyanrexa@gmail.com" className="text-primary">gyanrexa@gmail.com</a>
      </p>
    </main>
  );
}
