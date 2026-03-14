export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-white">Contact</h1>
        <p className="text-slate-400 text-lg">Have any questions or suggestions? We'd love to hear from you</p>
      </div>

      <div className="bg-[#161925] rounded-2xl border border-slate-800/50 p-8">
        <h2 className="text-xl font-bold text-white mb-2">Send Message</h2>
        <p className="text-slate-400 text-sm mb-8">Fill out the form below and we'll get back to you soon</p>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full bg-[#0f111a] border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full bg-[#0f111a] border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
            <textarea
              id="message"
              rows={6}
              placeholder="Message"
              className="w-full bg-[#0f111a] border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
