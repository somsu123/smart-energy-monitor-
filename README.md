# ⚡ EnergyPro - Smart Home Energy Monitor

A beautiful, real-time web application for monitoring and managing your home's energy consumption. Track power usage, control devices, and analyze energy costs with stunning visualizations.

![Smart Energy Monitor](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?logo=javascript&logoColor=black)

## ✨ Features

### 📊 Real-Time Monitoring
- **Live Power Tracking**: Monitor current power consumption across all devices
- **Automatic Updates**: Data refreshes every 5 seconds for real-time accuracy
- **Energy Cost Calculation**: Automatic cost estimation based on your energy usage

### 📈 Interactive Dashboard
- **Dynamic Charts**: Powered by Chart.js for beautiful data visualization
- **Multiple Time Ranges**: View data by 24 hours, week, or month
- **Key Metrics**: Quick-glance cards showing current power, today's usage, and estimated costs

### 🔌 Device Management
- **6 Pre-configured Devices**: Refrigerator, TV, AC, Laptop, Lighting, Washing Machine
- **Toggle Controls**: Turn devices on/off with a single click
- **Visual Indicators**: Active devices highlighted in the sidebar and main grid
- **Power Monitoring**: Real-time wattage display for each device

### 🎨 Premium Design
- **Modern UI**: Clean, professional interface with smooth animations
- **Glassmorphism Effects**: Contemporary design aesthetics
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Dark Blue Theme**: Eye-friendly color scheme with vibrant accents

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or build tools required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/somsu123/smart-energy-monitor.git
   cd smart-energy-monitor
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

3. **Access the application**
   - Open your browser to `http://localhost:8000`
   - Start monitoring your energy usage!

## 📁 Project Structure

```
smart-energy-monitor/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and responsive design
├── app.js              # Application logic and data simulation
└── README.md           # This file
```

## 🎯 How to Use

### Viewing Energy Data
1. **Dashboard Overview**: See your current power consumption, today's usage, and estimated costs at a glance
2. **Time Range Selection**: Click "24H", "Week", or "Month" buttons to change the chart view
3. **Chart Interaction**: Hover over the chart to see detailed power consumption at specific times

### Managing Devices
1. **View Active Devices**: Check the sidebar to see which devices are currently running
2. **Toggle Devices**: Click "TURN ON" or "TURN OFF" buttons in the device grid
3. **Monitor Power**: Watch how turning devices on/off affects your total power consumption
4. **Real-time Updates**: Stats and charts update automatically when you toggle devices

## 🛠️ Technology Stack

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern styling with custom properties and animations
- **Vanilla JavaScript**: Zero dependencies for core functionality
- **Chart.js**: Beautiful, responsive charts (CDN)
- **Google Fonts**: Inter font family for modern typography

## 🎨 Customization

### Changing Energy Cost Rate
Edit the cost per kWh in `app.js`:
```javascript
// Default is $0.15 per kWh
this.costPerKwh = 0.15; // Change this value
```

### Adding New Devices
Add devices to the array in `app.js`:
```javascript
this.devices = [
    { id: 7, name: 'New Device', type: 'appliance', icon: '🔌', wattage: 100, isOn: false }
];
```

### Customizing Colors
Modify CSS variables in `style.css`:
```css
:root {
    --primary: #1a237e;      /* Main brand color */
    --accent: #00bcd4;       /* Accent color */
    --success: #4caf50;      /* Active device color */
}
```

## 📱 Responsive Design

The application automatically adapts to different screen sizes:
- **Desktop** (1024px+): Full sidebar with all features
- **Tablet** (768px-1024px): Optimized layout
- **Mobile** (<768px): Stacked layout with essential features

## 🔧 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📊 Data Simulation

The current version uses **simulated data** for demonstration purposes. To connect to real energy monitoring hardware:

1. Replace the `generateInitialData()` method with API calls to your energy monitor
2. Update the `startSimulation()` method to fetch real-time data from your device
3. Ensure your hardware provides power consumption data in watts

### Example API Integration
```javascript
async fetchRealTimeData() {
    const response = await fetch('/api/energy/current');
    const data = await response.json();
    return data;
}
```

## 🚀 Future Enhancements

- [ ] Backend API integration for persistent data storage
- [ ] User authentication and multiple profiles
- [ ] Historical data export (CSV, PDF)
- [ ] Energy-saving recommendations based on usage patterns
- [ ] Mobile app version (React Native)
- [ ] Integration with smart home platforms (Google Home, Alexa)
- [ ] Push notifications for unusual consumption
- [ ] Solar panel integration and tracking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2026 EnergyPro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Somsubhro**
- GitHub: [@somsu123](https://github.com/somsu123)

## 🙏 Acknowledgments

- Chart.js for the beautiful charting library
- Google Fonts for the Inter font family
- The open-source community for inspiration

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation above

---

<div align="center">
  <strong>⚡ Built with passion for a sustainable future ⚡</strong>
  <br>
  <sub>Star ⭐ this repository if you find it helpful!</sub>
</div>
