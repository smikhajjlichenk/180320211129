const form = document.forms[0];
const messages = document.getElementById("messages");
const userMessage = document.getElementById("user-message");
const btnSubmit = document.getElementById("btn-submit");

class FormSubmit {
  constructor(form, messages, userMessage, btnSubmit) {
    // DOM nodes
    this.form = form;
    this.messages = messages;
    this.userMessage = userMessage;
    this.btnSubmit = btnSubmit;
    // User data
    this.userMessageVal;
    this.userName = "Аноним";
    // Call initial FormSubmit
    this.initial();
  }

  // Initial FormSubmit
  initial() {
    // Prevent reloading page after submit
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    // Getting user message
    this.userMessage.addEventListener("input", (e) => {
      this.userMessageVal = e.target.value.trim();
    });
    // Submitting form on key presses
    this.userMessage.addEventListener("keydown", (e) => {
      if (e.code == "Enter" && (e.ctrlKey || e.metaKey)) {
        this.submitHandler.call(this);
      }
    });
    // Submitting form on click
    this.btnSubmit.addEventListener("click", this.submitHandler.bind(this));
  }

  // Event Handler
  submitHandler() {
    // Handler checks message length
    if (this.userMessageVal) {
      // And insert html to DOM by calling render function to which passed user data
      this.messages.insertAdjacentHTML("beforeend", this.templateMessage());
      // Then cleared textarea and variable who include user message
      this.userMessage.value = "";
      this.userMessageVal = "";
    }
  }

  // Render function
  templateMessage() {
    return `<article class="chat-messages__item">
      <header class="chat-messages__header">
        <h3 class="chat-messages__user-name">
          ${this.userName}
          <time datetime="2011-10-13" class="chat-messages__date">
          ${currentDate()}
          </time>
        </h3>
      </header>
      <p class="chat-messages__message">
        ${sanitize(this.userMessageVal)}
      </p>
    </article>`;
  }
}

new FormSubmit(form, messages, userMessage, btnSubmit);

// Sanitizer
const UNSAFE_CHARS_RE = /<|>\/|'|\u2028|\u2029/g;
const ESCAPED_CHARS = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "\\u0027",
  "</": "<\\u002F",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};
// Escape unsafe chars
const escapeUnsafeChars = (unsafeChar) => ESCAPED_CHARS[unsafeChar];
//Replacing unsafe chars to html-code
function sanitize(string) {
  return string.replace(UNSAFE_CHARS_RE, escapeUnsafeChars);
}

// Get date
function currentDate() {
  return new Date()
    .toLocaleDateString("ru", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .slice(0, -3);
}
