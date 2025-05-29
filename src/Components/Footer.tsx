import { Github, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground px-6 py-8 mt-16 rounded-t-2xl shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left: Copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} ProjectFlow. All rights reserved.</p>

        {/* Right: Social Links */}
        <div className="flex items-center space-x-6">
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:you@example.com"
            className="hover:text-foreground transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="my-6 border-t border-border" />

      <div className="text-xs text-center text-muted-foreground">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            Akash Sharma
          </a>
        </p>
      </div>
    </footer>
  )
}
