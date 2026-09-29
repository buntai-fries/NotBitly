class mainHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <a href="#">URL Shortner</a>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/converter">Converter</a>
          </li>
        </ul>
      </header>
    `;
  }
}

class mainFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- This provides the logo that is used in footer section. -->
      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      
      <footer>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/anup-khatri-a0a3a230a/"><ion-icon name="logo-linkedin"></ion-icon> LinkedIn 
          </a>
          </li>
          <li>
            <a href="https://github.com/buntai-fries"><ion-icon name="logo-github"></ion-icon> Github </a>
          </li>
        </ul>

        <ul class="menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>

        <p class="copyright"> Made with ❤️ in Nepal.</p>
      </footer>
    `;
  }
}

customElements.define("main-footer", mainFooter);
customElements.define("main-header", mainHeader);
