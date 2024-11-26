(function() {
    // Generate unique widget ID
    const widgetId = 'gradient-text-' + Math.random().toString(36).substr(2, 9);
    
    function initGradientGenerator(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;
        
        // Create widget HTML
        const widget = document.createElement('div');
        widget.id = widgetId;
        widget.innerHTML = `
            <div class="gtg-main-content">
                <h2 class="gtg-tool-title">Gradient Text Generator</h2>
                <!-- Rest of your HTML structure -->
            </div>
        `;
        
        target.appendChild(widget);
        initializeEventListeners();
        initializeColorPickers();
        updatePreview();
    }

    // Rest of your functions...

    // Make initialization function globally available
    window.initGradientGenerator = initGradientGenerator;
})();
