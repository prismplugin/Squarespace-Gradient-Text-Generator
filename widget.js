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

      <div class="gtg-compact-group">
        <div class="gtg-input-group" style="flex: 1;">
          <label class="gtg-input-label">Text Content</label>
          <input type="text" id="gtg-text" class="gtg-input-field" value="Your Gradient Text" placeholder="Enter your text">
        </div>
        
        <div class="gtg-input-group" style="width: 200px;">
          <label class="gtg-input-label" title="Optional: Target specific section or block">Block/Section ID</label>
          <input type="text" id="gtg-block-id" class="gtg-input-field" placeholder="Optional">
        </div>
      </div>
      
      <div class="gtg-grid">
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
      
        <div class="gtg-input-group">
          <label class="gtg-input-label">Alignment</label>
          <select id="gtg-text-align" class="gtg-input-field">
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      
        <div class="gtg-input-group">
          <label class="gtg-input-label">Font Size</label>
          <div style="display: flex; gap: 4px; align-items: center;">
            <input type="number" id="gtg-font-size" class="gtg-input-field" value="3" step="0.1">
            <select id="gtg-font-unit" class="gtg-input-field" style="width: auto;">
              <option value="rem">rem</option>
              <option value="px">px</option>
            </select>
          </div>
        </div>
      
        <div class="gtg-input-group">
          <label class="gtg-input-label">Weight</label>
          <select id="gtg-font-weight" class="gtg-input-field">
            <option value="400">Regular</option>
            <option value="500">Medium</option>
            <option value="600">Semi-Bold</option>
            <option value="700">Bold</option>
          </select>
        </div>
      
        <div class="gtg-input-group">
          <label class="gtg-input-label">Style</label>
          <div style="display: flex; gap: 4px">
            <label class="gtg-checkbox-label" style="flex: 1">
              <input type="checkbox" id="gtg-italic" class="gtg-input-field" style="width: auto;">
              I
            </label>
            <label class="gtg-checkbox-label" style="flex: 1">
              <input type="checkbox" id="gtg-uppercase" class="gtg-input-field" style="width: auto;">
              A
            </label>
          </div>
        </div>
      </div>
  
      <div class="gtg-gradient-controls">
        <div class="gtg-input-group gradient-type">
          <label class="gtg-input-label">Gradient Type</label>
          <div class="gtg-radio-group">
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="radio" name="gradientType" value="linear" checked>
              Linear
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="radio" name="gradientType" value="radial">
              Radial
            </label>
          </div>
        </div>
      
        <div id="gtg-angle-control" class="gtg-input-group gradient-angle">
          <label class="gtg-input-label">Gradient Angle</label>
          <div class="angle-inputs">
            <input type="range" id="gtg-angle-slider" class="gtg-input-field" min="0" max="360" value="90">
            <div class="angle-number-group">
              <input type="number" id="gtg-angle-input" class="gtg-input-field" value="90" min="0" max="360">
              <span>°</span>
            </div>
          </div>
        </div>
      </div>
  
      <div class="gtg-color-inputs">
        <!-- Required Colors -->
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
      
<!-- Optional Colors -->
<div class="gtg-input-group">
    <label class="gtg-input-label">Optional Colors (for more complex gradients)</label>
    <div class="gtg-color-input-group">
      <div class="gtg-color-preview" id="color3-preview"></div>
      <input type="color" id="color3" value="">
      <input type="text" id="color3-text" class="gtg-input-field" placeholder="Optional Color #3">
    </div>
    <div class="gtg-color-input-group">
      <div class="gtg-color-preview" id="color4-preview"></div>
      <input type="color" id="color4" value="">
      <input type="text" id="color4-text" class="gtg-input-field" placeholder="Optional Color #4">
    </div>
    <div class="gtg-color-input-group">
      <div class="gtg-color-preview" id="color5-preview"></div>
      <input type="color" id="color5" value="">
      <input type="text" id="color5-text" class="gtg-input-field" placeholder="Optional Color #5">
    </div>
  </div>
  
      <div class="gtg-preview" id="gtg-preview"></div>
  
      <div class="gtg-tabs">
        <div class="gtg-tab-buttons">
          <button class="gtg-tab-button active" onclick="switchTab('css')">CSS Code</button>
          <button class="gtg-tab-button" onclick="switchTab('html')">HTML Code</button>
        </div>
        <textarea id="gtg-output" class="gtg-output" readonly></textarea>
      </div>
  
      <div class="gtg-button-row">
        <button onclick="copyToClipboard()" class="gtg-action-button gtg-copy-button">Copy Code</button>
      </div>
    </div>
  ;
  
