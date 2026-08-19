const navbarHTML = `
    <nav class="bg-surface-container flex justify-around gap-1 items-center p-2  px-container-padding-mobile border-t border-outline-variant/30">
    
    <a href="dashboard.html" class="flex flex-col items-center justify-center text-on-surface-variant p-4 cursor-pointer hover:bg-surface-variant transition-all rounded-full">
    <span class="material-symbols-outlined">dashboard</span>
    <span class="font-label-lg text-label-lg px-2 py-1">Dashboard</span>
    </a>

    <a href="index.html" class="flex flex-col items-center justify-center text-on-surface-variant text-on-secondary-container rounded-full p-4 cursor-pointer active:scale-90 transition-all duration-200">
    <span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1;">how_to_reg</span>
    <span class="font-label-lg text-label-lg px-2 py-1">Registry</span>
    </a>

    <a href="management.html" class="flex flex-col items-center justify-center text-on-surface-variant p-4 cursor-pointer hover:bg-surface-variant transition-all rounded-full">
    <span class="material-symbols-outlined">settings</span>
    <span class="font-label-lg text-label-lg px-2 py-1">Management</span>
    </a>

    <a href="activities.html" class="flex flex-col items-center justify-center text-on-surface-variant p-4 cursor-pointer hover:bg-surface-variant transition-all rounded-full">
    <span class="material-symbols-outlined">analytics</span>
    <span class="font-label-lg text-label-lg px-2 py-1">Activities</span>
    </a>

    </nav>
`
document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.getElementById("nav-container");
    if (navContainer) {
        navContainer.innerHTML = navbarHTML;

        const currentPath = window.location.pathname.split("/").pop() || "dashboard.html";
        console.log(currentPath);

        // Find an <a> tag whose href is "students.html".
        const activeLink = navContainer.querySelector(`a[href="${currentPath}"]`);
        console.log(activeLink);

        if (activeLink) {
            activeLink.classList.add("bg-green-800", "text-white");
            activeLink.classList.remove("text-on-surface-variant", "hover:bg-surface-variant");


        }
    }
});


