// ═══════════════════════════════════════════════════
// Deepfake Detective v4 — Real vs Fake (StyleGAN2)
// Hotspots calibrated to exact artifact positions
// ═══════════════════════════════════════════════════

const cases = [
    // ── 01: Olhos e Olhar ──
    // fake_face_12.jpg: Red-haired woman — LEFT eye is distinctly brown, RIGHT eye has a blue-green tint
    // The iris colors don't match. Also background blurs differently on each side.
    {
        icon: '👁️', title: 'Olhos e Olhar',
        real: 'real_face_5.jpg',
        fake: 'fake_face_12.jpg',
        hotspots: [
            { top: 44, left: 38, label: 'Olho esquerdo: íris marrom-escura' },
            { top: 43, left: 60, label: 'Olho direito: íris com tom esverdeado diferente' },
            { top: 25, left: 82, label: 'Fio de cabelo "fantasma" flutuando no ar' }
        ]
    },
    // ── 02: Dentes perfeitos demais ──
    // fake_face_2.jpg: Smiling man — teeth are overly uniform, too white, no natural gaps
    {
        icon: '🦷', title: 'Dentes Perfeitos Demais',
        real: 'real_face_2.jpg',
        fake: 'fake_face_2.jpg',
        hotspots: [
            { top: 73, left: 46, label: 'Dentes inferiores: todos idênticos — "clonados"' },
            { top: 69, left: 53, label: 'Dentes superiores: sem separação natural visível' },
            { top: 69, left: 38, label: 'Linha gengival artificial — perfeitamente reta' }
        ]
    },
    // ── 03: Texturas (roupa, pele, cabelo) ──
    // fake_face_13.jpg: Man with beanie — jacket layers are incoherent, beanie texture is wrong
    {
        icon: '🧵', title: 'Texturas Artificiais',
        real: 'real_face_9.jpg',
        fake: 'fake_face_13.jpg',
        hotspots: [
            { top: 18, left: 50, label: 'Gorro: textura do tecido sem trama real — borrado' },
            { top: 78, left: 30, label: 'Camadas de roupa impossíveis — colete deformado' },
            { top: 82, left: 60, label: 'Gola/cachecol se "derrete" e funde com a jaqueta' }
        ]
    },
    // ── 04: Fundo "Derretido" ──
    // fake_face_4.jpg: Man with distorted wooden/metal background
    {
        icon: '🧱', title: 'Fundo "Derretido"',
        real: 'real_face_4.jpg',
        fake: 'fake_face_4.jpg',
        hotspots: [
            { top: 20, left: 18, label: 'Estruturas de madeira ondulam — linhas deveriam ser retas' },
            { top: 40, left: 10, label: 'Reflexos em superfícies: brilho sem lógica física' },
            { top: 15, left: 80, label: 'Canto superior: objeto impossível de identificar' }
        ]
    },
    // ── 05: Texto na Imagem ──
    // fake_face_11.jpg: Woman with beanie — pattern on beanie is incoherent, watermark visible
    {
        icon: '🔤', title: 'Texto na Imagem',
        real: 'real_face_11.jpg',
        fake: 'fake_face_11.jpg',
        hotspots: [
            { top: 10, left: 50, label: 'Padrão do gorro — fios de lã sem repetição lógica' },
            { top: 15, left: 30, label: 'Trama do tecido muda de direção sem sentido' },
            { top: 96, left: 80, label: 'Marca d\'água "StyleGAN2 (Karras et al.)" — prova direta' }
        ]
    },
    // ── 06: Reflexos e Espelhos ──
    // fake_face_3.jpg: Man with glasses — lenses are asymmetric, arms have different thicknesses
    {
        icon: '🪞', title: 'Reflexos e Espelhos',
        real: 'real_face_3.jpg',
        fake: 'fake_face_3.jpg',
        hotspots: [
            { top: 45, left: 35, label: 'Lente esquerda: formato retangular diferente da direita' },
            { top: 45, left: 64, label: 'Lente direita: mais arredondada — assimetria' },
            { top: 12, left: 40, label: 'Fundo atrás das lentes: distorção impossível' }
        ]
    },
    // ── 07: Iluminação Inconsistente ──
    // fake_face_1.jpg: Person with ghost face on left edge — lighting doesn't match
    {
        icon: '💡', title: 'Iluminação Inconsistente',
        real: 'real_face_1.jpg',
        fake: 'fake_face_1.jpg',
        hotspots: [
            { top: 38, left: 5, label: 'Rosto "fantasma" com iluminação completamente diferente' },
            { top: 50, left: 5, label: 'Segundo rosto sem sombra cervical — impossível' },
            { top: 35, left: 85, label: 'Orelha iluminada por trás sem fonte de luz visível' }
        ]
    },
    // ── 08: Mãos e Detalhes Periféricos ──
    // fake_face_8.jpg: Woman smiling — earring is blurry/melted, shoulder line deforms
    {
        icon: '✋', title: 'Mãos e Periferias',
        real: 'real_face_8.jpg',
        fake: 'fake_face_8.jpg',
        hotspots: [
            { top: 58, left: 80, label: 'Brinco borrado — formato impossível, "derretido"' },
            { top: 22, left: 15, label: 'Borda do cabelo se funde com o fundo' },
            { top: 96, left: 85, label: 'Marca d\'água StyleGAN visível no canto' }
        ]
    },
    // ── 09: Anatomia Estranha ──
    // fake_face_15.jpg: Woman — scarf/collar distorted, ears different
    {
        icon: '🧍', title: 'Anatomia Estranha',
        real: 'real_face_6.jpg',
        fake: 'fake_face_15.jpg',
        hotspots: [
            { top: 48, left: 85, label: 'Orelha esquerda: formato deformado, parece "colada"' },
            { top: 85, left: 45, label: 'Lenço/cachecol muda de material e se distorce' },
            { top: 60, left: 15, label: 'Fio de cabelo flutua sem conexão com o restante' }
        ]
    },
    // ── 10: "Uncanny Valley" ──
    // fake_face_16.jpg: Young man — too perfect, pore-free skin, overly symmetric
    {
        icon: '🎭', title: '"Real Demais" — Uncanny Valley',
        real: 'real_face_7.jpg',
        fake: 'fake_face_16.jpg',
        hotspots: [
            { top: 50, left: 50, label: 'Pele sem nenhum poro — suavidade artificial total' },
            { top: 42, left: 35, label: 'Simetria excessiva: rosto espelhado pixel a pixel' },
            { top: 87, left: 55, label: 'Gola da camisa com textura borrada — detalhe perdido' }
        ]
    },
    // ── 11: Coerência Geral ──
    // fake_face_10.jpg: Child with ghost child face
    {
        icon: '🧠', title: 'Coerência Geral',
        real: 'real_face_10.jpg',
        fake: 'fake_face_10.jpg',
        hotspots: [
            { top: 38, left: 10, label: 'Criança "fantasma" — rosto parcial impossível' },
            { top: 25, left: 8, label: 'Cabelo do segundo rosto funde com o fundo' },
            { top: 75, left: 65, label: 'Padrão da camiseta muda de estilo sem lógica' }
        ]
    }
];

// ── State ──
let idx = 0;
let revealed = false;

// ── DOM ──
const sidebar   = document.getElementById('sidebar');
const imgReal   = document.getElementById('img-real');
const imgFake   = document.getElementById('img-fake');
const frameFake = document.getElementById('frame-fake');
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
    }
}

function showSpots() {
    clearSpots();
    cases[idx].hotspots.forEach(h => {
        const el = document.createElement('div');
        el.className = 'hotspot visible';
        el.style.top  = h.top + '%';
        el.style.left = h.left + '%';
        el.innerHTML = `<div class="hotspot-dot"></div><div class="hotspot-tip">${h.label}</div>`;
        frameFake.appendChild(el);
    });
}

function clearSpots() {
    frameFake.querySelectorAll('.hotspot').forEach(el => el.remove());
}

init();
