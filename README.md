﻿# phishing-workshops
AI-Powered Cybersecurity Sensitization Workshops
Show Image
A comprehensive educational platform designed to train students in phishing detection using an AI tool with 94% accuracy. This project includes a complete website with workshop materials, interactive AI demos, and downloadable resources.
🔍 Overview
This project provides a complete framework for conducting a series of 5 workshops aimed at improving students' ability to detect phishing attempts. At the core of these workshops is our proprietary AI model that achieves 94% accuracy in phishing detection.
Key Features

5-Workshop Series: Progressive training from fundamentals to certification
AI Detection Tool: Interactive demo showcasing 94% accurate phishing detection
Comprehensive Materials: Instructor guides, student handouts, presentations, and assessments
Responsive Design: Mobile-friendly website for all devices
Interactive Elements: Real-time AI analysis of sample phishing attempts

🗂️ Project Structure
phishing-workshops/
├── index.html                  # Homepage
├── css/
│   ├── bootstrap.min.css       # Bootstrap framework
│   └── style.css               # Custom styling
├── js/
│   ├── bootstrap.bundle.min.js # Bootstrap JavaScript
│   └── main.js                 # Custom functionality
├── images/                     # Image assets
├── ai-tool/                    # AI tool section
│   ├── index.html              # Tool overview
│   ├── demo.html               # Interactive demo
│   └── technical.html          # Technical specifications
├── workshops/                  # Workshop pages
│   ├── index.html              # Workshops overview
│   ├── workshop-1.html         # Workshop 1: Intro to Phishing
│   ├── workshop-2.html         # Workshop 2: Linguistic Patterns
│   ├── workshop-3.html         # Workshop 3: URL Analysis
│   ├── workshop-4.html         # Workshop 4: Hands-On Lab
│   └── workshop-5.html         # Workshop 5: Results & Certification
└── materials/                  # Downloadable resources
    ├── index.html              # Materials overview
    ├── instructor-guides/      # For instructors
    ├── student-handouts/       # For students
    ├── presentations/          # Slide decks
    ├── assessments/            # Evaluation tools
    └── ai-resources/           # AI-related documentation
🚀 Getting Started
Prerequisites

Web server (Apache, Nginx, etc.) or static hosting service
Modern web browser
Basic understanding of HTML/CSS/JS for any customizations

Installation

Clone the repository:
bashgit clone https://github.com/yourusername/phishing-workshops.git

Set up your web server to serve the project directory, or use a simple local server for development:
bash# Using Python (if installed)
cd phishing-workshops
python -m http.server 8000

Visit the website:

Local development: http://localhost:8000
Production: Configure your web server accordingly



Using a CDN (Alternative Setup)
If you prefer not to host the Bootstrap and Font Awesome files locally, replace the link and script tags in HTML files with:
html<!-- In head section -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- At end of body -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
📚 Workshop Series
The training program consists of 5 progressive workshops:

Introduction to Phishing & AI Tools: Fundamentals and AI demonstration
Linguistic Pattern Analysis: Identifying suspicious language
URL & Behavioral Analysis: Technical inspection and social engineering tactics
Hands-On Lab: Practical application with the AI tool
Results & Certification: Performance assessment and certification

Each workshop includes:

90-minute structured session
Instructor guide
Student handouts
Presentation slides
Pre/post assessments

🤖 AI Detection Tool
The website showcases our phishing detection AI with:

94% Accuracy: Extensively tested and validated
Interactive Demo: Analyze suspicious emails and URLs in real-time
Transparent Explanations: Clear indicators of detected phishing elements
Technical Documentation: Detailed specifications for interested users

🔧 Customization
Modifying Content

Edit HTML files to update text content
Modify /css/style.css for styling changes
Update images in the /images/ directory

Workshop Materials
Replace placeholder PDF files in the /materials/ directory with your actual content:

Instructor guides
Student handouts
Presentation slides
Assessment forms

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
👥 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📫 Contact
Your Name - Elijahadeyeye@proton.me
Project Link: https://github.com/yourusername/phishing-workshops
