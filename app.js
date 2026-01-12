// ===================================
// Smart Energy Monitor Application
// ===================================

class EnergyMonitor {
    constructor() {
        // Device data
        this.devices = [
            { id: 1, name: 'Refrigerator', type: 'appliance', icon: '🔌', wattage: 150, isOn: true },
            { id: 2, name: 'TV', type: 'entertainment', icon: '📺', wattage: 120, isOn: true },
            { id: 3, name: 'AC', type: 'hvac', icon: '❄️', wattage: 1000, isOn: false },
            { id: 4, name: 'Laptop', type: 'electronics', icon: '💻', wattage: 60, isOn: true },
            { id: 5, name: 'Lighting', type: 'lighting', icon: '💡', wattage: 40, isOn: true },
            { id: 6, name: 'Washing Machine', type: 'appliance', icon: '🔌', wattage: 500, isOn: false }
        ];

        // Energy data storage
        this.energyData = [];
        this.currentRange = '24h';
        this.chart = null;

        // Energy cost per kWh (in dollars)
        this.costPerKwh = 0.15;

        // Initialize
        this.init();
    }

    init() {
        // Generate initial data
        this.generateInitialData();

        // Setup event listeners
        this.setupEventListeners();

        // Initialize chart
        this.initChart();

        // Update UI
        this.updateUI();

        // Start real-time simulation
        this.startSimulation();

        // Update time display
        this.updateTimeDisplay();
        setInterval(() => this.updateTimeDisplay(), 1000);
    }

