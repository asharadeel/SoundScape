// MOBILE REDIRECT HANDLER
/*
(function () {
  const isMobileDevice =
    /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|webOS/i.test(navigator.userAgent);

  const isSmallScreen = window.innerWidth < 700;

  // Get current page file name (ex: "index.html")
  const currentPage = window.location.pathname.split("/").pop();

  // Do NOT redirect if already on mobile.html
  if (currentPage === "mobile.html") return;

  // Redirect if on mobile or very small screen
  if (isMobileDevice || isSmallScreen) {
    window.location.href = "mobile.html";
  }
})();
*/