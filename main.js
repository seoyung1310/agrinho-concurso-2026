// main.js - Interatividade Avançada: Cards 3D Flip, Filtros, Partículas, Quiz, Contadores Dinâmicos

// ==================== Dados dos 17 ODS com categoria e contribuição completa ====================
const odsData = [
    { id: 1, title: "Erradicação da Pobreza", category: "social", contribution: "Geração de empregos e oportunidades de renda em áreas rurais, programas de agricultura familiar e cooperativas que reduzem a pobreza no campo." },
    { id: 2, title: "Fome Zero", category: "social", contribution: "Produção sustentável de alimentos, fortalecimento da agricultura familiar, bancos de alimentos e tecnologias que aumentam a produtividade sem degradar o solo." },
    { id: 3, title: "Saúde e Bem-Estar", category: "social", contribution: "Práticas agrícolas que promovem alimentos saudáveis e nutritivos, redução de agrotóxicos, rastreabilidade e produção orgânica." },
    { id: 4, title: "Educação de Qualidade", category: "social", contribution: "Capacitação de trabalhadores rurais em tecnologias sustentáveis, escolas técnicas no campo e extensão rural digital." },
    { id: 5, title: "Igualdade de Gênero", category: "social", contribution: "Empoderamento de mulheres no agronegócio, acesso a crédito rural feminino, liderança feminina em cooperativas." },
    { id: 6, title: "Água Potável e Saneamento", category: "environmental", contribution: "Irrigação sustentável, captação de água da chuva, reuso de efluentes e proteção de nascentes nas propriedades rurais." },
    { id: 7, title: "Energia Acessível e Limpa", category: "environmental", contribution: "Uso de energias renováveis: biogás, biomassa, energia solar nas fazendas, redução da pegada de carbono." },
    { id: 8, title: "Trabalho Decente e Crescimento", category: "economic", contribution: "Criação de empregos dignos com direitos trabalhistas, agregação de valor e crescimento econômico local via agroindústria." },
    { id: 9, title: "Indústria, Inovação e Infraestrutura", category: "economic", contribution: "Adoção de AgTechs, drones, IoT, sensoriamento remoto e rastreabilidade com blockchain." },
    { id: 10, title: "Redução das Desigualdades", category: "social", contribution: "Inclusão de pequenos agricultores e comunidades quilombolas/indígenas no mercado agrícola com assistência técnica." },
    { id: 11, title: "Cidades e Comunidades Sustentáveis", category: "social", contribution: "Agricultura urbana e periurbana, hortas comunitárias, telhados verdes e segurança alimentar nas cidades." },
    { id: 12, title: "Consumo e Produção Responsáveis", category: "environmental", contribution: "Redução de desperdícios, logística reversa, certificações ambientais e economia circular no agro." },
    { id: 13, title: "Ação Contra a Mudança do Clima", category: "environmental", contribution: "Sequestro de carbono no solo, sistemas agroflorestais, agricultura de baixa emissão e créditos de carbono." },
    { id: 14, title: "Vida na Água", category: "environmental", contribution: "Proteção de recursos hídricos, zoneamento ambiental, tratamento de efluentes e preservação de nascentes." },
    { id: 15, title: "Vida Terrestre", category: "environmental", contribution: "Preservação da biodiversidade, recuperação de áreas degradadas, corredores ecológicos e integração lavoura-pecuária-floresta." },
    { id: 16, title: "Paz, Justiça e Instituições", category: "social", contribution: "Políticas agrícolas justas, certificação de origem, combate ao trabalho análogo à escravidão e transparência nas cadeias produtivas." },
    { id: 17, title: "Parcerias e Meios de Implementação", category: "economic", contribution: "Fortalecimento de colaborações entre governos, setor privado e sociedade civil para o desenvolvimento sustentável do agronegócio." }
];

