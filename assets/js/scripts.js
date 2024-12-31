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
    const data = {
        labels: ['Month 1', 'Month 3', 'Month 6', 'Month 12'],
        datasets: [{
            label: 'Revenue Projections ($)',
            data: [20000, 60000, 80000, 100000],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            tension: 0.4
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Revenue Growth Over Time'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
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