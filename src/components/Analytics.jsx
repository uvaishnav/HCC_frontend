import React from 'react';
import monitoringService from '../services/MonitoringService';
import './Analytics.css';

const Analytics = () => {
  const stats = monitoringService.getStats();
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="analytics">
      <div className="analytics-header">
        <div className="header-title">
          <i className="icon-analytics"></i>
          <h2>Emotional Analysis</h2>
        </div>
        <div className="header-actions">
          <span className="date">{currentDate}</span>
          <button className="view-report">View Full Report</button>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="stress-overview card">
          <h3>Stress Level Overview</h3>
          <div className="stress-chart">
            <div className="chart-legend">
              <span className="legend-item">
                <span className="dot high"></span> High
              </span>
              <span className="legend-item">
                <span className="dot moderate"></span> Moderate
              </span>
              <span className="legend-item">
                <span className="dot low"></span> Low
              </span>
            </div>
            <div className="chart-container">
              {/* Chart would be implemented with a charting library */}
            </div>
          </div>
        </div>

        <div className="emotion-distribution card">
          <h3>Emotion Distribution</h3>
          <div className="distribution-stats">
            <div className="stat-item">
              <i className="icon-happy"></i>
              <span className="label">Happy</span>
              <span className="value">45%</span>
            </div>
            <div className="stat-item">
              <i className="icon-neutral"></i>
              <span className="label">Neutral</span>
              <span className="value">30%</span>
            </div>
            <div className="stat-item">
              <i className="icon-stressed"></i>
              <span className="label">Stressed</span>
              <span className="value">15%</span>
            </div>
            <div className="stat-item">
              <i className="icon-tired"></i>
              <span className="label">Tired</span>
              <span className="value">10%</span>
            </div>
          </div>
        </div>

        <div className="work-insights card">
          <h3>Work Mode Insights</h3>
          <div className="insights-list">
            <div className="insight-item">
              <span className="label">Morning Meeting</span>
              <div className="progress-bar high"></div>
              <span className="status">High Stress</span>
            </div>
            <div className="insight-item">
              <span className="label">Focus Time</span>
              <div className="progress-bar low"></div>
              <span className="status">Low Stress</span>
            </div>
            <div className="insight-item">
              <span className="label">Team Collaboration</span>
              <div className="progress-bar moderate"></div>
              <span className="status">Moderate Stress</span>
            </div>
          </div>
        </div>

        <div className="recommendations card">
          <h3>Recommendations</h3>
          <div className="recommendations-list">
            <div className="recommendation-item">
              <i className="icon-breathe"></i>
              <div className="recommendation-content">
                <h4>Take Deep Breaths</h4>
                <p>Practice deep breathing exercises during high-stress moments</p>
              </div>
            </div>
            <div className="recommendation-item">
              <i className="icon-walk"></i>
              <div className="recommendation-content">
                <h4>Quick Walk</h4>
                <p>Consider a short walk after intense meetings</p>
              </div>
            </div>
            <div className="recommendation-item">
              <i className="icon-break"></i>
              <div className="recommendation-content">
                <h4>Regular Breaks</h4>
                <p>Take short breaks every 90 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 