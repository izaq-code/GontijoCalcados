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

function loadNavbar() {
    const header = document.createElement('div');
    header.id = "header-inicial";

    header.innerHTML = `
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
                            <div id="Clientes" data-tooltip="Clientes" class="submenu-item"><i class="bi bi-people icon-space"></i> Clientes</div>
                        </a>
                        <a href="#">
                            <div id="cad" data-tooltip="Cadastrar produtos" class="submenu-item"><i class="bi bi-grid icon-space"></i> Cadastrar produtos</div>
                        </a>
                        <a href="#">
                            <div id="at" data-tooltip="Agendar atendimento" class="submenu-item"><i class="bi bi-calendar-event icon-space"></i> Agendar atendimento</div>
                        </a>
                        <a href="#">
                            <div id="ar" data-tooltip="Agendar retorno" class="submenu-item"><i class="bi bi-calendar-week icon-space"></i> Agendar retorno</div>
                        </a>
                        <a href="#">
                            <div id="estoque" data-tooltip="Estoque" class="submenu-item"><i class="bi bi-box2 icon-space"></i> Estoque</div>
                        </a>
                        <a href="#">
                            <div id="Venda" data-tooltip="Venda" class="submenu-item"><i class="bi bi-bag icon-space"></i> Venda</div>
                        </a>
                        <a href="#">
                            <div id="rel" data-tooltip="Relatório" class="submenu-item"><i class="bi bi-clipboard-data icon-space"></i> Relatório</div>
                        </a>
                    </div>
                </div>

                <div class="settings-section">
                    <div class="settings-header">
                        <h3 id="settingsHeader">SETTINGS</h3>
                    </div>
                    <div class="submenu" id="settings">
                        <div id="Informacoes" data-tooltip="Informações" class="submenu-item"><i class="bi bi-info-circle icon-space"></i> Suporte</div>
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

document.addEventListener("DOMContentLoaded", function() {
    loadNavbar();

    function extractIconAndTextOnMobile() {
        const screenWidth = window.innerWidth;
        const mobileScreenWidth = 668;
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

    function toggleSubMenu(submenuId, iconId, ) {
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
            toggleSubMenu(submenuId, iconId, 'bi-caret-down-fill');
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
        toggleSubMenu('menu', 'menuIcon', 'bi-caret-down-fill');
    });

    const settingsHeader = document.getElementById('settingsHeader');
    settingsHeader.addEventListener('click', function() {
        toggleSubMenu('settings', 'settingsIcon', 'bi-caret-down-fill');
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