    // Generate initial 24 hours of data
    generateInitialData() {
        const now = new Date();
        for (let i = 23; i >= 0; i--) {
            const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
            const power = Math.random() * 1300 + 200; // Random power between 200W and 1500W
            this.energyData.push({
                timestamp,
                power,
                cost: (power / 1000) * this.costPerKwh
            });
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Time range buttons
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentRange = e.target.dataset.range;
                this.updateChart();
            });
        });
    }

    // Initialize Chart.js
    initChart() {
        const ctx = document.getElementById('energyChart').getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Power Consumption',
                    data: [],
                    borderColor: '#3f51b5',
                    backgroundColor: 'rgba(63, 81, 181, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#3f51b5',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: '600'
                        },
                        bodyFont: {
                            size: 13
                        },
                        borderColor: '#3f51b5',
                        borderWidth: 1,
                        callbacks: {
                            label: (context) => {
                                return `Power: ${context.parsed.y.toFixed(0)} W`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 11
                            },
                            callback: (value) => {
                                return value + ' W';
                            }
                        }
                    }
                }
            }
        });
    }

    // Update chart based on time range
    updateChart() {
        const now = new Date();
        let labels = [];
        let data = [];

        if (this.currentRange === '24h') {
            // Last 24 hours - show hourly data
            const last24h = this.energyData.filter(d => 
                (now - d.timestamp) <= 24 * 60 * 60 * 1000
            );

            labels = last24h.map(d => {
                const hours = d.timestamp.getHours();
                const minutes = d.timestamp.getMinutes();
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            });
            data = last24h.map(d => d.power);

            this.chart.options.scales.y.ticks.callback = (value) => value + ' W';
            this.chart.data.datasets[0].label = 'Power (W)';

        } else if (this.currentRange === '7d') {
            // Last 7 days - aggregate by day
            const dailyData = this.aggregateByDay(7);
            labels = dailyData.map(d => d.label);
            data = dailyData.map(d => d.value);

            this.chart.options.scales.y.ticks.callback = (value) => value.toFixed(1) + ' kWh';
            this.chart.data.datasets[0].label = 'Energy (kWh)';
            this.chart.config.type = 'bar';

        } else if (this.currentRange === '30d') {
            // Last 30 days - aggregate by week
            const weeklyData = this.aggregateByWeek(30);
            labels = weeklyData.map(d => d.label);
            data = weeklyData.map(d => d.value);

            this.chart.options.scales.y.ticks.callback = (value) => value.toFixed(1) + ' kWh';
            this.chart.data.datasets[0].label = 'Energy (kWh)';
            this.chart.config.type = 'bar';
        }

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
    }

    // Aggregate data by day
    aggregateByDay(days) {
        const now = new Date();
        const result = [];
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);
            
            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);
            
            const dayData = this.energyData.filter(d => 
                d.timestamp >= date && d.timestamp < nextDate
            );
            
            const totalEnergy = dayData.reduce((sum, d) => 
                sum + (d.power * 5 / 3600), 0 // Convert to kWh (assuming 5-second intervals)
            );
            
            const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
            
            result.push({
                label: dayName,
                value: totalEnergy
            });
        }
        
        return result;
    }

    // Aggregate data by week
    aggregateByWeek(days) {
        const result = [];
        const weeksCount = Math.ceil(days / 7);
        
        for (let i = 0; i < weeksCount; i++) {
            result.push({
                label: `Week ${i + 1}`,
                value: Math.random() * 50 + 10 // Simulated weekly data
            });
        }
        
        return result;
    }

    // Update all UI elements
    updateUI() {
        this.updateStats();
        this.updateDeviceGrid();
        this.updateSidebarDevices();
        this.updateChart();
    }

    // Update statistics cards
    updateStats() {
        // Calculate current power
        const currentPower = this.devices.reduce((sum, device) => {
            if (device.isOn) {
                const variation = Math.random() * 0.2 + 0.9; // 0.9 to 1.1
                device.currentPower = device.wattage * variation;
                return sum + device.currentPower;
            }
            device.currentPower = 0;
            return sum;
        }, 0);

        // Calculate today's usage
        const todayUsage = this.energyData.reduce((sum, d) => 
            sum + (d.power * 5 / 3600), 0 // Convert W to kWh
        );

        // Calculate estimated cost
        const estimatedCost = todayUsage * this.costPerKwh;

        // Update DOM
        document.getElementById('currentPower').textContent = Math.round(currentPower);
        document.getElementById('todayUsage').textContent = todayUsage.toFixed(1);
        document.getElementById('estimatedCost').textContent = `$${estimatedCost.toFixed(2)}`;
    }

    // Update device grid
    updateDeviceGrid() {
        const grid = document.getElementById('deviceGrid');
        grid.innerHTML = '';

        this.devices.forEach(device => {
            const card = document.createElement('div');
            card.className = `device-card ${device.isOn ? 'active' : ''}`;
            
            card.innerHTML = `
                <div class="device-header">
                    <span class="device-icon">${device.icon}</span>
                    <span class="device-name">${device.name}</span>
                </div>
                <div class="device-power">${Math.round(device.currentPower || 0)} W</div>
                <button class="device-toggle ${device.isOn ? 'on' : 'off'}" data-id="${device.id}">
                    ${device.isOn ? 'Turn OFF' : 'Turn ON'}
                </button>
            `;

            // Add toggle event listener
            card.querySelector('.device-toggle').addEventListener('click', () => {
                this.toggleDevice(device.id);
            });

            grid.appendChild(card);
        });
    }

    // Update sidebar device list
    updateSidebarDevices() {
        const list = document.getElementById('sidebarDeviceList');
        list.innerHTML = '';

        const activeDevices = this.devices.filter(d => d.isOn);
        
        if (activeDevices.length === 0) {
            list.innerHTML = '<div class="sidebar-device-item">No active devices</div>';
            return;
        }

        activeDevices.forEach(device => {
            const item = document.createElement('div');
            item.className = 'sidebar-device-item active';
            item.textContent = `${device.icon} ${device.name}`;
            list.appendChild(item);
        });
    }

    // Toggle device on/off
    toggleDevice(deviceId) {
        const device = this.devices.find(d => d.id === deviceId);
        if (device) {
            device.isOn = !device.isOn;
            this.updateUI();
        }
    }

    // Start real-time data simulation
    startSimulation() {
        setInterval(() => {
            // Calculate total power from active devices
            const totalPower = this.devices.reduce((sum, device) => {
                if (device.isOn) {
                    const variation = Math.random() * 0.2 + 0.9;
                    return sum + (device.wattage * variation);
                }
                return sum;
            }, 0);

            // Add new data point
            const now = new Date();
            this.energyData.push({
                timestamp: now,
                power: totalPower,
                cost: (totalPower / 1000) * this.costPerKwh
            });

            // Keep only last 24 hours of data
            const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            this.energyData = this.energyData.filter(d => d.timestamp > cutoff);

            // Update UI
            this.updateUI();
        }, 5000); // Update every 5 seconds
    }

    // Update time display
    updateTimeDisplay() {
        const now = new Date();
        
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        document.getElementById('currentTime').textContent = timeString;
        document.getElementById('currentDate').textContent = dateString;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EnergyMonitor();
});