// ==================== Renderizar Cards com Efeito 3D Flip ====================
function renderODSCards() {
    const gridContainer = document.getElementById('odsGridContainer');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';
    
    odsData.forEach(ods => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'ods-card-container';
        cardContainer.setAttribute('data-category', ods.category);
        cardContainer.setAttribute('data-id', ods.id);
        
        cardContainer.innerHTML = `
            <div class="ods-card">
                <div class="card-front">
                    <div class="ods-number-front">${ods.id.toString().padStart(2, '0')}</div>
                    <div class="ods-title-front">${ods.title}</div>
                    <div class="ods-category">${getCategoryIcon(ods.category)} ${getCategoryName(ods.category)}</div>
                    <i class="fas fa-rotate-right" style="margin-top: 1rem; opacity: 0.6; font-size: 0.9rem;"></i>
                    <span style="font-size: 0.7rem; margin-top: 0.3rem;">passe o mouse ou clique</span>
                </div>
                <div class="card-back">
                    <h4><i class="fas fa-leaf"></i> Contribuição do Agro</h4>
                    <p>${ods.contribution}</p>
                    <div class="back-icon">
                        <i class="fas fa-seedling"></i>
                    </div>
                </div>
            </div>
        `;
        
        // Suporte para dispositivos touch: clique alterna classe flipped
        const card = cardContainer.querySelector('.ods-card');
        cardContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            cardContainer.classList.toggle('flipped');
            
            // Auto flip back após 5 segundos (opcional)
            setTimeout(() => {
                if (cardContainer.classList.contains('flipped')) {
                    cardContainer.classList.remove('flipped');
                }
            }, 5000);
        });
        
        gridContainer.appendChild(cardContainer);
    });
}

function getCategoryIcon(category) {
    switch(category) {
        case 'social': return '<i class="fas fa-users"></i>';
        case 'economic': return '<i class="fas fa-chart-line"></i>';
        case 'environmental': return '<i class="fas fa-globe-americas"></i>';
        default: return '<i class="fas fa-tag"></i>';
    }
}

function getCategoryName(category) {
    switch(category) {
        case 'social': return 'Social';
        case 'economic': return 'Econômico';
        case 'environmental': return 'Ambiental';
        default: return 'ODS';
    }
}

// ==================== Sistema de Filtros ====================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.ods-card-container');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Atualizar botão ativo
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            cards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.4s ease';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.4s ease';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
            
            showToast(`📌 Mostrando: ${filterValue === 'all' ? 'todos os ODS' : filterValue === 'social' ? 'ODS Sociais' : filterValue === 'economic' ? 'ODS Econômicos' : 'ODS Ambientais'}`);
        });
    });
}

// ==================== Contadores Animados (interatividade extra) ====================
function animateCounters() {
    const foodStat = document.getElementById('statFood');
    const carbonStat = document.getElementById('statCarbon');
    const jobsStat = document.getElementById('statJobs');
    
    if (!foodStat) return;
    
    let foodCount = 0;
    let carbonCount = 0;
    let jobsCount = 0;
    
    const targetFood = 8.5;
    const targetCarbon = 2.5;
    const targetJobs = 24;
    
    const interval = setInterval(() => {
        foodCount += 0.15;
        carbonCount += 0.05;
        jobsCount += 0.4;
        
        if (foodCount >= targetFood) foodCount = targetFood;
        if (carbonCount >= targetCarbon) carbonCount = targetCarbon;
        if (jobsCount >= targetJobs) jobsCount = targetJobs;
        
        if (foodStat) foodStat.textContent = foodCount.toFixed(1);
        if (carbonStat) carbonStat.textContent = carbonCount.toFixed(1);
        if (jobsStat) jobsStat.textContent = Math.floor(jobsCount);
        
        if (foodCount >= targetFood && carbonCount >= targetCarbon && jobsCount >= targetJobs) {
            clearInterval(interval);
        }
    }, 50);
}

// ==================== Barra de Progresso Animada ====================
function animateProgressBar() {
    const meterFill = document.getElementById('progressMeter');
    const meterValue = document.getElementById('progressValue');
    if (!meterFill) return;
    
    let progress = 0;
    const targetProgress = 68;
    
    const interval = setInterval(() => {
        progress += 2;
        if (progress >= targetProgress) {
            progress = targetProgress;
            clearInterval(interval);
        }
        meterFill.style.width = progress + '%';
        if (meterValue) meterValue.textContent = progress + '%';
    }, 40);
}

