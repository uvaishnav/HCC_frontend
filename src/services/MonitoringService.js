import axios from 'axios';

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
    console.log('[MonitoringService] Initialized');
  }

  async detectStress() {
    try {
      console.log('[Stress API] Making stress detection API call...');
      
      const response = await axios.post('http://127.0.0.1:4000/predict', {
        withCredentials: true
      });
      
      console.log('[Stress API] Response:', response.data);
      
      if (response.data) {
        const result = {
          stressLevel: response.data.stress_interpretation,
          confidence: response.data.stress_probability[0]
        };
        
        // Store the data point
        this.stressData.push({
          timestamp: new Date(),
          ...result
        });
        
        this.currentStressLevel = result.stressLevel;
        this.currentStressConfidence = result.confidence;
        
        console.log('[Stress API] Data point stored:', {
          totalPoints: this.stressData.length,
          latest: result
        });
        
        return result;
      }
      
      console.warn('[Stress API] No data in response');
      return null;
    } catch (error) {
      console.error('[Stress API] Error:', error);
      throw error;
    }
  }

  async detectEmotion() {
    if (!this.workModeActive) {
      console.log('[Emotion API] Work mode not active, skipping detection');
      return null;
    }

    try {
      console.log('[Emotion API] Making emotion detection API call...');
      
      const response = await axios.get('http://127.0.0.1:2000/predict');
      
      console.log('[Emotion API] Response:', response.data);
      
      if (response.data) {
        const result = {
          emotion: response.data.emotion,
          confidence: response.data.confidence,
          timestamp: new Date()
        };
        
        // Store the data point
        this.emotionData.push(result);
        
        console.log('[Emotion API] Data point stored:', {
          totalPoints: this.emotionData.length,
          latest: result
        });
        
        return result;
      }
      
      console.warn('[Emotion API] No data in response');
      return null;
    } catch (error) {
      console.error('[Emotion API] Error:', error);
      throw error;
    }
  }

  setWorkMode(active) {
    console.log('[MonitoringService] Setting work mode:', { 
      from: this.workModeActive, 
      to: active 
    });
    this.workModeActive = active;
    
    // Restart monitoring when work mode changes
    if (this.monitoringInterval) {
      this.stopMonitoring();
      this.startMonitoring();
    }
  }

  async monitoringCycle() {
    const timestamp = new Date();
    console.log('[Monitor] Running cycle at:', timestamp);
    
    try {
      // Always detect stress
      const stressResult = await this.detectStress();
      
      // Detect emotion if work mode is active
      if (this.workModeActive) {
        console.log('[Monitor] Work mode active, detecting emotion...');
        const emotionResult = await this.detectEmotion();
        if (emotionResult) {
          console.log('[Monitor] Emotion detection successful:', emotionResult);
        }
      }
      
      return {
        timestamp,
        stressResult,
        success: true
      };
    } catch (error) {
      console.error('[Monitor] Cycle failed:', error);
      return {
        timestamp,
        error: error.message,
        success: false
      };
    }
  }

  startMonitoring() {
    if (this.monitoringInterval) {
      console.log('[Monitor] Already active, stopping previous interval');
      this.stopMonitoring();
    }

    console.log('[Monitor] Starting monitoring service');
    
    // Run initial cycle immediately
    this.monitoringCycle();
    
    // Set up interval for subsequent cycles
    this.monitoringInterval = setInterval(() => {
      this.monitoringCycle();
    }, 30000); // 30 seconds interval
  }

  stopMonitoring() {
    if (this.monitoringInterval) {
      console.log('[Monitor] Stopping monitoring service');
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  getStats() {
    const now = new Date();
    const todayData = {
      stress: this.stressData.filter(d => d.timestamp.toDateString() === now.toDateString()),
      emotion: this.emotionData.filter(d => d.timestamp.toDateString() === now.toDateString())
    };

    console.log('[Stats] Current data:', {
      stressLevel: this.currentStressLevel,
      stressConfidence: this.currentStressConfidence,
      todayStressData: todayData.stress.length,
      todayEmotionData: todayData.emotion.length,
      workModeActive: this.workModeActive
    });

    return {
      stressLevel: this.currentStressLevel || 'No Data',
      stressConfidence: this.currentStressConfidence || 0,
      emotionBreakdown: this.calculateEmotionBreakdown(todayData.emotion),
      workMode: {
        focusTime: this.calculateFocusTime(),
        stressPeaks: this.countStressPeaks(todayData.stress)
      }
    };
  }

  calculateEmotionBreakdown(emotionData) {
    // Initialize counts for all possible emotions
    const counts = {
      Angry: 0,
      Disgust: 0,
      Fear: 0,
      Happy: 0,
      Sad: 0,
      Surprise: 0,
      Neutral: 0
    };

    // Count occurrences of each emotion
    emotionData.forEach(d => {
      if (d.emotion in counts) {
        counts[d.emotion]++;
      }
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    
    // Calculate percentages and sort by frequency
    const emotionsWithPercentages = Object.entries(counts)
      .map(([emotion, count]) => ({
        emotion,
        percentage: total ? (count / total) * 100 : 0
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3); // Get top 3

    // Convert to object format
    const breakdown = Object.fromEntries(
      emotionsWithPercentages.map(({ emotion, percentage }) => [emotion, percentage])
    );

    console.log('[Stats] Emotion breakdown:', breakdown);
    return breakdown;
  }

  calculateFocusTime() {
    if (!this.workModeActive || !this.emotionData.length) {
      console.log('[Stats] Focus time: 0 (work mode inactive or no data)');
      return '0h 0m';
    }
    
    const focusStates = ['Neutral', 'Happy'];
    const focusData = this.emotionData.filter(d => focusStates.includes(d.emotion));
    const totalMinutes = (focusData.length * 30) / 60; // 30 seconds intervals to hours
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    
    console.log('[Stats] Focus time calculated:', `${hours}h ${minutes}m`, {
      totalFocusPoints: focusData.length,
      totalPoints: this.emotionData.length
    });
    
    return `${hours}h ${minutes}m`;
  }

  countStressPeaks(stressData) {
    let peakCount = 0;
    let wasStressed = false;

    stressData.forEach(d => {
      const isStressed = d.stressLevel === 'Stress Detected';
      if (isStressed && !wasStressed) {
        peakCount++;
      }
      wasStressed = isStressed;
    });

    console.log('[Stats] Stress peaks:', peakCount, {
      totalDataPoints: stressData.length
    });
    return peakCount;
  }

  clearData() {
    console.log('[Monitor] Clearing all monitoring data');
    this.stressData = [];
    this.emotionData = [];
    this.currentStressLevel = null;
    this.currentStressConfidence = null;
  }
}

export default new MonitoringService(); 