const stage = document.getElementById('clock-stage');
const scene = document.getElementById('scene');
const settingsOverlay = document.getElementById('settings-overlay');
const closeSettingsBtn = document.getElementById('close-settings');

// Settings Inputs
const orientXInput = document.getElementById('orient-x');
const orientYInput = document.getElementById('orient-y');
const fontSizeInput = document.getElementById('font-size');
const fontFamilyInput = document.getElementById('font-family');

const LAYER_SPACING = 80;
const MAX_LAYERS = 12;

let layers = [];
let clickCount = 0;
let clickTimer = null;

function updateClock() {
    const now = new Date();
    
    // Get digits as strings
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    // Create new layer
    const newLayer = document.createElement('div');
    newLayer.classList.add('time-layer');
    newLayer.classList.add('front');

    // Generate HTML with individual spans for each character for layout stability
    // Structure: H1 H2 : M1 M2 : S1 S2
    newLayer.innerHTML = `
        <span class="digit">${h[0]}</span>
        <span class="digit">${h[1]}</span>
        <span class="sep">:</span>
        <span class="digit">${m[0]}</span>
        <span class="digit">${m[1]}</span>
        <span class="sep">:</span>
        <span class="digit">${s[0]}</span>
        <span class="digit">${s[1]}</span>
    `;

    // Add to stage
    layers.unshift(newLayer);
    stage.appendChild(newLayer);

    // Prune old layers
    if (layers.length > MAX_LAYERS) {
        const removed = layers.pop();
        if (removed && removed.parentNode) {
            removed.parentNode.removeChild(removed);
        }
    }

    // Update positions and visuals
    layers.forEach((layer, index) => {
        const zPos = index * -LAYER_SPACING;

        // Visual State Update
        if (index > 0) {
            // Remove front styling
            layer.classList.remove('front');

            // Apply Depth Gradient Logic
            const brightness = Math.max(0.2, 1 - (index * 0.08));
            const g = Math.floor(255 * brightness);
            
            // Set gradient color for back layers
            layer.style.color = `rgb(0, ${g}, 0)`;
            layer.style.textShadow = `0 0 10px rgba(0, ${g}, 0, 0.5)`;
        }

        // Apply 3D Transform
        // We use a slight opacity fade for very deep layers
        let opacity = 1;
        if (index > 4) {
            opacity = 1 - ((index - 4) / (MAX_LAYERS - 4));
        }
        if (opacity < 0) opacity = 0;

        layer.style.transform = `translate(-50%, -50%) translateZ(${zPos}px)`;
        layer.style.opacity = opacity;
    });
}

// Tick loop
setInterval(updateClock, 1000);
updateClock(); // Initial call

// ---------------------------------------------------------
// Interaction Logic
// ---------------------------------------------------------

document.addEventListener('click', (e) => {
    // Avoid triggering logic when interacting with settings panel
    if (!settingsOverlay.classList.contains('hidden') && e.target.closest('.settings-panel')) {
        return;
    }

    clickCount++;
    if (clickTimer) clearTimeout(clickTimer);

    clickTimer = setTimeout(() => {
        if (clickCount === 2) {
            toggleFullscreen();
        } else if (clickCount === 3) {
            toggleSettings();
        }
        clickCount = 0;
    }, 400);
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => {
            console.log("Fullscreen blocked:", e);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function toggleSettings() {
    settingsOverlay.classList.toggle('hidden');
}

closeSettingsBtn.addEventListener('click', () => {
    settingsOverlay.classList.add('hidden');
});

// ---------------------------------------------------------
// Settings Handlers
// ---------------------------------------------------------

function updateOrientation() {
    const x = orientXInput.value;
    const y = orientYInput.value;
    scene.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
}

function updateFontSize() {
    const size = fontSizeInput.value;
    document.documentElement.style.setProperty('--font-size', `${size}px`);
}

function updateFontFamily() {
    const font = fontFamilyInput.value;
    document.documentElement.style.setProperty('--font-family', font);
}

orientXInput.addEventListener('input', updateOrientation);
orientYInput.addEventListener('input', updateOrientation);
fontSizeInput.addEventListener('input', updateFontSize);
fontFamilyInput.addEventListener('change', updateFontFamily);
