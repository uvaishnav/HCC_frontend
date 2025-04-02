
import "./EmergencyAlert.css"; 

const EmergencyAlert = () => {
  return (
    <div className="container">
      <div className="alert-header">
        <span>⚠️ Urgent: Emotional Distress Detected</span>
        <span className="alert-time">⏰ Alert triggered: 2m ago</span>
      </div>

      <div className="alert-box">
        <div className="alert-content">
          <div className="alert-icon">❤️</div>
          <h2>High Stress or Suicidal Tendency Detected</h2>
          <p>Immediate attention required. Professional help is recommended.</p>
          <div className="button-group">
            <button className="help-btn">🚨 Send Help Notification</button>
            <button className="call-btn">📞 Emergency Call</button>
          </div>
        </div>
      </div>

      <div className="emergency-contacts">
        <h3>🚑 Emergency Contacts</h3>
        <div className="contacts">
          <div className="contact-card">
            <img src="https://via.placeholder.com/40" alt="Dr. Sarah Wilson" />
            <div>
              <p>Dr. Sarah Wilson</p>
              <span>Therapist</span>
            </div>
          </div>
          <div className="contact-card">
            <img src="https://via.placeholder.com/40" alt="John Smith" />
            <div>
              <p>John Smith</p>
              <span>Family Member</span>
            </div>
          </div>
          <div className="contact-card">
            <img src="https://via.placeholder.com/40" alt="Emma Davis" />
            <div>
              <p>Emma Davis</p>
              <span>Support Group Leader</span>
            </div>
          </div>
        </div>
      </div>

      <div className="alert-history">
        <h3>📜 Alert History</h3>
        <ul>
          <li>
            <strong>High Stress Alert</strong>
            <span>Notification sent to Dr. Wilson</span>
            <span className="time">2 hours ago</span>
          </li>
          <li>
            <strong>Emotional Distress Alert</strong>
            <span>Emergency contact notified</span>
            <span className="time">Yesterday</span>
          </li>
          <li>
            <strong>Anxiety Alert</strong>
            <span>Support group leader contacted</span>
            <span className="time">3 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyAlert;
