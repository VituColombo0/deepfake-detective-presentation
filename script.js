const cases = [
    {
        icon: '👁️', title: 'Olhos e Olhar',
        real: 'images/real_case_01.png', fake: 'images/fake_case_01.png',
        hotspots: [
            { top: 40, left: 40, label: 'Íris azul artificial' },
            { top: 40, left: 60, label: 'Íris castanha original' }
        ]
    },
    {
        icon: '🦷', title: 'Dentes Perfeitos Demais',
        real: 'images/real_case_02.png', fake: 'images/fake_case_02.png',
        hotspots: [
            { top: 65, left: 50, label: 'Dentes idênticos, nivelados e brilhantes' }
        ]
    },
    {
        icon: '🧵', title: 'Texturas Artificiais',
        real: 'images/real_case_03.png', fake: 'images/fake_case_03.png',
        hotspots: [
            { top: 75, left: 50, label: 'Textura da jaqueta derretida e impossível' }
        ]
    },
    {
        icon: '🧱', title: 'Fundo "Derretido"',
        real: 'images/real_case_04.png', fake: 'images/fake_case_04.png',
        hotspots: [
            { top: 45, left: 15, label: 'Fundo de tijolos distorcido' },
            { top: 30, left: 80, label: 'Madeira ondulada no topo' }
        ]
    },
    {
        icon: '🔤', title: 'Texto na Imagem',
        real: 'images/real_case_05.png', fake: 'images/fake_case_05.png',
        hotspots: [
            { top: 62, left: 50, label: 'Texto alien/sem sentido no lugar de NEW YORK' }
        ]
    },
    {
        icon: '🪞', title: 'Reflexos e Espelhos',
        real: 'images/real_case_06.png', fake: 'images/fake_case_06.png',
        hotspots: [
            { top: 40, left: 35, label: 'Reflexo desconexo e forma da lente alterada' },
            { top: 40, left: 65, label: 'Espelho distorcido e assimétrico' }
        ]
    },
    {
        icon: '💡', title: 'Iluminação Inconsistente',
        real: 'images/real_case_07.png', fake: 'images/fake_case_07.png',
        hotspots: [
            { top: 45, left: 85, label: 'Luz forte e sombra impossível no lado previamente escuro' }
        ]
    },
    {
        icon: '✋', title: 'Mãos e Periferias',
        real: 'images/real_case_08.png', fake: 'images/fake_case_08.png',
        hotspots: [
            { top: 70, left: 50, label: 'Dedos derretidos e borrados (Artefato de IA)' },
            { top: 60, left: 65, label: 'Brinco distorcido' }
        ]
    },
    {
        icon: '🧴', title: 'Pele "Plástica"',
        real: 'images/real_case_09.png', fake: 'images/fake_case_09.png',
        hotspots: [
            { top: 50, left: 50, label: 'Pele excessivamente lisa, sem poros ou marcas' }
        ]
    },
    {
        icon: '🔄', title: 'Repetição de Padrões',
        real: 'images/real_case_10.png', fake: 'images/fake_case_10.png',
        hotspots: [
            { top: 40, left: 30, label: 'Texturas clonadas de forma repetitiva' }
        ]
    },
];

// ── State ──
let idx = 0;
let revealed = false;

// ── DOM ──
const sidebar   = document.getElementById('sidebar');
const imgReal   = document.getElementById('img-real');
const imgFake   = document.getElementById('img-fake');
const zoomReal  = document.getElementById('zoom-real');
const zoomFake  = document.getElementById('zoom-fake');
const elCounter = document.getElementById('counter');
const btnReveal = document.getElementById('reveal');
const btnPrev   = document.getElementById('prev');
const btnNext   = document.getElementById('next');

// ── Init ──
function init() {
    buildNav();
    load(0);

    btnReveal.onclick = toggle;
    btnPrev.onclick   = () => go(-1);
    btnNext.onclick   = () => go(1);

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  go(-1);
        if (e.key === 'ArrowRight') go(1);
        if (e.key === ' ' || e.key === 'r') { e.preventDefault(); toggle(); }
    });
}

function buildNav() {
    sidebar.innerHTML = cases.map((c, i) => `
        <div class="nav-item ${i === idx ? 'active' : ''}" data-i="${i}">
            <span class="nav-icon">${c.icon}</span>
            <span class="nav-label">${c.title}</span>
            <span class="nav-num">${String(i+1).padStart(2,'0')}</span>
        </div>
    `).join('');
    sidebar.querySelectorAll('.nav-item').forEach(el =>
        el.addEventListener('click', () => load(+el.dataset.i))
    );
}

function load(i) {
    idx = i;
    revealed = false;
    const c = cases[i];

    imgReal.style.opacity = '0';
    imgFake.style.opacity = '0';
    setTimeout(() => {
        imgReal.src = c.real;
        imgFake.src = c.fake;
        imgReal.onload = () => imgReal.style.opacity = '1';
        imgFake.onload = () => imgFake.style.opacity = '1';
    }, 100);

    elCounter.textContent = `${String(i+1).padStart(2,'0')} / ${cases.length}`;

    btnReveal.textContent = 'Revelar';
    btnReveal.classList.remove('active');
    
    // reset zoom
    zoomReal.style.transform = 'scale(1)';
    zoomFake.style.transform = 'scale(1)';
    
    clearSpots();

    sidebar.querySelectorAll('.nav-item').forEach((el, j) =>
        el.classList.toggle('active', j === i)
    );
    sidebar.querySelector('.nav-item.active')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function go(dir) {
    const next = idx + dir;
    if (next >= 0 && next < cases.length) load(next);
}

function toggle() {
    revealed = !revealed;
    if (revealed) {
        btnReveal.textContent = 'Esconder';
        btnReveal.classList.add('active');
        showSpots();
    } else {
        btnReveal.textContent = 'Revelar';
        btnReveal.classList.remove('active');
        clearSpots();
        // Zoom out
        zoomReal.style.transform = 'scale(1)';
        zoomFake.style.transform = 'scale(1)';
    }
}

function showSpots() {
    clearSpots();
    
    const spots = cases[idx].hotspots;
    if (spots && spots.length > 0) {
        let cx = 0, cy = 0;
        spots.forEach(h => { cx += h.left; cy += h.top; });
        cx /= spots.length;
        cy /= spots.length;
        
        // Apply zoom to both images centered at the problem
        zoomReal.style.transformOrigin = `${cx}% ${cy}%`;
        zoomFake.style.transformOrigin = `${cx}% ${cy}%`;
        zoomReal.style.transform = 'scale(2.5)';
        zoomFake.style.transform = 'scale(2.5)';
    }

    spots.forEach(h => {
        const el = document.createElement('div');
        el.className = 'hotspot visible';
        el.style.top  = h.top + '%';
        el.style.left = h.left + '%';
        
        el.innerHTML = `<div class="hotspot-dot" style="transform: scale(0.4);"></div><div class="hotspot-tip" style="transform: translateX(-50%) scale(0.4); top: 15px; font-size: 1.6rem; white-space: nowrap;">${h.label}</div>`;
        zoomFake.appendChild(el);
    });
}

function clearSpots() {
    zoomFake.querySelectorAll('.hotspot').forEach(el => el.remove());
}

init();
