# Human Centric Companion (HCC)

A real-time emotional and stress monitoring system that helps users track and manage their mental wellbeing.

## Table of Contents
- [Overview](#overview)
- [Architecture & Components](#architecture--components)
- [Installation](#installation)
- [Usage](#usage)
- [Detailed Code Logic](#detailed-code-logic)
- [Development](#development)
- [Innovation & Future Enhancements](#innovation--future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Overview
Human Centric Companion (HCC) is an innovative web application designed to monitor, analyze, and help manage a user's emotional state and stress levels in real-time. The project leverages two separate machine learning APIs to detect stress and emotions, providing personalized recommendations to improve mental wellbeing. The application is particularly focused on work environments, featuring a dedicated "Work Mode" that tracks focus time and stress peaks during work sessions.

## Architecture & Components
- **Folder Structure:**  
  - `/src/components`: UI components for different views
  - `/src/services`: Backend service communication and data processing
  - `/src`: Main application files including routing and global styles

- **Core Components:**  
  - **Dashboard**: Main user interface showing real-time stress levels, emotion breakdown, and personalized recommendations.
  - **Analytics**: Visual representation of emotional and stress data over time.
  - **EmergencyAlert**: Critical response interface triggered when high stress or concerning emotional states are detected.
  - **Settings**: Configuration options for the application.
  - **Calendar**: Calendar interface for tracking emotional patterns (placeholder implementation).

- **State Management:**  
  - Uses React's useState and useEffect hooks for component-level state management.
  - MonitoringService maintains application-wide state for stress and emotion data.

- **Routing:**  
  - React Router (v7) for navigation between different views.
  - NavLink components for sidebar navigation with active state styling.

## Installation
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/yourusername/HCC.git
   ```
2. **Install dependencies:**  
   ```bash
   npm install
   ```
3. **Start the development server:**  
   ```bash
   npm run dev
   ```
   
## Usage
- **How to run tests:**  
  ```bash
  npm test
  ```
- **Building for production:**  
  ```bash
  npm run build
  ```
- **Key features in action:**  
  - **Work Mode**: Toggle work mode in the Dashboard to start tracking focus time and stress peaks during work sessions.
  - **Real-time Stress Monitoring**: Continuously monitors stress levels with confidence ratings.
  - **Emotional Analysis**: When work mode is active, tracks and analyzes emotions, providing a breakdown of top emotions.
  - **Personalized Recommendations**: Offers tailored advice based on detected stress levels and emotional state.
  - **Emergency Alerts**: Triggers alerts when critical stress levels or concerning emotional states are detected.

## Detailed Code Logic

### Entry Point (main.jsx)
The application's entry point initializes the React application with React Router for navigation:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

The main.jsx file serves as the bootstrap for the entire application:
1. It imports React and ReactDOM core libraries
2. Sets up BrowserRouter as the routing system
3. Renders the main App component within React's StrictMode for additional development checks
4. Mounts the application to the DOM element with id 'root'

### Main Application (App.jsx)
App.jsx establishes the primary layout and routing structure:

```jsx
function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="app-title">Human Centric Companion</h1>
        <nav>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="icon-home">🏠</i>
            Dashboard
          </NavLink>
          {/* Additional NavLinks */}
        </nav>
      </aside>
      
      <main className="main-content">
        <header className="top-header">
          <div className="user-info">
            <h2>Vaishnav Uppalapati</h2>
            <p>Student, GITAM University</p>
          </div>
          <div className="notifications">
            <i className="icon-notification">🔔</i>
          </div>
        </header>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
```

Key logic in App.jsx:
1. Establishes a two-column layout with a sidebar for navigation and a main content area
2. Creates a responsive navigation menu with NavLink components that show active state
3. Implements React Router's Routes and Route components to handle navigation
4. Sets up a common header with user information and notification icon
5. Provides a consistent UI frame where different components (Dashboard, Analytics, etc.) are rendered based on the current route

### MonitoringService (MonitoringService.js)
This core service handles all API communication and data processing:

```javascript
class MonitoringService {
  constructor() {
    this.workModeActive = false;
    this.monitoringInterval = null;
    this.stressData = [];
    this.emotionData = [];
    this.currentStressLevel = null;
    this.currentStressConfidence = null;
    
    // Configure axios defaults
    axios.defaults.timeout = 5000; // 5 seconds timeout
  }

  async detectStress() {
    // API call to stress detection service
    // Data processing and storage
  }

  async detectEmotion() {
    // API call to emotion detection service
    // Data processing and storage
  }

  setWorkMode(active) {
    // Toggle work mode functionality
  }

  async monitoringCycle() {
    // Regular monitoring cycle that calls both APIs
  }

  startMonitoring() {
    // Initialize and start the monitoring interval
  }

  stopMonitoring() {
    // Clean up monitoring interval
  }

  getStats() {
    // Process and return current stats for UI components
  }

  calculateEmotionBreakdown(emotionData) {
    // Process emotion data into percentages
  }

  calculateFocusTime() {
    // Calculate focus time based on emotion data
  }

  countStressPeaks(stressData) {
    // Identify and count periods of high stress
  }
}
```

The MonitoringService implements a sophisticated real-time monitoring system:

1. **Class Construction and State Management:**
   - Initializes internal state variables to track work mode, monitoring interval, and collected data
   - Configures axios with a timeout to prevent hanging requests
   - Creates data structures for storing stress and emotion measurements

2. **Stress Detection:**
   - Makes API calls to an external stress detection service at http://127.0.0.1:4000/predict
   - Processes response data, extracting stress level interpretation and confidence scores
   - Stores timestamped stress data points in an internal array for later analysis
   - Updates current stress level and confidence values for immediate access

3. **Emotion Detection:**
   - Only runs when work mode is active to conserve resources
   - Communicates with emotion detection API at http://127.0.0.1:2000/predict
   - Processes and stores emotion classification with confidence scores
   - Maintains a timestamped history of emotion data

4. **Work Mode Management:**
   - Toggles between regular and work modes
   - Restarts monitoring with appropriate settings when work mode changes
   - Enables additional data collection (emotions) in work mode

5. **Monitoring Cycle:**
   - Runs on a fixed interval (every 30 seconds)
   - Always collects stress data
   - Conditionally collects emotion data when work mode is active
   - Implements error handling and logging

6. **Statistics Calculation:**
   - Provides current stress level and confidence
   - Calculates emotion distribution as percentages
   - Determines focus time based on "productive" emotions (Neutral, Happy)
   - Counts stress peaks to identify potentially problematic periods

7. **Service Lifecycle Management:**
   - Provides methods to start and stop monitoring
   - Handles cleanup to prevent memory leaks
   - Implements proper interval management

### Dashboard Component (Dashboard.jsx)
The Dashboard component serves as the main user interface:

```jsx
const Dashboard = () => {
  const [stats, setStats] = useState({
    stressLevel: null,
    stressConfidence: null,
    emotionBreakdown: {},
    workMode: {
      focusTime: '0h 0m',
      stressPeaks: 0
    }
  });

  const [workModeEnabled, setWorkModeEnabled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const updateStats = async () => {
    // Fetch and update statistics
    // Handle errors and implement retry logic
  };

  // Effect hooks for initialization and work mode changes
  
  // Render loading, error, or dashboard UI
}
```

The Dashboard component implements several key features:

1. **State Management:**
   - Uses React's useState hook to maintain component state
   - Tracks statistics, work mode status, errors, loading state, and retry attempts
   - Implements a structured state object that mirrors the data structure from MonitoringService

2. **Data Fetching and Error Handling:**
   - Implements the updateStats function to fetch current statistics from MonitoringService
   - Uses try/catch blocks for robust error handling
   - Implements an exponential backoff retry mechanism (tries up to 3 times with increasing delays)
   - Provides user feedback during loading and error states

3. **Lifecycle Management:**
   - Uses useEffect hook to initialize monitoring when component mounts
   - Sets up regular polling interval (30 seconds) to refresh statistics
   - Properly cleans up resources (intervals, monitoring) when component unmounts
   - Responds to work mode changes by updating the monitoring service

4. **User Interface:**
   - Renders different views based on component state (loading, error, or data)
   - Provides a work mode toggle for users to enable/disable enhanced monitoring
   - Displays stress level with confidence rating
   - Shows emotion breakdown with percentage bars
   - Presents work statistics including focus time and stress peaks
   - Offers personalized recommendations based on the user's current state

5. **Error Recovery:**
   - Provides manual retry functionality
   - Shows helpful error messages and troubleshooting tips

### Analytics Component (Analytics.jsx)
The Analytics component visualizes emotional and stress data:

```jsx
const Analytics = () => {
  const stats = monitoringService.getStats();
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="analytics">
      {/* Analytics UI components */}
    </div>
  );
};
```

Key aspects of the Analytics component:

1. **Data Acquisition:**
   - Retrieves statistics directly from the MonitoringService singleton
   - Formats the current date for display using JavaScript's toLocaleDateString

2. **Visualization Framework:**
   - Provides placeholder for future chart implementation
   - Organizes data into distinct cards for different analysis types

3. **UI Sections:**
   - Stress Level Overview: Shows trends in stress levels over time
   - Emotion Distribution: Displays percentage breakdown of detected emotions
   - Work Mode Insights: Correlates activities with stress levels
   - Recommendations: Offers personalized advice based on analytics

4. **Static Data Display:**
   - Currently implements a static UI to demonstrate the intended functionality
   - Prepared for integration with dynamic data visualization libraries

### EmergencyAlert Component (EmergencyAlert.jsx)
The EmergencyAlert component provides critical response functionality:

```jsx
const EmergencyAlert = () => {
  return (
    <div className="container">
      <div className="alert-header">
        <span>⚠️ Urgent: Emotional Distress Detected</span>
        <span className="alert-time">⏰ Alert triggered: 2m ago</span>
      </div>
      
      {/* Alert content, emergency contacts, and history */}
    </div>
  );
};
```

The EmergencyAlert component implements:

1. **Alert Notification:**
   - Prominently displays an urgent warning about detected emotional distress
   - Shows when the alert was triggered

2. **Action Buttons:**
   - Provides immediate response options: "Send Help Notification" and "Emergency Call"
   - Designed for critical situations requiring immediate attention

3. **Emergency Contacts:**
   - Displays a list of pre-configured emergency contacts
   - Shows contact type (therapist, family member, support group leader)
   - Includes profile images for quick visual identification

4. **Alert History:**
   - Maintains a chronological record of previous alerts
   - Shows the type of alert, action taken, and time since occurrence
   - Provides context for the current alert situation

5. **Visual Design:**
   - Uses high-contrast colors and warning icons to convey urgency
   - Implements a clean, focused UI to avoid overwhelming the user during crisis

### Settings and Calendar Components
These components are currently implemented as placeholder/stub components:

```jsx
// Settings.jsx
const Settings = () => {
  return (
    <div className="settings">
      <h2>Settings Page</h2>
      <p>Settings functionality will be implemented here.</p>
    </div>
  );
};

// Calendar.jsx
const Calendar = () => {
  return (
    <div className="calendar">
      <h2>Calendar Page</h2>
      <p>Calendar functionality will be implemented here.</p>
    </div>
  );
};
```

These components:
1. Serve as placeholders for future implementation
2. Maintain consistent routing structure
3. Provide feedback to users about upcoming functionality

### CSS Styling Logic
The application uses a component-based CSS approach:

1. **Global Styles:**
   - Index.css: Basic reset and global variables
   - App.css: Layout structure, sidebar, and common elements

2. **Component-Specific Styles:**
   - Dashboard.css: Styling for monitoring cards, stress indicators, and recommendations
   - Analytics.css: Chart layouts, stat cards, and data visualization elements
   - EmergencyAlert.css: Crisis-oriented UI with attention-grabbing styles
   - Settings.css: Configuration interface styling

3. **Common Design Patterns:**
   - Card-based UI components
   - Consistent color coding for stress levels (red for high, yellow for moderate, green for low)
   - Responsive layouts that adapt to different screen sizes
   - Clear visual hierarchy with section headings and contextual information

## Development
- **Coding Conventions:**  
  - React functional components with hooks
  - CSS files paired with individual components
  - Async/await pattern for API calls
  - Console logging for debugging with descriptive prefixes
  - Exponential backoff for API retries

- **Component Documentation:**  
  - Each component handles a specific section of the UI:
    - Dashboard.jsx: Main interface for real-time monitoring
    - Analytics.jsx: Data visualization and insights
    - EmergencyAlert.jsx: Critical alert system
    - Settings.jsx: User preferences and configuration
    - Calendar.jsx: Schedule and historical data view

- **API Integration:**  
  - Stress detection API: http://127.0.0.1:4000/predict
  - Emotion detection API: http://127.0.0.1:2000/predict
  - MonitoringService.js manages all API communication with retry logic

## Innovation & Future Enhancements
- **Current Innovations:**  
  - Real-time stress and emotion detection using machine learning APIs
  - Work mode focus tracking with automated recommendations
  - Emergency alert system for critical mental health situations
  - User-friendly interface with clear visualization of complex emotional data
  - Resilient monitoring service with exponential backoff for API failures

- **Roadmap:**  
  - Integration with wearable devices for physiological data
  - Machine learning model to predict stress triggers based on historical data
  - Mobile application with push notifications for stress alerts
  - Calendar integration for correlating appointments with stress levels
  - Social support network features for connecting with mental health professionals
  - Customizable intervention strategies based on user preferences

## Contributing
- **Guidelines:**  
  1. Fork the repository
  2. Create a feature branch (`git checkout -b feature/amazing-feature`)
  3. Commit your changes (`git commit -m 'Add some amazing feature'`)
  4. Push to the branch (`git push origin feature/amazing-feature`)
  5. Open a Pull Request

- **Branching Strategy:**  
  - `main`: Production-ready code
  - `develop`: Integration branch for features
  - `feature/*`: Individual feature development
  - `bugfix/*`: Bug fixes
  - `release/*`: Release preparation

- **Code of Conduct:**  
  This project follows a standard code of conduct promoting an open and welcoming environment for all contributors. Please be respectful and constructive in your interactions.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
