// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Add active class to current navigation item
    setActiveNavItem();
    
    // Handle workshop checkboxes in registration form
    setupWorkshopCheckboxes();
    
    // Handle registration form submission
    setupRegistrationForm();
    
    // Initialize tooltips
    initTooltips();
    
    // Setup AI demo interactions if on demo page
    if (document.querySelector('.ai-demo-interface')) {
        setupAIDemo();
    }
});

/**
 * Sets the active class on the current navigation item
 */
function setActiveNavItem() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // If the link href is in the current URL path, add active class
        if (href && currentPage.includes(href) && href !== '/index.html') {
            link.classList.add('active');
            
            // If it's a dropdown item, also activate the parent dropdown
            const dropdownParent = link.closest('.dropdown');
            if (dropdownParent) {
                const parentLink = dropdownParent.querySelector('.dropdown-toggle');
                if (parentLink) {
                    parentLink.classList.add('active');
                }
            }
        }
        
        // Special case for home page
        if (currentPage === '/' || currentPage === '/index.html') {
            const homeLink = document.querySelector('.navbar-nav .nav-link[href="/index.html"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    });
}

/**
 * Sets up the workshop checkboxes in the registration form
 */
function setupWorkshopCheckboxes() {
    const allWorkshopsCheck = document.getElementById('allWorkshopsCheck');
    const individualWorkshopChecks = document.querySelectorAll('input[type="checkbox"][id^="workshop"][id!="allWorkshopsCheck"]');
    
    if (!allWorkshopsCheck) return;
    
    // When "All Workshops" is checked/unchecked
    allWorkshopsCheck.addEventListener('change', function() {
        individualWorkshopChecks.forEach(checkbox => {
            checkbox.checked = allWorkshopsCheck.checked;
            checkbox.disabled = allWorkshopsCheck.checked;
        });
    });
    
    // When individual workshops are checked/unchecked
    individualWorkshopChecks.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Check if all individual checkboxes are checked
            const allChecked = Array.from(individualWorkshopChecks).every(cb => cb.checked);
            
            // Update the "All Workshops" checkbox accordingly
            if (allChecked) {
                allWorkshopsCheck.checked = true;
                individualWorkshopChecks.forEach(cb => cb.disabled = true);
            } else {
                allWorkshopsCheck.checked = false;
                individualWorkshopChecks.forEach(cb => cb.disabled = false);
            }
        });
    });
}

/**
 * Sets up the registration form submission handler
 */
function setupRegistrationForm() {
    const registrationForm = document.getElementById('registration-form');
    
    if (!registrationForm) return;
    
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const institution = document.getElementById('institution').value;
        
        // Get selected workshops
        const selectedWorkshops = [];
        const workshopCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="workshop"]:checked');
        
        workshopCheckboxes.forEach(checkbox => {
            selectedWorkshops.push(checkbox.value);
        });
        
        // Create registration data object
        const registrationData = {
            name,
            email,
            institution,
            workshops: selectedWorkshops
        };
        
        // In a real application, you would send this data to your server
        console.log('Registration data:', registrationData);
        
        // Show success message
        showRegistrationSuccess();
    });
}

/**
 * Shows a success message after registration submission
 */
function showRegistrationSuccess() {
    const modalBody = document.querySelector('#registerModal .modal-body');
    
    // Store the original form HTML to restore later
    const originalForm = modalBody.innerHTML;
    
    // Replace with success message
    modalBody.innerHTML = `
        <div class="text-center py-4">
            <div class="mb-4">
                <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
            </div>
            <h4>Registration Successful!</h4>
            <p>Thank you for registering for our workshops. We have sent a confirmation email with further details.</p>
        </div>
    `;
    
    // Set timeout to close modal and restore form
    setTimeout(() => {
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        registerModal.hide();
        
        // Restore original form after modal is closed
        setTimeout(() => {
            modalBody.innerHTML = originalForm;
            setupWorkshopCheckboxes(); // Re-attach event handlers
        }, 500);
    }, 3000);
}

