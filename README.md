
# Aegis AI - Security Dashboard

Welcome to Aegis AI, a modern web application for monitoring digital assets and managing security findings. This dashboard provides a centralized view of your organization's security posture, allowing teams to track vulnerabilities, manage assets, and respond to threats effectively.

This project was built with [Lovable](https://lovable.dev).

## ✨ Features

Our security dashboard is packed with features designed to give you a comprehensive overview of your security landscape:

- **Secure User Authentication:** The application includes a complete authentication system powered by Supabase. Users can sign up, log in, and reset their passwords securely.

- **Dashboard Overview:** Get a high-level view of your security posture as soon as you log in. The dashboard displays key metrics like:
  - Total number of security findings.
  - A breakdown of findings by severity (Critical, High, Medium, Low).
  - A summary of your monitored digital assets.
  - Recent activity to keep you updated on the latest events.

- **Findings Management:** A dedicated section to manage all identified security vulnerabilities. You can:
  - View a detailed list of all findings.
  - Search and filter findings to quickly locate specific issues.
  - Drill down into each finding for in-depth details, including description, severity, status, and the affected assets.

- **Asset Management:** Keep track of all your digital assets in one place.
  - Easily add new assets such as servers, applications, or domains.
  - View a comprehensive list of all your managed assets.
  - (Coming soon) Associate assets with specific findings for better context.

- **Reporting:** (Coming Soon) Generate and download comprehensive security reports to share with your team and stakeholders.

- **User Settings:** (Coming Soon) Customize your profile and application preferences.

## 🛠️ Tech Stack

This project is built with a modern, robust stack designed for performance and scalability:

- **Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Backend & Authentication:** [Supabase](https://supabase.com/)
- **UI:** [shadcn/ui](https://ui.shadcn.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **Icons:** [Lucide React](https://lucide.dev/)

---

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3a26582c-1c31-44e9-a31d-bcf11c293d11) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3a26582c-1c31-44e9-a31d-bcf11c293d11) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
