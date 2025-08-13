function loadHeaderFooter() {
  const header = document.querySelector("header");
  header.innerHTML = `
        <div class="navigation">
            <nav>
                <ul>
                    <!--either implement EJS or JavaScript that checks if user is logged in, if not, change to "Log in"-->
                    <li><a href="/" class="nav-styles">Home</a></li>
                    <li><a href="/login/" id="account-button" class="nav-styles">My Account</a></li>
                </ul>
            </nav>
        </div>
    `;
  const footer = document.querySelector("footer");
  footer.innerHTML = `
        <ul class="credits">
            <li class="credits-header"><strong>CSE341 Group Project</strong></li>
            <li>Juan Carlos Mena Osorio</li>
            <li>Lais Rocha Watson</li>
            <li>Benjamin Walveranta</li>
            <li>Samuele Bonfanti</li>
            <li>Nicolás Foti</li>
        </ul>
        <span class="copyright">&copy; 2025</span>
    `;
}
loadHeaderFooter();
