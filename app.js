/* ===================================
   PORTFOLIO - JAVASCRIPT
   Interactive Features & Animations
=================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initProjectFilter();
    initProjectModal();
    initDownloadTracker();
});

/* ===================================
   NAVIGATION
=================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

/* ===================================
   TYPING EFFECT
=================================== */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    const phrases = [
        'Data Analyst',
        'Machine Learning Enthusiast',
        'Python Developer',
        'Data Visualization Expert'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ===================================
   SCROLL ANIMATIONS
=================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .timeline-item, .cert-card, .contact-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/* ===================================
   SKILL BARS
=================================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                entry.target.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

/* ===================================
   PROJECT FILTER
=================================== */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const categories = card.dataset.category;

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ===================================
   PROJECT MODAL
=================================== */
function initProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');

    // Project data
    const projectData = {
        sentiment: {
            title: 'Sentiment Analysis - Wisata Brebes',
            subtitle: 'NLP-based sentiment classification of tourist reviews',
            sections: [
                {
                    title: 'Project Overview',
                    icon: 'fa-info-circle',
                    content: `This project analyzes sentiment from tourist reviews of attractions in Brebes using 
                              Support Vector Machine (SVM) classification. The goal was to help tourism stakeholders 
                              understand visitor satisfaction and identify areas for improvement.`
                },
                {
                    title: 'Methodology',
                    icon: 'fa-cogs',
                    content: `<strong>Data Collection:</strong> Scraped reviews from various platforms<br>
                              <strong>Preprocessing:</strong> Text cleaning, tokenization, stopword removal, stemming<br>
                              <strong>Feature Extraction:</strong> TF-IDF Vectorization<br>
                              <strong>Modeling:</strong> SVM with RBF kernel, cross-validation`
                },
                {
                    title: 'Algorithm Comparison',
                    icon: 'fa-chart-bar',
                    type: 'comparison',
                    data: { svm: 87, nb: 78 }
                },
                {
                    title: 'Classification Report',
                    icon: 'fa-table',
                    type: 'table',
                    headers: ['Metric', 'Positive', 'Negative', 'Neutral'],
                    rows: [
                        ['Precision', '0.89', '0.85', '0.82'],
                        ['Recall', '0.87', '0.88', '0.80'],
                        ['F1-Score', '0.88', '0.86', '0.81']
                    ]
                },
                {
                    title: 'Sentiment Distribution',
                    icon: 'fa-chart-pie',
                    type: 'chart',
                    chartType: 'pie',
                    chartData: {
                        labels: ['Positive', 'Negative'],
                        data: [85.3, 14.7],
                        colors: ['#10b981', '#ef4444']
                    }
                },
                {
                    title: 'Model Results',
                    icon: 'fa-images',
                    type: 'gallery',
                    images: ['assets/konten1.png']
                }
            ],
            paperUrl: 'https://openlibrarypublications.telkomuniversity.ac.id/index.php/engineering/article/download/27583/26061/54564'
        },
        pale: {
            title: 'PALE - Pantau Lele',
            subtitle: 'IoT-based catfish pond monitoring system',
            sections: [
                {
                    title: 'Project Overview',
                    icon: 'fa-info-circle',
                    content: `PALE (Pantau Lele) is an IoT-based monitoring system for catfish farming. 
                              The system uses sensors to track water quality parameters in real-time, 
                              helping farmers maintain optimal conditions for fish health and growth.`
                },
                {
                    title: 'System Architecture',
                    icon: 'fa-network-wired',
                    content: `<strong>Sensors:</strong> pH, Temperature, Ammonia sensors<br>
                              <strong>Controller:</strong> ESP32 microcontroller<br>
                              <strong>Communication:</strong> MQTT protocol<br>
                              <strong>Dashboard:</strong> Real-time web monitoring`
                },
                {
                    title: 'Live Sensor Dashboard',
                    icon: 'fa-tachometer-alt',
                    type: 'iot'
                },
                {
                    title: 'Historical Data',
                    icon: 'fa-chart-line',
                    type: 'chart',
                    chartType: 'line',
                    chartData: {
                        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                        datasets: [
                            { label: 'Temperature (°C)', data: [27, 26, 28, 30, 29, 27], color: '#ef4444' },
                            { label: 'pH', data: [7.2, 7.1, 7.3, 7.4, 7.2, 7.1], color: '#10b981' }
                        ]
                    }
                },
                {
                    title: 'Project Activity & Documentation',
                    icon: 'fa-camera',
                    type: 'gallery',
                    images: [
                        { src: 'assets/pale_doc1.png', caption: 'Presentation Team & Overview' },
                        { src: 'assets/pale_doc2.png', caption: 'Mobile App & IoT Interface' },
                        { src: 'assets/pale_doc3.png', caption: 'System Architecture Diagram' },
                        { src: 'assets/pale_doc4.png', caption: 'Field Testing Activity' }
                    ]
                }
            ],
            paperUrl: 'https://jurnalfti.unmer.ac.id/index.php/senasif/article/view/594'
        },
        ecommerce: {
            title: 'E-Commerce Text Classification',
            subtitle: 'Automated product categorization using machine learning',
            sections: [
                {
                    title: 'Project Overview',
                    icon: 'fa-info-circle',
                    content: `This project automates the categorization of e-commerce products based on 
                              their text descriptions. Using NLP techniques and machine learning, the system 
                              classifies products into appropriate categories with high accuracy.`
                },
                {
                    title: 'Data Preprocessing',
                    icon: 'fa-broom',
                    type: 'toggle',
                    before: `{
  "text": "DISKON BESAR!! Beli sekarang SEPATU NIKE Air Max original 100%!!! size 42 warna hitam",
  "category": "?"
}`,
                    after: `{
  "text": "sepatu nike air max original size warna hitam",
  "category": "Fashion > Sepatu > Sneakers"
}`
                },
                {
                    title: 'Model Performance',
                    icon: 'fa-chart-bar',
                    type: 'chart',
                    chartType: 'bar',
                    chartData: {
                        labels: ['Random Forest', 'SVM', 'Naive Bayes', 'Logistic Regression'],
                        data: [88, 85, 79, 82],
                        colors: ['#6366f1', '#8b5cf6', '#a855f7', '#06b6d4']
                    }
                },
                {
                    title: 'Category Distribution',
                    icon: 'fa-tags',
                    type: 'chart',
                    chartType: 'doughnut',
                    chartData: {
                        labels: ['Fashion', 'Electronics', 'Home & Living', 'Books', 'Others'],
                        data: [35, 25, 20, 12, 8],
                        colors: ['#6366f1', '#8b5cf6', '#a855f7', '#06b6d4', '#64748b']
                    }
                },
                {
                    title: 'Project Documentation',
                    icon: 'fa-images',
                    type: 'gallery',
                    images: ['assets/konten3.png']
                }
            ],
            paperUrl: 'https://drive.google.com/file/d/1-KUVfWqGX9_ueImu_IzigzJQkNUNFANL/view?usp=sharing'
        }
    };

    // Open modal
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.dataset.project;
            const project = projectData[projectKey];

            if (project) {
                renderModalContent(project);
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function renderModalContent(project) {
        let html = `
            <div class="modal-header">
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-subtitle">${project.subtitle}</p>
            </div>
        `;

        project.sections.forEach((section, index) => {
            html += `
                <div class="modal-section">
                    <h3 class="modal-section-title">
                        <i class="fas ${section.icon}"></i>
                        ${section.title}
                    </h3>
            `;

            switch (section.type) {
                case 'comparison':
                    html += renderComparison(section.data);
                    break;
                case 'table':
                    html += renderTable(section.headers, section.rows);
                    break;
                case 'chart':
                    html += `<div class="modal-chart"><canvas id="chart-${index}"></canvas></div>`;
                    break;
                case 'iot':
                    html += renderIoTDashboard();
                    break;
                case 'toggle':
                    html += renderToggle(section.before, section.after, index);
                    break;
                case 'gallery':
                    html += renderGallery(section.images);
                    break;
                default:
                    html += `<p class="modal-text">${section.content}</p>`;
            }

            html += '</div>';
        });

        modalContent.innerHTML = html;

        // Initialize charts after content is rendered
        setTimeout(() => {
            project.sections.forEach((section, index) => {
                if (section.type === 'chart') {
                    renderChart(`chart-${index}`, section.chartType, section.chartData);
                }
            });

            // Initialize toggles
            initToggles();
        }, 100);

        if (project.paperUrl) {
            const paperBtn = document.createElement('div');
            paperBtn.className = 'modal-footer';
            paperBtn.style.marginTop = '30px';
            paperBtn.style.textAlign = 'center';
            paperBtn.innerHTML = `
                <a href="${project.paperUrl}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-external-link-alt"></i> View Published Paper
                </a>
            `;
            modalContent.appendChild(paperBtn);
        }
    }

    function renderComparison(data) {
        return `
            <div class="comparison-grid">
                <div class="comparison-card winner">
                    <div class="comparison-value">${data.svm}%</div>
                    <div class="comparison-label">SVM (Winner)</div>
                </div>
                <div class="comparison-card">
                    <div class="comparison-value">${data.nb}%</div>
                    <div class="comparison-label">Naive Bayes</div>
                </div>
            </div>
        `;
    }

    function renderTable(headers, rows) {
        let html = '<table class="metrics-table"><thead><tr>';
        headers.forEach(h => html += `<th>${h}</th>`);
        html += '</tr></thead><tbody>';
        rows.forEach(row => {
            html += '<tr>';
            row.forEach(cell => html += `<td>${cell}</td>`);
            html += '</tr>';
        });
        html += '</tbody></table>';
        return html;
    }

    function renderIoTDashboard() {
        return `
            <div class="iot-dashboard">
                <div class="sensor-card">
                    <div class="sensor-icon"><i class="fas fa-thermometer-half"></i></div>
                    <div class="sensor-value" id="temp-value">28.5°C</div>
                    <div class="sensor-label">Temperature</div>
                    <span class="sensor-status status-normal" id="temp-status">Normal</span>
                </div>
                <div class="sensor-card">
                    <div class="sensor-icon"><i class="fas fa-wind"></i></div>
                    <div class="sensor-value" id="ammonia-value">0.02 ppm</div>
                    <div class="sensor-label">Ammonia</div>
                    <span class="sensor-status status-normal" id="ammonia-status">Normal</span>
                </div>
                <div class="sensor-card">
                    <div class="sensor-icon"><i class="fas fa-tint"></i></div>
                    <div class="sensor-value" id="ph-value">7.2</div>
                    <div class="sensor-label">pH Level</div>
                    <span class="sensor-status status-normal" id="ph-status">Normal</span>
                </div>
            </div>
        `;
    }

    function renderToggle(before, after, index) {
        return `
            <div class="toggle-container">
                <button class="toggle-btn active" data-target="before-${index}">Before</button>
                <button class="toggle-btn" data-target="after-${index}">After</button>
            </div>
            <div class="toggle-content active" id="before-${index}">
                <pre class="data-preview">${before}</pre>
            </div>
            <div class="toggle-content" id="after-${index}">
                <pre class="data-preview">${after}</pre>
            </div>
        `;
    }

    function renderGallery(images) {
        let html = '<div class="project-gallery" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 15px;">';
        images.forEach(img => {
            if (typeof img === 'string') {
                html += `<img src="${img}" alt="Project Documentation" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">`;
            } else {
                html += `
                    <div class="gallery-item" style="text-align: center;">
                        <img src="${img.src}" alt="${img.caption}" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 8px;">
                        <p style="color: var(--text-secondary); font-size: 0.85rem;">${img.caption}</p>
                    </div>
                `;
            }
        });
        html += '</div>';
        return html;
    }

    function renderChart(canvasId, type, chartData) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const config = {
            type: type,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: { color: '#a0a0b0' }
                    }
                }
            }
        };

        if (type === 'line') {
            config.data = {
                labels: chartData.labels,
                datasets: chartData.datasets.map(ds => ({
                    label: ds.label,
                    data: ds.data,
                    borderColor: ds.color,
                    backgroundColor: ds.color + '20',
                    tension: 0.4,
                    fill: true
                }))
            };
            config.options.scales = {
                x: { ticks: { color: '#6b6b7b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#6b6b7b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            };
        } else if (type === 'bar') {
            config.data = {
                labels: chartData.labels,
                datasets: [{
                    label: 'Accuracy (%)',
                    data: chartData.data,
                    backgroundColor: chartData.colors,
                    borderRadius: 8
                }]
            };
            config.options.scales = {
                x: { ticks: { color: '#6b6b7b' }, grid: { display: false } },
                y: { ticks: { color: '#6b6b7b' }, grid: { color: 'rgba(255,255,255,0.05)' }, min: 0, max: 100 }
            };
        } else {
            config.data = {
                labels: chartData.labels,
                datasets: [{
                    data: chartData.data,
                    backgroundColor: chartData.colors,
                    borderWidth: 0
                }]
            };
        }

        new Chart(ctx, config);
    }

    function initIoTSimulation() {
        const tempEl = document.getElementById('temp-value');
        const ammoniaEl = document.getElementById('ammonia-value');
        const phEl = document.getElementById('ph-value');

        if (!tempEl) return;

        setInterval(() => {
            // Simulate sensor readings
            const temp = (27 + Math.random() * 4).toFixed(1);
            const ammonia = (0.01 + Math.random() * 0.04).toFixed(3);
            const ph = (6.8 + Math.random() * 0.8).toFixed(1);

            tempEl.textContent = temp + '°C';
            ammoniaEl.textContent = ammonia + ' ppm';
            phEl.textContent = ph;

            // Update status
            updateStatus('temp', parseFloat(temp), 25, 30);
            updateStatus('ammonia', parseFloat(ammonia), 0, 0.03);
            updateStatus('ph', parseFloat(ph), 6.5, 7.5);
        }, 2000);
    }

    function updateStatus(sensor, value, min, max) {
        const statusEl = document.getElementById(`${sensor}-status`);
        if (!statusEl) return;

        if (value >= min && value <= max) {
            statusEl.textContent = 'Normal';
            statusEl.className = 'sensor-status status-normal';
        } else {
            statusEl.textContent = 'Warning';
            statusEl.className = 'sensor-status status-warning';
        }
    }

    function initToggles() {
        const toggleBtns = document.querySelectorAll('.toggle-btn');

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.parentElement;
                const targetId = btn.dataset.target;

                // Update buttons
                parent.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update content
                const section = parent.parentElement;
                section.querySelectorAll('.toggle-content').forEach(c => c.classList.remove('active'));
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
}

/* ===================================
   DOWNLOAD TRACKER
=================================== */
function initDownloadTracker() {
    const downloadBtn = document.getElementById('download-cv');
    const countEl = document.getElementById('download-count');

    // Get stored count
    let downloadCount = parseInt(localStorage.getItem('cv-downloads') || '0');
    countEl.textContent = downloadCount;

    downloadBtn.addEventListener('click', () => {
        // Increment count
        downloadCount++;
        localStorage.setItem('cv-downloads', downloadCount);
        countEl.textContent = downloadCount;

        // Show feedback
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';

        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            countEl.textContent = downloadCount;
        }, 2000);
    });
}

/* ===================================
   UTILITY FUNCTIONS
=================================== */
// Smooth scroll polyfill for older browsers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
