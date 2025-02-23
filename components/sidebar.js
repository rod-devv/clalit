// --- Event Delegation for Sidebar Functionality ---
document.addEventListener("click", function (e) {
  // 1. Open sidebar when clicking the menu icon (present in the main file)
  if (e.target.closest("#menu-btn")) {
    document.getElementById("sb-sidebar").style.right = "0";
    e.stopPropagation();
    return;
  }
  // 2. Close sidebar when clicking the close button inside sidebar
  if (e.target.closest("#sb-close-btn")) {
    document.getElementById("sb-sidebar").style.right = "-550px";
    e.stopPropagation();
    return;
  }
  // 3. If the click is on a nested option in the sidebar (has nested functionality)
  let nestedOptionBtn = e.target.closest(".sb-option-btn.sb-nested");
  if (nestedOptionBtn) {
    const targetOption = nestedOptionBtn.getAttribute("data-target");
    document.getElementById(targetOption + "-sidebar").style.right = "0";
    e.stopPropagation();
    return;
  }
  // 4. If the click is on a back button in a nested sidebar, close that nested sidebar
  if (e.target.closest(".sb-back-btn")) {
    let nestedSidebar = e.target.closest(".sb-nested-sidebar");
    if (nestedSidebar) {
      nestedSidebar.style.right = "-550px";
    }
    e.stopPropagation();
    return;
  }
  // 5. If clicking outside any sidebar (and not on the menu icon), close all sidebars.
  if (!e.target.closest(".sb-sidebar") && !e.target.closest("#menu-btn")) {
    document.getElementById("sb-sidebar").style.right = "-550px";
    document.querySelectorAll(".sb-nested-sidebar").forEach(function (sidebar) {
      sidebar.style.right = "-550px";
    });
  }
});
