import * as React from "react";

const Meet = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} {...props}>
    <path fill="#fff" d="M12 32V16h16v16z" />
    <path fill="#1e88e5" d="M3 17v14l5 1 5-1V17l-5-1z" />
    <path
      fill="#4caf50"
      d="M37 24v14a3 3 0 0 1-3 3H13l-1-5 1-5h14v-7l5-1 5 1z"
    />
    <path fill="#fbc02d" d="M37 10v14H27v-7H13l-1-5 1-5h21a3 3 0 0 1 3 3z" />
    <path fill="#1565c0" d="M13 31v10H6a3 3 0 0 1-3-3v-7h10z" />
    <path fill="#e53935" d="M13 7v10H3z" />
    <path fill="#2e7d32" d="m38 24-1 8.45L27 24l10-8.45z" />
    <path
      fill="#4caf50"
      d="M46 10.11v27.78c0 .84-.98 1.31-1.63.78L37 32.45v-16.9l7.37-6.22c.65-.53 1.63-.06 1.63.78z"
    />
  </svg>
);

export default Meet;
