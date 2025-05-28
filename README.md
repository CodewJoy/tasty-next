# Tasty-Next: Full-Stack Recipe Management App with Next.js

**Tasty-Next** is a full-stack web application built with **Next.js 14 App Router**, designed to manage and share recipes. It integrates a local SQLite database and Cloudinary for image storage, and emphasizes modern full-stack practices with performance, SEO, and security in mind.

---

## Tech Stack

- **Next.js 14 (App Router)** – Full-stack framework with server components, dynamic routing, and metadata support.
- **React & `useActionState`** – For managing client-side form state and submissions.
- **better-sqlite3** – Lightweight and performant SQLite wrapper for data storage.
- **Cloudinary** – For secure image uploads and hosting.
- **XSS** – To sanitize user inputs and prevent cross-site scripting.
- **Slugify** – For generating SEO-friendly URLs.

---

## Key Features

- **Recipe CRUD operations** (create, read, update, delete)
- 📷 **Image upload** via Cloudinary with client-side `FormData`
- **XSS protection** via input sanitization
- **SEO optimization** with clean slugs and dynamic metadata
- **Server Actions & Revalidation** using:
  - `useActionState`
  - `revalidatePath()`
  - `redirect()`
- **Dynamic Routing** using `[mealSlug]` for individual recipe pages
- **404 handling** with `notFound()` for missing slugs

---

## Notable Next.js Techniques Used

- Server and Client Components separation
- `generateMetadata()` for dynamic SEO meta tags
- Server Actions for form handling (no REST API needed)
- File-based routing and layout structure
- SQLite access within Server Components

---

> This project demonstrates practical usage of Next.js 14 full-stack capabilities with a focus on simplicity, performance, and real-world features like image uploading and user-generated content.
