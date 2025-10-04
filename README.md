
# Image Gallery

A responsive image gallery built with Next.js featuring a beautiful masonry layout and full-screen slider functionality.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</p>

> **Layout Inspiration:**  
> [Gallery View on Dribbble](https://dribbble.com/shots/6438907-Gallery-View)

## ✨ Features

- 📱 Fully responsive masonry grid layout
- 🖼️ Full-screen modal slider with Swiper.js
- ⌨️ Keyboard navigation support (arrow keys, ESC)
- 🎨 Beautiful gradient UI with smooth animations
- 📡 Fetches images from JSONPlaceholder API
- ⚡ Loading states and error handling
- 🔄 Touch-friendly mobile experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
project/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # Home page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ImageGallery.tsx
│   │   └── ImageSlider.tsx
│   ├── services/         # API services
│   │   └── photoService.ts
│   └── types/            # TypeScript types
│       └── photo.ts
├── public/               # Static assets
└── ...config files
```

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Swiper.js](https://swiperjs.com/)** - Touch slider
- **[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** - Mock API

## 📝 API Integration

This project uses the [JSONPlaceholder Photos API](https://jsonplaceholder.typicode.com/photos) for fetching image metadata, combined with [Lorem Picsum](https://picsum.photos/) for the actual images.

---

Made with ❤️ by Nick