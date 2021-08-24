const initAutoMenuDirection = () => {
    const arrMenuDirEl = document.querySelectorAll('.set-menu-dir')
    const menuBarEl = document.querySelector('nav.menu-bar')

    const setMenuDirection = ({target:dirEl}) => {
        const dataDir = dirEl.getAttribute('data-dir')
        menuBarEl.classList.add('anim-out')
        setTimeout(() => {
            menuBarEl.classList.remove('anim-out')
            menuBarEl.setAttribute('data-dir', dataDir)                    
        }, 1000)
    }
    arrMenuDirEl.forEach(e => e.addEventListener('click', setMenuDirection))
}
initAutoMenuDirection()

const currentTab = curTabEl => {
    const oldTabActiveEl = document.querySelector('nav.menu-bar ul li.tab.active')
    oldTabActiveEl.classList.remove('active')
    curTabEl.classList.add('active')

    const tabTitleEl = document.querySelector('section.tab-body .title')
    const tabTextEl = document.querySelector('section.tab-body .text')
    
    // save old content
    const oldTabInputEl = oldTabActiveEl.querySelector('input.tab-content')
    oldTabInputEl.value = JSON.stringify({title: tabTitleEl.innerHTML, text: tabTextEl.innerHTML})
    console.log({title: tabTitleEl.innerHTML, text: tabTextEl.innerHTML})
    // get current content
    const curTabInputEl = curTabEl.querySelector('input.tab-content')
    const {title='', text=''} = JSON.parse(curTabInputEl.value || '{}')
    tabTitleEl.innerHTML = title       
    tabTextEl.innerHTML = text
}

const removeTab = ev => {
    ev.stopPropagation()
    const tabEl = ev.target.parentElement
    const anotherTabEl = document.querySelector('nav.menu-bar ul li.tab + li.tab:not(.plus)')
    
    if(anotherTabEl) {
        if(tabEl.classList.contains('active')) {
            const nextTabEl = tabEl.nextElementSibling
            const prevTabEl = tabEl.previousElementSibling
            
            nextTabEl.classList.contains('plus') 
                ? prevTabEl.classList.add('active')
                : nextTabEl.classList.add('active')
            console.log({prevTabEl, nextTabEl})
        }
        tabEl.remove()
    }
}

const addTab = () => {
    const tabPlusEl = document.querySelector('nav.menu-bar ul li.tab.plus')
    tabPlusEl.insertAdjacentHTML('beforeBegin', `
        <li class="tab" onclick="currentTab(this)">
            <span class="close" onclick="removeTab(event)"></span>
            <span class="name">-</span>
            <input class="tab-content" type="text" hidden>
        </li>
    `)
    const newTabEl = tabPlusEl.previousElementSibling
    newTabEl.click()
}

const editTabName = areaTextEl => {
    const curTabEl = document.querySelector('nav.menu-bar ul li.tab.active .name')
    curTabEl.textContent = areaTextEl.textContent ? areaTextEl.textContent : '-'
}