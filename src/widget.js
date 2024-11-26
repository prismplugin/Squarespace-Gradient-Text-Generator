(function() {
    // Widget initialization function
    function initWidget(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;
        

        
        // Create widget HTML
        const widget = document.createElement('div');
        widget.id = widgetId;
        widget.innerHTML = `
            <div class="gtg-main-content">
                <h2 class="gtg-tool-title">Gradient Text Generator</h2>
                
                <!-- Text Input Section -->
                <div class="gtg-compact-group">
                    <div class="gtg-input-group" style="flex: 1;">
                        <label class="gtg-input-label">Text Content</label>
                        <input type="text" id="gtg-text" class="gtg-input-field" value="Your Gradient Text" placeholder="Enter your text">
                    </div>
                    
                    <div class="gtg-input-group" style="width: 200px;">
                        <label class="gtg-input-label">Block/Section ID</label>
                        <input type="text" id="gtg-block-id" class="gtg-input-field" placeholder="Optional">
                    </div>
                </div>

                <!-- Controls Grid -->
                <div class="gtg-grid">
                    <!-- Text Element Selector -->
                    <div class="gtg-input-group">
                        <label class="gtg-input-label">Text Element</label>
                        <select id="gtg-text-element" class="gtg-input-field">
                            <option value="h1">H1</option>
                            <option value="h2">H2</option>
                            <option value="h3">H3</option>
                            <option value="h4">H4</option>
                            <option value="p">Paragraph</option>
                        </select>
                    </div>

                    <!-- Alignment -->
                    <div class="gtg-input-group">
                        <label class="gtg-input-label">Alignment</label>
                        <select id="gtg-text-align" class="gtg-input-field">
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>

                    <!-- Font Size -->
                    <div class="gtg-input-group">
                        <label class="gtg-input-label">Font Size</label>
                        <div style="display: flex; gap: 4px;">
                            <input type="number" id="gtg-font-size" class="gtg-input-field" value="3" step="0.1">
                            <select id="gtg-font-unit" class="gtg-input-field">
                                <option value="rem">rem</option>
                                <option value="px">px</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Gradient Controls -->
                <div class="gtg-gradient-controls">
                    <!-- Gradient Type -->
                    <div class="gtg-input-group">
                        <label class="gtg-input-label">Gradient Type</label>
                        <div class="gtg-radio-group">
                            <label>
                                <input type="radio" name="gradientType" value="linear" checked> Linear
                            </label>
                            <label>
                                <input type="radio" name="gradientType" value="radial"> Radial
                            </label>
                        </div>
                    </div>

                    <!-- Angle Control -->
                    <div id="gtg-angle-control" class="gtg-input-group">
                        <label class="gtg-input-label">Gradient Angle</label>
                        <div class="angle-inputs">
                            <input type="range" id="gtg-angle-slider" class="gtg-input-field" min="0" max="360" value="90">
                            <input type="number" id="gtg-angle-input" class="gtg-input-field" value="90" min="0" max="360">
                            <span>°</span>
                        </div>
                    </div>
                </div>

                <!-- Color Controls -->
                <div class="gtg-color-inputs">
                    <div class="gtg-input-group">
                        <label class="gtg-input-label">Gradient Colors</label>
                        <div class="gtg-color-input-group">
                            <div class="gtg-color-preview" id="color1-preview"></div>
                            <input type="color" id="color1" value="#FF5F6D">
                            <input type="text" id="color1-text" class="gtg-input-field" value="#FF5F6D">
                        </div>
                        <div class="gtg-color-input-group">
                            <div class="gtg-color-preview" id="color2-preview"></div>
                            <input type="color" id="color2" value="#FFC371">
                            <input type="text" id="color2-text" class="gtg-input-field" value="#FFC371">
                        </div>
                    </div>
                </div>

                <!-- Preview Area -->
                <div class="gtg-preview" id="gtg-preview"></div>

                <!-- Output -->
                <div class="gtg-tabs">
                    <div class="gtg-tab-buttons">
                        <button class="gtg-tab-button active" onclick="switchTab('css')">CSS Code</button>
                        <button class="gtg-tab-button" onclick="switchTab('html')">HTML Code</button>
                    </div>
                    <textarea id="gtg-output" class="gtg-output" readonly></textarea>
                </div>

                <!-- Action Buttons -->
                <div class="gtg-button-row">
                    <button onclick="copyToClipboard()" class="gtg-action-button gtg-copy-button">Copy Code</button>
                </div>
            </div>
        `;

        // Initialize all 5 color pickers
        for (let i = 1; i <= 5; i++) {
            initColorPicker(`color${i}`);
        }
        updatePreview();
    }
        
        target.appendChild(widget);
        initializeEventListeners();
        initializeColorPickers();
        updatePreview();
    }

    // Initialize event listeners
    function initializeEventListeners() {
        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', updatePreview);
        });

        // Angle control synchronization
        const angleSlider = document.getElementById('gtg-angle-slider');
        const angleInput = document.getElementById('gtg-angle-input');
        
        angleSlider.addEventListener('input', (e) => {
            angleInput.value = e.target.value;
            updatePreview();
        });

        angleInput.addEventListener('input', (e) => {
            const value = Math.min(360, Math.max(0, e.target.value));
            angleSlider.value = value;
            updatePreview();
        });
    }

    // Color picker initialization
    function initializeColorPickers() {
        ['color1', 'color2'].forEach(colorId => {
            const picker = document.getElementById(colorId);
            const text = document.getElementById(`${colorId}-text`);
            const preview = document.getElementById(`${colorId}-preview`);

            picker.addEventListener('input', (e) => {
                text.value = e.target.value.toUpperCase();
                preview.style.backgroundColor = e.target.value;
                updatePreview();
            });

            text.addEventListener('input', (e) => {
                const color = e.target.value;
                if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                    picker.value = color;
                    preview.style.backgroundColor = color;
                    updatePreview();
                }
            });
        });
    }

    // Update preview
    function updatePreview() {
        const text = document.getElementById('gtg-text').value;
        const element = document.getElementById('gtg-text-element').value;
        const align = document.getElementById('gtg-text-align').value;
        const fontSize = document.getElementById('gtg-font-size').value;
        const fontUnit = document.getElementById('gtg-font-unit').value;
        const gradientType = document.querySelector('input[name="gradientType"]:checked').value;
        const angle = document.getElementById('gtg-angle-slider').value;
        const color1 = document.getElementById('color1').value;
        const color2 = document.getElementById('color2').value;

        const gradient = gradientType === 'linear'
            ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
            : `radial-gradient(circle at center, ${color1}, ${color2})`;

        const preview = document.getElementById('gtg-preview');
        preview.innerHTML = `<${element} style="
            background: ${gradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: ${fontSize}${fontUnit};
            text-align: ${align};
            margin: 0;
            padding: 0;
            width: 100%;
        ">${text}</${element}>`;

        generateCode();
    }

    // Generate code
    function generateCode() {
        const text = document.getElementById('gtg-text').value;
        const blockId = document.getElementById('gtg-block-id').value.trim();
        const element = document.getElementById('gtg-text-element').value;
        const align = document.getElementById('gtg-text-align').value;
        const fontSize = document.getElementById('gtg-font-size').value;
        const fontUnit = document.getElementById('gtg-font-unit').value;
        const gradientType = document.querySelector('input[name="gradientType"]:checked').value;
        const angle = document.getElementById('gtg-angle-slider').value;
        const color1 = document.getElementById('color1').value;
        const color2 = document.getElementById('color2').value;

        const className = `gradient-text-${text.toLowerCase().replace(/\s+/g, '-')}`;
        const gradient = gradientType === 'linear'
            ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
            : `radial-gradient(circle at center, ${color1}, ${color2})`;

        const selector = blockId 
            ? `${blockId} .${className}`  
            : `.${className}`;

        const css = `<style>
${selector} {
    background: ${gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: ${fontSize}${fontUnit};
    text-align: ${align};
    display: inline-block;
    width: 100%;
    margin: 0;
    padding: 0;
}</style>`;

        const html = `<${element} class="${className}">${text}</${element}>`;

        document.getElementById('gtg-output').value = 
            document.querySelector('.gtg-tab-button.active').innerText.includes('CSS') ? css : html;
    }

    // Switch tabs
    function switchTab(tab) {
        document.querySelectorAll('.gtg-tab-button').forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
        generateCode();
    }

    // Copy to clipboard
    function copyToClipboard() {
        const output = document.getElementById('gtg-output');
        output.select();
        document.execCommand('copy');
        alert('Code copied to clipboard!');
    }

    // Make initialization function globally available
    window.initGradientGenerator = initGradientGenerator;
})();
