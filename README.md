# Midday.ai Clone

This repository contains the replication of the [Midday.ai](https://midday.ai) website as part of the internship project. The focus of this phase is to understand and set up the site at hand and prepare the development environment.  
The project focuses on how the running of the business, especially when it came to the bigger tasks it typically involves tracking time, sending invoices, which are scattered across different platforms.

## Project Goal  
The goal is to build a working clone of Midday.ai with similar structure, features, and design.  
- Phase 1 ensures a **proper context of the site** and sets up the **body of the project** for future reference.  

### 1. Website Analysis  
- Features:
    - Vault: Secure storage for important files like contracts and agreements, keeping everything in one place for easy access​.
    - Financial Overview: Track key financial metrics like revenue, profit and loss and expenses.
    - Time Tracking: Allows for live time tracking of projects to boost productivity and collaboration, providing insightful project overviews.
    - Invoice: An upcoming feature that will enable users to create web-based invoices, collaborate in real-time.)  
    - Animations and transitions.  
    - Interactive elements (forms, buttons, menus).  

- Identified **backend requirements**:
  - Authentication (login/signup).  
  - Data storage (user data, form submissions).  
  - Newsletter subscription.

### 2. Tooling Setup  
- Installed **Node.js** and **Python** locally.  
- Created **GitHub repository** for version control.  
- Installed **VS Code** with extensions:  
  - React snippets  
  - Bootstrapped project with:  
  - `create-react-app` (or Vite for a lighter setup).  
  - Initialized **Supabase** project (for database + authentication).  
  - Prepared **Vercel account** for future deployment.
 
  - Phase 2 builds the **frontend UI** using React, HTML and Java. Then it makes a fully functional **static UI** of Midday.ai clone without **backend functionality**.
 
  ### 1. Page Routing
  - I used a react router to set up navigation(Home, Features, Login, etc)
 
  ### 2. UI Components
  - I broke down the site into components that can be reused like Navbar, Footer, etc
  - I added a styling method using CSS Modules or Styled components
  - I also needed to match the actual website color scheme and spacing but I added a version for night and day background to switch to any given time or preference
 
 ### 3. Responsive Design
 - I had to ensure it was responsive to mobile/desktop and also tested using browser dev tools.

 ### 4. Animations
  - I used CSS animations to replicate the transitions the actual website does.
