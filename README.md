# Vyvsai - Tender Notification & Bidding Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org/)

## 🚀 About Vyvsai

Vyvsai is a comprehensive tender notification and bidding platform designed to streamline the procurement process for businesses. Our platform provides real-time notifications about government and corporate tenders, AI-powered bid support, and a marketplace for procurement needs.

### ✨ Key Features

- **Real-time Tender Notifications**: Get instant alerts for relevant tenders
- **AI-Powered Bid Support**: Intelligent assistance for creating competitive bids
- **Multi-channel Alerts**: Email, phone, and in-app notifications
- **Document Management**: Secure upload and management of tender documents
- **Subscription Plans**: Flexible pricing tiers for different business needs
- **Marketplace Integration**: Connect with suppliers and procurement opportunities
- **Regional Coverage**: Special focus on Himachal Pradesh with trial offerings

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1, React Router DOM
- **UI Framework**: Bootstrap with custom CSS
- **Authentication**: JWT with secure cookie management
- **HTTP Client**: Axios for API communication
- **Backend Integration**: Express.js, MongoDB, Mongoose
- **Animation**: Framer Motion for smooth transitions
- **Build Tool**: React Scripts (Create React App)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (version 8 or higher)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Ayushkiller/Team-Vyvsai-Website-real-one-.git
cd Team-Vyvsai-Website-real-one-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

### 4. Build for Production

```bash
npm run build
```

## 📚 Project Structure

```
vyvsai-website/
├── public/                 # Static assets
├── src/
│   ├── App/               # Main application components
│   ├── components/        # Reusable UI components
│   │   ├── Home/         # Landing page components
│   │   ├── Login/        # Authentication components
│   │   ├── Tender/       # Tender-related components
│   │   ├── Services/     # Service showcase
│   │   ├── Policy/       # Privacy policy and terms
│   │   └── ...
│   ├── Database/         # Database configuration
│   └── styles.css        # Global styles
├── build/                # Production build (auto-generated)
└── package.json          # Project dependencies
```

## 🔧 Available Scripts

- `npm start` - Runs the development server
- `npm run build` - Creates a production build
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (⚠️ irreversible)

## 🎯 Core Functionality

### User Authentication
- Secure registration and login system
- Password reset with OTP verification
- Protected routes for authenticated users

### Tender Management
- Browse available tenders with advanced filtering
- Real-time notifications for new opportunities
- Document upload and management

### Subscription Services
- **Basic Plan** (₹2,799/year): Unlimited notifications, priority support
- **Enterprise Plan** (₹14,999/year): Full feature access, AI bid support, tender filing

### Privacy & Security
- Comprehensive privacy policy implementation
- Secure data handling and storage
- GDPR-compliant data practices

## 🚀 Deployment

The application is containerized and can be deployed using:

### Captain Definition (CapRover)
```json
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
```

### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=your_api_url
REACT_APP_JWT_SECRET=your_jwt_secret
```

## 🤝 Contributing

We welcome contributions to improve Vyvsai! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Maintain consistent code formatting
- Add comments for complex business logic
- Test your changes thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Lead Developer

**Ayushkiller** - *Lead Developer & Project Architect*
- Primary contributor and maintainer
- Responsible for core architecture and feature development
- GitHub: [@Ayushkiller](https://github.com/Ayushkiller)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Ayushkiller/Team-Vyvsai-Website-real-one-/issues) page
2. Create a new issue with detailed information
3. Contact the development team through the platform

## 🌟 Acknowledgments

- React community for excellent documentation and tools
- Bootstrap team for the responsive UI framework
- Contributors and testers who helped improve the platform

---

**© 2025 Ayush. Built with ❤️ for better procurement processes.**
