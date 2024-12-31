// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    initializeChart();
});

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    const icon = themeToggle.querySelector('i');
    icon.setAttribute('data-feather', isDark ? 'sun' : 'moon');
    feather.replace();
    localStorage.setItem('darkMode', isDark);
    initializeChart(); // Reinitialize chart with new theme
}

// Initialize theme
const savedTheme = localStorage.getItem('darkMode');
setTheme(savedTheme === 'true' || (savedTheme === null && prefersDark.matches));

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark-mode'));
});

// Chart Initialization
function initializeChart() {
    const ctx = document.getElementById('financialChart').getContext('2d');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Theme-aware colors
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDark ? '#f3f4f6' : '#1f2937';
    
    const data = {
        labels: ['Month 1', 'Month 3', 'Month 6', 'Month 12'],
        datasets: [{
            label: 'Revenue Projections ($)',
            data: [20000, 60000, 80000, 100000],
            backgroundColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
            borderColor: isDark ? '#60a5fa' : '#3b82f6',
            borderWidth: 2,
            tension: 0.4
        }]
    };
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
        existingChart.destroy();
    }
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor
                    }
                },
                title: {
                    display: true,
                    text: 'Revenue Growth Over Time',
                    color: textColor
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: textColor
                    }
                }
            }
        }
    });
}

// Interactive Elements
document.querySelectorAll('.interactive-element').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.toggle('active');
        // Add your custom interaction logic here
    });
});