// Add this validation function
function validateAndFormatColor(value) {
  // Remove spaces and any non-alphanumeric characters except #
  let color = value.trim().replace(/[^0-9A-Fa-f#]/g, '');
  
  // If there's no #, add it at the beginning
  if (!color.startsWith('#')) {
    color = '#' + color;
  }
  
  // Remove any extra # symbols after the first one
  color = '#' + color.slice(1).replace(/#/g, '');
  
  // Check if it's a valid 6-digit hex color
  const isValid = /^#[0-9A-Fa-f]{6}$/.test(color);
  
  return { isValid, formattedColor: color };
}

// Update the initColorPicker function to handle empty defaults
function initColorPicker(colorId) {
  const picker = document.getElementById(colorId);
  const text = document.getElementById(`${colorId}-text`);
  const preview = document.getElementById(`${colorId}-preview`);
  
  // Clear defaults for optional colors (3, 4, and 5)
  if (colorId.match(/color[3-5]/)) {
    text.value = '';
    preview.style.backgroundColor = 'transparent';
    // Can't set color input to empty, but we can avoid using its value
  }

  // Initialize with validation only for required colors (1 and 2)
  if (colorId.match(/color[1-2]/)) {
    const initialValidation = validateAndFormatColor(picker.value);
    if (initialValidation.isValid) {
      text.value = initialValidation.formattedColor;
      preview.style.backgroundColor = initialValidation.formattedColor;
    }
  }

  // Rest of the event listeners remain the same
  picker.addEventListener('input', (e) => {
    const { isValid, formattedColor } = validateAndFormatColor(e.target.value);
    if (isValid) {
      text.value = formattedColor;
      preview.style.backgroundColor = formattedColor;
      text.style.borderColor = '#444';
      updatePreview();
    }
  });

  text.addEventListener('input', (e) => {
    const { isValid, formattedColor } = validateAndFormatColor(e.target.value);
    if (isValid || e.target.value.length === 0) {  // Allow empty input
      if (isValid) {
        picker.value = formattedColor;
        preview.style.backgroundColor = formattedColor;
        text.value = formattedColor;
        text.style.borderColor = '#444';
      } else {
        // If empty, clear the preview
        preview.style.backgroundColor = 'transparent';
      }
      updatePreview();
    } else {
      text.style.borderColor = '#ff4d4d';
      const testWithHash = validateAndFormatColor('#' + e.target.value);
      if (testWithHash.isValid) {
        preview.style.backgroundColor = testWithHash.formattedColor;
        updatePreview();
      }
    }
  });

  text.addEventListener('blur', (e) => {
    if (e.target.value.length > 0) {
      const { isValid, formattedColor } = validateAndFormatColor(e.target.value);
      if (isValid) {
        text.value = formattedColor;
        picker.value = formattedColor;
        preview.style.backgroundColor = formattedColor;
        text.style.borderColor = '#444';
        updatePreview();
      }
    } else {
      // If empty after blur, ensure preview is cleared
      preview.style.backgroundColor = 'transparent';
      updatePreview();
    }
  });
}

// Update getActiveColors function to use validation
function getActiveColors() {
  const colors = [];
  for (let i = 1; i <= 5; i++) {
    const colorInput = document.getElementById(`color${i}-text`);
    if (colorInput && colorInput.value.trim() !== '') {  // Only check if input has a value
      const { isValid, formattedColor } = validateAndFormatColor(colorInput.value);
      if (isValid) {
        colors.push(formattedColor);
      }
    }
  }
  return colors.length > 0 ? colors : ['#FF5F6D', '#FFC371']; // Default colors if none are valid
}

function updatePreview() {
  const text = document.getElementById('gtg-text').value;
  const textElement = document.getElementById('gtg-text-element').value;
  const textAlign = document.getElementById('gtg-text-align').value;
  const fontSize = document.getElementById('gtg-font-size').value;
  const fontUnit = document.getElementById('gtg-font-unit').value;
  const fontWeight = document.getElementById('gtg-font-weight').value;
  const isItalic = document.getElementById('gtg-italic').checked;
  const isUppercase = document.getElementById('gtg-uppercase').checked;
  const gradientType = document.querySelector('input[name="gradientType"]:checked').value;
  const angle = document.getElementById('gtg-angle-slider').value;
  const colors = getActiveColors();

  const gradient = gradientType === 'linear'
    ? `linear-gradient(${angle}deg, ${colors.join(', ')})`
    : `radial-gradient(circle at center, ${colors.join(', ')})`;

  const displayText = isUppercase ? text.toUpperCase() : text;

  const preview = document.getElementById('gtg-preview');
  preview.innerHTML = `<${textElement} style="
    background: ${gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: ${fontSize}${fontUnit};
    font-weight: ${fontWeight};
    font-style: ${isItalic ? 'italic' : 'normal'};
    text-transform: ${isUppercase ? 'uppercase' : 'none'};
    text-align: ${textAlign};
    margin: 0;
    padding: 0;
    width: 100%;
  ">${displayText}</${textElement}>`;

  generateCode();
}

// Update the generateCode function
function generateCode() {
  const text = document.getElementById('gtg-text').value;
  const blockId = document.getElementById('gtg-block-id').value.trim();
  const textElement = document.getElementById('gtg-text-element').value;
  const textAlign = document.getElementById('gtg-text-align').value;
  const fontSize = document.getElementById('gtg-font-size').value;
  const fontUnit = document.getElementById('gtg-font-unit').value;
  const fontWeight = document.getElementById('gtg-font-weight').value;
  const isItalic = document.getElementById('gtg-italic').checked;
  const isUppercase = document.getElementById('gtg-uppercase').checked;
  const gradientType = document.querySelector('input[name="gradientType"]:checked').value;
  const angle = document.getElementById('gtg-angle-slider').value;
  const colors = getActiveColors();

  const className = `gradient-text-${text.toLowerCase().replace(/\s+/g, '-')}`;
  const gradient = gradientType === 'linear'
    ? `linear-gradient(${angle}deg, ${colors.join(', ')})`
    : `radial-gradient(circle at center, ${colors.join(', ')})`;

  const displayText = isUppercase ? text.toUpperCase() : text;

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
  font-weight: ${fontWeight};
  text-align: ${textAlign};${isItalic ? '\n  font-style: italic;' : ''}${isUppercase ? '\n  text-transform: uppercase;' : ''}
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
}</style>`;

  const html = `<${textElement} class="${className}">${displayText}</${textElement}>`;

  document.getElementById('gtg-output').value = 
    document.querySelector('.gtg-tab-button.active').innerText.includes('CSS') ? css : html;
}

function switchTab(tab) {
  document.querySelectorAll('.gtg-tab-button').forEach(button => {
    button.classList.remove('active');
  });
  event.target.classList.add('active');
  generateCode();
}

function copyToClipboard() {
  const output = document.getElementById('gtg-output');
  output.select();
  document.execCommand('copy');
}

// Event listeners
document.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('input', updatePreview);
});

// Synchronize angle inputs
document.getElementById('gtg-angle-slider').addEventListener('input', (e) => {
  document.getElementById('gtg-angle-input').value = e.target.value;
  updatePreview();
});

document.getElementById('gtg-angle-input').addEventListener('input', (e) => {
  const value = Math.min(360, Math.max(0, e.target.value));
  document.getElementById('gtg-angle-slider').value = value;
  updatePreview();
});

// Initialize
window.onload = () => {
  // Initialize all 5 color pickers
  for (let i = 1; i <= 5; i++) {
    initColorPicker(`color${i}`);
  }
  updatePreview();
};
