import React, { useState, useEffect } from 'react';
import monitoringService from '../services/MonitoringService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    stressLevel: null,
    stressConfidence: null,
    emotionBreakdown: {
      // Empty object - will be populated with top 3 emotions
    },
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
    try {
      setLoading(true);
      setError(null);
      
      console.log('[Dashboard] Getting current stats...');
      const currentStats = await monitoringService.getStats();
      console.log('[Dashboard] Current stats:', currentStats);
      
      setStats(currentStats);
      setRetryCount(0);
      
      console.log('[Dashboard] Stats updated successfully');
    } catch (err) {
      console.error('[Dashboard] Error in updateStats:', err);
      setError(err.message);
      
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        console.log(`[Dashboard] Will retry in ${delay/1000}s (Attempt ${retryCount + 1}/3)`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          updateStats();
        }, delay);
      } else {
        console.log('[Dashboard] Max retries reached');
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial setup effect
  useEffect(() => {
    console.log('[Dashboard] Component mounted, starting monitoring');
    
    // Start monitoring service with initial work mode state
    monitoringService.setWorkMode(workModeEnabled);
    monitoringService.startMonitoring();
    
    // Set up stats update interval
    const statsInterval = setInterval(updateStats, 30000);
    
    // Initial stats update
    updateStats();

    // Cleanup function
    return () => {
      console.log('[Dashboard] Component unmounting, cleaning up');
      clearInterval(statsInterval);
      monitoringService.stopMonitoring();
    };
  }, []); // Empty dependency array for initial setup

  // Work mode effect
  useEffect(() => {
    console.log('[Dashboard] Work mode changed:', { workModeEnabled });
    
    // Update monitoring service work mode status
    monitoringService.setWorkMode(workModeEnabled);
    
    // Get immediate stats update
    updateStats();
  }, [workModeEnabled]);

  const handleRetry = () => {
    console.log('[Dashboard] Manual retry requested');
    setRetryCount(0);
    setError(null);
    updateStats();
  };

  const toggleWorkMode = () => {
    console.log('[Dashboard] Toggling work mode from', workModeEnabled, 'to', !workModeEnabled);
    setWorkModeEnabled(!workModeEnabled);
  };

  if (loading && !stats.stressLevel) {
    return (
      <div className="dashboard-content">
        <div className="loading-state">
          <p>Loading data...</p>
          {retryCount > 0 && (
            <p className="retry-message">
              Retry attempt {retryCount}/3...
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-content">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={handleRetry}>Retry</button>
          {workModeEnabled && error.includes('emotion') && (
            <p className="help-text">
              Make sure your camera is connected and you've granted camera permissions.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div className="work-mode-toggle">
          <label>
            <input
              type="checkbox"
              checked={workModeEnabled}
              onChange={toggleWorkMode}
            />
            Work Mode {workModeEnabled ? '(Active)' : '(Inactive)'}
          </label>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card stress-level">
          <h3>Stress Level</h3>
          <div className="stress-status">
            <span className={`status ${stats.stressLevel?.toLowerCase().replace(' ', '-') || 'no-data'}`}>
              {stats.stressLevel || 'No Data'}
            </span>
            <span className="confidence">
              Confidence: {stats.stressConfidence ? (stats.stressConfidence * 100).toFixed(1) : 0}%
            </span>
          </div>
        </div>

        <div className="metric-card emotion-breakdown">
          <h3>Top 3 Emotions</h3>
          <div className="emotion-bars">
            {Object.entries(stats.emotionBreakdown).map(([emotion, percentage]) => (
              <div className="emotion-bar" key={emotion}>
                <span className="label">{emotion}</span>
                <div className="bar-container">
                  <div 
                    className={`bar ${emotion.toLowerCase()}`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="percentage">{percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="metric-card work-mode">
          <h3>Work Mode {workModeEnabled ? '(Active)' : '(Inactive)'}</h3>
          <div className="work-stats">
            <div className="stat">
              <span className="label">Focus Time</span>
              <span className="value success">{stats.workMode.focusTime}</span>
            </div>
            <div className="stat">
              <span className="label">Stress Peaks</span>
              <span className="value warning">{stats.workMode.stressPeaks} times</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recommendations-section">
        <h3>Recommendations</h3>
        <div className="recommendations-grid">
          <div className="recommendation-card">
            <div className="icon">❤️</div>
            <h4>Take a Break</h4>
            <p>Your stress levels are high. Consider a 15-minute meditation session.</p>
            <a href="#" className="action-link">Start Now</a>
          </div>
          <div className="recommendation-card">
            <div className="icon">💨</div>
            <h4>Breathing Exercise</h4>
            <p>Try this 5-minute breathing exercise to reduce anxiety.</p>
            <a href="#" className="action-link">Learn More</a>
          </div>
          <div className="recommendation-card">
            <div className="icon">🌙</div>
            <h4>Sleep Better</h4>
            <p>Improve your sleep schedule to reduce stress levels.</p>
            <a href="#" className="action-link">View Tips</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;