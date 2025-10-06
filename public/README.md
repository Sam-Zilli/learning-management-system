# Learning Management System - File Organization

## 📁 Directory Structure

```
public/
├── 📄 index.html              # Main application page
├── 📄 404.html               # Error page
├── 📄 README.md              # This file
│
├── 📁 css/                   # Stylesheets
│   └── styles.css           # Main application styles
│
├── 📁 js/                    # JavaScript files
│   ├── firebase-app.js      # Firebase configuration & initialization
│   ├── firebase-config.js   # Legacy Firebase config (deprecated)
│   ├── app.js              # Main application logic
│   ├── course-management.js # Course loading & selection
│   └── module-navigation.js # Module & video navigation
│
└── 📁 scripts/              # Utility & setup scripts
    ├── populate-courses.js           # Legacy course population
    ├── populate-videos.js           # Legacy video population
    └── populate-hierarchical-courses.js # Current course structure
```

## 🎯 File Purposes

### Core Application Files
- **`index.html`** - Main learning platform interface
- **`css/styles.css`** - Main application styling
- **`js/app.js`** - Core application logic, authentication, video tracking
- **`js/firebase-app.js`** - Firebase SDK setup and configuration

### Course Management
- **`js/course-management.js`** - Dynamic course loading and selection
- **`js/module-navigation.js`** - Module tabs and video switching
- **`scripts/populate-hierarchical-courses.js`** - Database population script

### Utility Scripts
- **`scripts/populate-*.js`** - Database setup and population scripts
- **`404.html`** - Error page for missing routes

## 🔧 Development Notes

- All JavaScript files use ES6+ modules
- Firebase SDK v9+ modular imports
- Responsive design with mobile-first approach
- Course data uses hierarchical structure: Courses → Modules → Videos → Questions

## 🚀 Getting Started

1. Run `firebase serve` for local development
2. Use `scripts/populate-hierarchical-courses.js` to set up sample data
3. Main application runs on root `/`
