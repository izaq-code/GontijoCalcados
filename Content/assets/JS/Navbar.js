
var bootstrapIconsLink = document.createElement('link');
bootstrapIconsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
bootstrapIconsLink.rel = 'stylesheet';
document.head.appendChild(bootstrapIconsLink);

var fontAwesomeLink = document.createElement('link');
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
fontAwesomeLink.rel = 'stylesheet';
document.head.appendChild(fontAwesomeLink);

var sweetalert2Script = document.createElement('script');
sweetalert2Script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
document.body.appendChild(sweetalert2Script);

let deviceType = detectDevice();
const mainElement = document.querySelector('main');

function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Verifica se o userAgent contém palavras-chave específicas de dispositivos móveis
    if (/android/i.test(userAgent)) {
        return "Mobile (Android)";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "Mobile (iOS)";
    }
    if (/Windows Phone/i.test(userAgent)) {
        return "Mobile (Windows Phone)";
    }
    if (/BB10/i.test(userAgent) || /BlackBerry/i.test(userAgent)) {
        return "Mobile (BlackBerry)";
    }
    if (/IEMobile/i.test(userAgent)) {
        return "Mobile (IE)";
    }

    if (window.innerWidth <= 600) {
        return "Mobile";
    }

    // Verifica se o userAgent contém palavras-chave específicas de desktops
    if (/Windows NT|Macintosh|Linux x86_64|X11/.test(userAgent)) {
        return "Desktop";
    }

    // Caso padrão para detecção de desktop
    return "Desktop";
}

function applyStylesForDeviceType() {
    if (deviceType === "Desktop") {
        mainElement.classList.add('content');
    } else {
        mainElement.classList.add('content1');
    }
}

// Função para atualizar o tipo de dispositivo apenas se houver mudança significativa no userAgent
function updateDeviceType() {
    const newDeviceType = detectDevice();
    if (newDeviceType !== deviceType) {
        deviceType = newDeviceType;
        applyStylesForDeviceType(); // Chama a função para aplicar os estilos baseados no novo tipo de dispositivo
    }
}

// Atualiza o tipo de dispositivo inicialmente
updateDeviceType();

// Adicionar um listener de redimensionamento da janela para atualizar o tipo de dispositivo dinamicamente
window.addEventListener('resize', updateDeviceType);


console.log(deviceType)




function loadDesktopNavbar() {
    const header = document.createElement('div');
    header.id = "header-inicial";
    header.innerHTML = `

   <div class="perfil-desk">
      <div id="nome_user-desk">Nome do Usuário</div>
      <div id="foto_user-desk"></div>
    </div>

        <header>
            <div class="navbar">
                <div class="to-con">
                    <input type="checkbox" id="inputto" />
                    <label id="labe" for="inputto">
                        <div class="to"></div>
                    </label>
                </div>

                <div class="menu-section">
                    <div class="menu-header">
                        <h3 id="menuHeader">MENU</h3>
                    </div>
                    <div class="submenu" id="menu">
                        <a href="#">
                            <div id="Clientes" data-tooltip="Home" class="submenu-item"><i class="bi bi-house icon-space"></i> Home</div>
                        </a>
                        <a href="#">
                            <div id="cad" data-tooltip="Graficos" class="submenu-item"><i class="bi bi-bar-chart icon-space"></i> Graficos</div>
                        </a>
                        <a href="#">
                            <div id="at" data-tooltip="Demandas" class="submenu-item"><i class="bi bi-clipboard2-pulse icon-space"></i> Demandas</div>
                        </a>
                        <a href="#">
                            <div id="ar" data-tooltip="Chats" class="submenu-item"><i class="bi bi-chat-left-dots icon-space"></i> Chats</div>
                        </a>
                        <a href="#">
                            <div id="estoque" data-tooltip="Funcionarios" class="submenu-item"><i class="bi bi-person icon-space"></i> Funcionarios</div>
                        </a>
                       
                    </div>
                </div>

                <div class="settings-section">
                    <div class="settings-header">
                        <h3 id="settingsHeader">SETTINGS</h3>
                    </div>
                    <div class="submenu" id="settings">
                        <div id="Informacoes" data-tooltip="Informações" class="submenu-item"><i class="bi bi-gear icon-space"></i> Configurações</div>
                        <div id="salvos" data-tooltip="Salvos" class="submenu-item"><i class="bi bi-bookmark icon-space"></i> Salvos</div>
                    </div>
                </div>

                <button class="logout-button"><i class="bi bi-box-arrow-in-right space"></i>Logout</button>
            </div>

            <div class="content"></div>
        </header>
    `;

    document.body.prepend(header);
}

function loadMobileNavbar() {
    const footer = document.createElement('div');
    footer.id = "footer-navbar";

    footer.innerHTML = `
     

  <header class="header_mobile">
<div class="container-toggle">
  <input type="checkbox" id="inputToggle" />
  <label id="labelToggle" for="inputToggle">
    <div class="toggle"></div>
  </label>
</div>

  
    <div class="perfil">
      <div id="nome_user">Nome do Usuário</div>
      <div id="foto_user"></div>
    </div>
  </header>


  <footer>
    <nav class="mobile-navbar">
       
<ul>


<li class="">
  <a href="#">
   <div class="icone">
     <i class="bi bi-house"></i>
    </div>
    <span class="label">Home</span>
  </a>
</li>

<li class="">
  <a href="#">
   <div class="icone">
    <i class="bi bi-bar-chart"></i>
    </div>
    <span class="label">Graficos</span>
  </a>
</li>

<li class="">
  <a href="#">
   <div class="icone">
    <i class="bi bi-clipboard2-pulse"></i>
    </div>
    <span class="label">Demandas</span>
  </a>
</li>

<li class="">
  <a href="#">
   <div class="icone">
    <i class="bi bi-chat-left-dots"></i>
    </div>
    <span class="label">Chats</span>
  </a>
</li>

<li class="">
  <a href="#">
   <div class="icone">
    <i class="bi bi-person"></i>
    </div>
    <span class="label">Funcionarios</span>
  </a>
</li>

<li class="">
  <a href="#">
   <div class="icone">
    <i class="bi bi-gear"></i>
    </div>
    <span class="label">configuraçoes.</span>
  </a>
</li>

<li class="">
  <a href="#">
   <div class="icone">
    <i class="bi bi-bookmark"></i>
    </div>
    <span class="label">Salvos</span>
  </a>
</li>

<div class="indicador"></div>

</ul>



    </nav>
</footer>

    `;

    document.body.appendChild(footer);
}