/**
 * Initializes Bootstrap tooltips
 */
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Sets up the AI demo interface if on the demo page
 */
function setupAIDemo() {
    const analyzeEmailBtn = document.getElementById('analyze-email-btn');
    const analyzeUrlBtn = document.getElementById('analyze-url-btn');
    
    if (analyzeEmailBtn) {
        analyzeEmailBtn.addEventListener('click', function() {
            performAIAnalysis('email');
        });
    }
    
    if (analyzeUrlBtn) {
        analyzeUrlBtn.addEventListener('click', function() {
            performAIAnalysis('url');
        });
    }
}

/**
 * Simulates an AI analysis of email or URL
 * @param {string} type - Type of analysis ('email' or 'url')
 */
function performAIAnalysis(type) {
    // Get the input value
    const inputId = type === 'email' ? 'email-input' : 'url-input';
    const input = document.getElementById(inputId);
    
    if (!input || !input.value.trim()) {
        alert(`Please enter a ${type} to analyze.`);
        return;
    }
    
    // Get the results container
    const resultsContainer = document.querySelector('.analysis-results');
    
    if (!resultsContainer) return;
    
    // Show loading state
    resultsContainer.innerHTML = `
        <div class="text-center p-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Analyzing ${type}...</p>
        </div>
    `;
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Sample data - in a real application, this would come from your AI backend
        const analysisData = generateSampleAnalysis(type, input.value.trim());
        
        // Update results container with analysis results
        displayAnalysisResults(resultsContainer, analysisData);
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }, 2000); // Simulate 2-second processing time
}

/**
 * Generates a sample analysis result based on input
 * @param {string} type - Type of analysis ('email' or 'url')
 * @param {string} input - The input text or URL
 * @returns {object} Sample analysis data
 */
function generateSampleAnalysis(type, input) {
    // This is a simplified demonstration that generates fake results
    // In a real application, this would be replaced with actual AI analysis
    
    // Calculate a "risk score" based on input length and content
    let riskScore = Math.floor(Math.random() * 40) + 60; // Random score between 60-99
    
    // Adjust score based on suspicious keywords if it's an email
    if (type === 'email') {
        const suspiciousWords = ['urgent', 'verify', 'immediately', 'account suspended', 'click', 'password'];
        suspiciousWords.forEach(word => {
            if (input.toLowerCase().includes(word.toLowerCase())) {
                riskScore += 5;
            }
        });
    }
    
    // Adjust score based on URL characteristics
    if (type === 'url') {
        // Check for suspicious domains or patterns
        if (input.includes('bit.ly') || input.includes('tinyurl.com')) {
            riskScore += 10;
        }
        
        // Check for misspelled domains
        const suspiciousDomains = ['amazon', 'paypal', 'microsoft', 'apple'];
        suspiciousDomains.forEach(domain => {
            if (input.includes(domain) && !input.includes(`${domain}.com`)) {
                riskScore += 15;
            }
        });
    }
    
    // Cap the risk score at 99
    riskScore = Math.min(riskScore, 99);
    
    // Determine risk level
    let riskLevel;
    if (riskScore < 70) {
        riskLevel = 'low';
    } else if (riskScore < 85) {
        riskLevel = 'medium';
    } else {
        riskLevel = 'high';
    }
    
    // Generate indicators based on risk level
    const indicators = [];
    
    if (type === 'email') {
        if (riskLevel === 'high' || riskLevel === 'medium') {
            indicators.push('Urgency language detected');
            indicators.push('Request for sensitive information');
        }
        
        if (riskLevel === 'high') {
            indicators.push('Suspicious sender domain');
            indicators.push('Threatening consequences mentioned');
        }
    }
    
    if (type === 'url') {
        if (riskLevel === 'high' || riskLevel === 'medium') {
            indicators.push('URL redirection detected');
            indicators.push('Domain age less than 30 days');
        }
        
        if (riskLevel === 'high') {
            indicators.push('Domain impersonating trusted brand');
            indicators.push('Suspicious URL parameters');
        }
    }
    
    // Always include AI confidence level
    indicators.push(`AI confidence: 94% (based on model accuracy)`);
    
    // Return the analysis object
    return {
        type,
        input,
        riskScore,
        riskLevel,
        indicators,
        recommendation: riskLevel === 'high' ? 'Delete immediately and report as phishing' : 
                        riskLevel === 'medium' ? 'Exercise caution and verify sender' : 
                        'Likely legitimate, but always stay vigilant'
    };
}

