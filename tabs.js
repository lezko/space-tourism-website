const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
let currentPicture = document.querySelector('picture[data-visible=true]');

const tabArray = [].slice.call(tabs);
let currentTabIdx = tabArray.findIndex(t => t.getAttribute('aria-selected') === 'true');

tabList.addEventListener('keydown', e => {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownLeft) {
        setTab(currentTabIdx === 0 ? tabArray.length - 1 : currentTabIdx - 1)
    } else if (e.keyCode === keydownRight) {
        setTab(currentTabIdx === tabArray.length - 1 ? 0 : currentTabIdx + 1)
    }
});

tabs.forEach(b => b.addEventListener('click', e => {
    const index = tabArray.findIndex(t => t === e.target);
    setTab(index);
}));

function setTab(index) {
    let currentTab = tabArray[currentTabIdx];

    currentTab.setAttribute('aria-selected', 'false');
    currentTab.setAttribute('tabindex', '-1');
    document.getElementById(currentTab.getAttribute('aria-controls')).setAttribute('data-visible', 'false');

    const newTab = tabArray[index];
    newTab.setAttribute('aria-selected', 'true');
    newTab.setAttribute('tabindex', '0');
    document.getElementById(newTab.getAttribute('aria-controls')).setAttribute('data-visible', 'true');
    newTab.focus();

    currentPicture.setAttribute('data-visible', 'false');
    currentPicture = document.getElementById(newTab.getAttribute('data-image'));
    currentPicture.setAttribute('data-visible', 'true');

    currentTabIdx = index;
}