document.addEventListener("DOMContentLoaded", function() {
    const deviceType = detectDevice();
    
    applyStylesForDeviceType(); // Chama a função para aplicar os estilos baseados no novo tipo de dispositivo
    if (deviceType === "Desktop") {
       
        loadDesktopNavbar();
    } else {
       
        loadMobileNavbar();
    }

    function extractIconAndTextOnMobile() {
        const screenWidth = window.innerWidth;
        const mobileScreenWidth = 700;
        const desktopScreenWidth = 700;
        const submenuItems = document.querySelectorAll('.submenu-item');

        submenuItems.forEach(function(item) {
            if (screenWidth < mobileScreenWidth) {
                const htmlContent = item.innerHTML;
                const tempElement = document.createElement('div');
                tempElement.innerHTML = htmlContent;
                const iconHTML = tempElement.firstChild.outerHTML;
                item.innerHTML = iconHTML;
            } else {
                if (screenWidth >= desktopScreenWidth) {
                    const storedTextContent = item.getAttribute('data-original-text');
                    if (storedTextContent) {
                        window.location.reload();
                        item.innerHTML = storedTextContent;
                        item.removeAttribute('data-original-text'); 
                    }
                } else {
                    const storedTextContent = item.getAttribute('data-original-text');
                    if (!storedTextContent) {
                        item.setAttribute('data-original-text', item.innerHTML);
                    }
                }
            }
        });
    }

    extractIconAndTextOnMobile();
    window.addEventListener('resize', extractIconAndTextOnMobile);

    function toggleSubMenu(submenuId, iconId) {
        const submenu = document.getElementById(submenuId);
        const icon = document.getElementById(iconId);
        submenu.classList.toggle('visible');

        if (submenu.classList.contains('visible')) {
            
            localStorage.setItem(submenuId + '-state', 'visible');
        } else {
            
            localStorage.setItem(submenuId + '-state', 'hidden');
        }
    }

    function restoreSubMenuState(submenuId, iconId) {
        const submenuState = localStorage.getItem(submenuId + '-state');
        if (submenuState === 'visible') {
            toggleSubMenu(submenuId, iconId);
        }
    }

    function temadapagina() {
        const darkmode = localStorage.getItem('dark-mode') === 'true';
        const lightmode = localStorage.getItem('light-mode') === 'true';
        
        if (darkmode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else if (lightmode) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
        checkbox.checked = darkmode; 
    }

    const menuHeader = document.getElementById('menuHeader');
    menuHeader.addEventListener('click', function() {
        toggleSubMenu('menu', 'menuIcon');
    });

    const settingsHeader = document.getElementById('settingsHeader');
    settingsHeader.addEventListener('click', function() {
        toggleSubMenu('settings', 'settingsIcon');
    });

    const checkbox = document.getElementById('inputto');
    checkbox.addEventListener('change', function() {
        const isChecked = this.checked;
        if (isChecked) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            localStorage.setItem('dark-mode', true);
            localStorage.setItem('light-mode', false);
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', false);
            localStorage.setItem('light-mode', true);
        }
    });

    temadapagina();
    restoreSubMenuState('menu', 'menuIcon');
    restoreSubMenuState('settings', 'settingsIcon');
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.logout-button').addEventListener('click', function() {
        Swal.fire({
            title: "Tem certeza?",
            text: "Você quer realmente sair?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Sair!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval;
                Swal.fire({
                    title: "Você irá sair em 3 segundos",
                    html: "A página irá fechar em <b></b> milissegundos.",
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getHtmlContainer().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        window.location.href = '../../index.html'; 
                    }
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navLista = document.querySelectorAll('nav li');
    const indicador = document.querySelector('nav .indicador');
    const gutter = 80.8;  

    indicador.style.left = '0px';
    indicador.style.display = 'none';
    const onClick = (event, index) => {
        event.preventDefault();
        indicador.style.display = 'block';
        navLista.forEach(item => item.classList.remove('ativa'));
        event.currentTarget.classList.add('ativa');
        const itemWidth = event.currentTarget.offsetWidth;
        const itemLeft = event.currentTarget.offsetLeft;
        indicador.style.left = `${itemLeft + (itemWidth / 3) - (indicador.offsetWidth / 1.6)}px`;
    }

    navLista.forEach((item, index) => item.addEventListener('click', (event) => {
        onClick(event, index);
    }));
});

document.addEventListener('DOMContentLoaded', function () {
    function temadapagina() {
        const darkmode = localStorage.getItem('dark-mode') === 'true';

        if (darkmode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
        checkbox.checked = darkmode;
    }

    const checkbox = document.getElementById('inputToggle');
    checkbox.addEventListener('change', function() {
        const isChecked = this.checked;
        if (isChecked) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            localStorage.setItem('dark-mode', true);
            localStorage.setItem('light-mode', false);
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', false);
            localStorage.setItem('light-mode', true);
        }
    });

    temadapagina();
});