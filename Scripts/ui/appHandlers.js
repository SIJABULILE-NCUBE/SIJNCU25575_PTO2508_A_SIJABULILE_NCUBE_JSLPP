/*
  This file handles general app interactions such as theme switching,*/

export function setupThemeHandlers() {
    const body = document.body;
    const desktopToggle = document.getElementById("theme-toggle");
    const mobileToggle = document.getElementById("mobile-theme-toggle");
  
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
  
    body.classList.toggle("dark-theme", isDark);
    body.classList.toggle("light-theme", !isDark);
  
    if (desktopToggle) desktopToggle.checked = isDark;
    if (mobileToggle) mobileToggle.checked = isDark;
  
    function applyTheme(checked) {
      body.classList.toggle("dark-theme", checked);
      body.classList.toggle("light-theme", !checked);
      localStorage.setItem("theme", checked ? "dark" : "light");
  
      if (desktopToggle) desktopToggle.checked = checked;
      if (mobileToggle) mobileToggle.checked = checked;
    }
  
    desktopToggle?.addEventListener("change", () => {
      applyTheme(desktopToggle.checked);
    });
  
    mobileToggle?.addEventListener("change", () => {
      applyTheme(mobileToggle.checked);
    });
  }
  
  export function setupSidebarHandlers() {
    const sidebar = document.getElementById("side-bar-div");
    const hideSidebarBtn = document.getElementById("hide-sidebar-btn");
    const showSidebarBtn = document.getElementById("show-sidebar-btn");
  
    if (!sidebar || !hideSidebarBtn || !showSidebarBtn) return;
  
    hideSidebarBtn.addEventListener("click", () => {
      sidebar.classList.add("hidden");
      showSidebarBtn.classList.add("visible");
    });
  
    showSidebarBtn.addEventListener("click", () => {
      sidebar.classList.remove("hidden");
      showSidebarBtn.classList.remove("visible");
    });
  }
  
  export function setupMobileMenuHandlers() {
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuTrigger = document.getElementById("mobile-menu-trigger");
    const closeMobileMenu = document.getElementById("close-mobile-menu");
  
    if (!mobileMenu || !mobileMenuTrigger || !closeMobileMenu) return;
  
    mobileMenuTrigger.addEventListener("click", () => {
      mobileMenu.showModal();
    });
  
    closeMobileMenu.addEventListener("click", () => {
      mobileMenu.close();
    });
  
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.close();
      }
    });
  }   