// ==================== Toast Notification System ====================
function showToast(message, duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<i class="fas fa-bell" style="margin-right: 8px;"></i> ${message}`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, duration);
}

// ==================== Modo Escuro ====================
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;
    
    const isDarkMode = localStorage.getItem('agrinho-darkmode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-active');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    }
    
    toggleBtn.addEventListener('click', () => {
        const currentlyDark = document.body.classList.contains('dark-active');
        if (currentlyDark) {
            document.body.classList.remove('dark-active');
            localStorage.setItem('agrinho-darkmode', 'false');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Modo Noturno';
            showToast('🌞 Modo claro ativado');
        } else {
            document.body.classList.add('dark-active');
            localStorage.setItem('agrinho-darkmode', 'true');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
            showToast('🌙 Modo noturno ativado');
        }
    });
}

// ==================== Botões Interativos ====================
function initInteractiveButtons() {
    const exploreBtn = document.getElementById('exploreOdsBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const odsSection = document.getElementById('odsSection');
            if (odsSection) {
                odsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showToast('🚀 Explore os 17 ODS — vire os cards para saber como o agro contribui!');
            }
        });
    }
    
    const randomBtn = document.getElementById('randomOdsBtn');
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            const randomId = Math.floor(Math.random() * 17) + 1;
            const randomCard = document.querySelector(`.ods-card-container[data-id="${randomId}"]`);
            if (randomCard) {
                randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                randomCard.classList.add('flipped');
                setTimeout(() => {
                    randomCard.classList.remove('flipped');
                }, 4000);
                const ods = odsData.find(o => o.id === randomId);
                showToast(`🎲 ODS Surpresa: ${ods.title} — vire o card para ver a contribuição!`);
            }
        });
    }
    
    const partnersBtn = document.getElementById('showPartnersBtn');
    if (partnersBtn) {
        partnersBtn.addEventListener('click', () => {
            const ods17 = odsData.find(o => o.id === 17);
            showToast(`🤝 ${ods17.title}: ${ods17.contribution.substring(0, 100)}...`);
        });
    }
    
    const quizBtn = document.getElementById('quizBtn');
    if (quizBtn) {
        quizBtn.addEventListener('click', startQuickQuiz);
    }
}

// ==================== Quiz Rápido e Interativo ====================
let currentQuizQuestion = 0;
const quizQuestions = [
    { question: "Qual ODS tem como objetivo 'Acabar com a fome, alcançar a segurança alimentar'?", answer: 2 },
    { question: "ODS que trata da 'Ação contra a mudança global do clima' é o número:", answer: 13 },
    { question: "Qual ODS promove 'Energia acessível e limpa'?", answer: 7 },
    { question: "O agronegócio contribui para a 'Vida Terrestre' (ODS 15) através de:", answer: "Preservação da biodiversidade" }
];

function startQuickQuiz() {
    const quizAnswer = prompt("🧠 Quiz Rápido!\n\nQual ODS é diretamente relacionado à 'Fome Zero'?\n\n1 - ODS 1 (Erradicação da Pobreza)\n2 - ODS 2 (Fome Zero)\n3 - ODS 3 (Saúde e Bem-Estar)\n\nDigite o número da resposta:");
    
    if (quizAnswer === '2') {
        showToast("✅ Correto! ODS 2 é Fome Zero! O agro sustentável é essencial para alcançar essa meta.");
    } else if (quizAnswer === '1' || quizAnswer === '3') {
        showToast("📚 Quase! O ODS específico para Fome Zero é o número 2. Continue explorando os cards!");
    } else {
        showToast("🌱 Dica: Explore o card ODS 02 para aprender mais!");
    }
}

// ==================== Partículas Flutuantes (Efeito Visual) ====================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 8 + 4 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particlesContainer.appendChild(particle);
    }
}

// ==================== Rolar suave para âncoras ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== Adicionar ano no footer ====================
function updateFooterYear() {
    const footerText = document.querySelector('.footer-meta p');
    if (footerText && !footerText.innerHTML.includes('©')) {
        const year = new Date().getFullYear();
        footerText.innerHTML = footerText.innerHTML + ` | © ${year} - Tecnologia e sustentabilidade em harmonia.`;
    }
}

// ==================== Inicialização ====================
document.addEventListener('DOMContentLoaded', () => {
    renderODSCards();
    initFilters();
    initDarkMode();
    initInteractiveButtons();
    animateCounters();
    animateProgressBar();
    createParticles();
    initSmoothScroll();
    updateFooterYear();
    
    console.log('🚀 Site AgroTech 2030 | Cards 3D Flip, Filtros e Interatividade total!');
    showToast('✨ Bem-vindo! Passe o mouse nos cards para ver como o agro contribui para cada ODS', 4000);
});