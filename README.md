# Zahar King's Portfolio Website

A modern, responsive portfolio website built with Next.js and TailwindCSS, designed to showcase graphic design and marketing work effectively.

## Features

- **Responsive Design**: Seamlessly adapts to all devices from mobile to desktop
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Portfolio Projects**: Showcase design work with detailed project case studies
- **Resume Section**: Display professional experience, education, skills, and achievements
- **Admin Dashboard**: Built-in content editor for easy updates without coding knowledge
- **Modern UI**: Clean, minimal design that puts the creative work first
- **Optimized Visuals**: High-quality image presentation for design portfolios

## Tech Stack

- **Next.js**: React framework for production
- **TailwindCSS**: Utility-first CSS framework
- **Headless UI**: Unstyled, accessible UI components
- **GSAP**: Animation library for smooth transitions
- **Next Themes**: Dark mode implementation
- **Styled Components**: Component-level styling
- **UUID**: Unique ID generation for content items

## Getting Started

### Prerequisites

- Node.js (version 14.x or later recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/react-portfolio-zaza.git
cd react-portfolio-zaza
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Content Customization

All content is stored in the `data/portfolio.json` file. You can:

- Edit this file directly with your information
- Use the built-in admin dashboard by navigating to `/edit` (accessible in development mode)

### Main Sections

- **Header**: Update your name and tagline
- **Work**: Showcase your design projects with detailed case studies
- **Services**: List your design and marketing services
- **About**: Share your professional background and design philosophy
- **Contact**: Connect through social media and email
- **Resume**: Display professional experience, education, skills, and achievements
  - Experiences are stored as arrays of bullet points for better organization

### Resume Section

The resume section includes:
- Contact information
- Professional experience with detailed bullet points
- Education history
- Skills categorization
- Tools and software proficiencies
- Notable achievements

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy on Vercel

The easiest way to deploy this application is through Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with a single click

## License

This project is available for personal and commercial use.