/**
 * Displays the analysis results in the results container
 * @param {HTMLElement} container - The container to display results in
 * @param {object} data - The analysis data
 */
function displayAnalysisResults(container, data) {
    let indicatorsHTML = '';
    data.indicators.forEach(indicator => {
        indicatorsHTML += `<li>${indicator}</li>`;
    });
    
    container.innerHTML = `
        <div class="analysis-card">
            <div class="analysis-header ${data.riskLevel}-risk">
                <h3>Analysis Results</h3>
                <span class="accuracy-badge">94% Accuracy</span>
            </div>
            <div class="analysis-content">
                <div class="input-summary">
                    <h4>${data.type === 'email' ? 'Email' : 'URL'} Analyzed:</h4>
                    <div class="input-preview">${data.input}</div>
                </div>
                
                <div class="risk-assessment">
                    <h4>Risk Assessment:</h4>
                    <div class="risk-meter-container">
                        <div class="risk-meter">
                            <div class="risk-fill ${data.riskLevel}-risk" style="width: ${data.riskScore}%"></div>
                        </div>
                        <div class="risk-labels">
                            <span>Low</span>
                            <span>Medium</span>
                            <span>High</span>
                        </div>
                    </div>
                    <div class="risk-score">
                        Risk Score: <strong>${data.riskScore}/100</strong> (${data.riskLevel.charAt(0).toUpperCase() + data.riskLevel.slice(1)} Risk)
                    </div>
                </div>
                
                <div class="detected-indicators">
                    <h4>Detected Indicators:</h4>
                    <ul>${indicatorsHTML}</ul>
                </div>
                
                <div class="recommendation">
                    <h4>Recommended Action:</h4>
                    <p class="${data.riskLevel}-risk-text">${data.recommendation}</p>
                </div>
            </div>
        </div>
    `;
}

// Add additional CSS for AI demo page elements
const style = document.createElement('style');
style.textContent = `
    .analysis-card {
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        margin: 2rem 0;
    }
    
    .analysis-header {
        padding: 1rem 1.5rem;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .low-risk {
        background-color: #10b981;
    }
    
    .medium-risk {
        background-color: #f59e0b;
    }
    
    .high-risk {
        background-color: #ef4444;
    }
    
    .low-risk-text {
        color: #10b981;
        font-weight: 600;
    }
    
    .medium-risk-text {
        color: #f59e0b;
        font-weight: 600;
    }
    
    .high-risk-text {
        color: #ef4444;
        font-weight: 600;
    }
    
    .analysis-content {
        padding: 1.5rem;
        background-color: white;
    }
    
    .input-preview {
        background-color: #f8fafc;
        padding: 1rem;
        border-radius: 5px;
        margin-bottom: 1.5rem;
        border: 1px solid #e5e7eb;
        word-break: break-all;
    }
    
    .risk-meter-container {
        margin: 1rem 0;
    }
    
    .risk-meter {
        height: 20px;
        background-color: #e5e7eb;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    
    .risk-fill {
        height: 100%;
        border-radius: 10px;
    }
    
    .risk-labels {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .risk-score {
        margin-bottom: 1.5rem;
    }
    
    .detected-indicators ul {
        margin-bottom: 1.5rem;
    }
    
    .detected-indicators li {
        margin-bottom: 0.5rem;
    }
`;

document.head.appendChild(style);