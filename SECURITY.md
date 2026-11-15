# Security Policy

The Bullseye project team takes the security and privacy of classroom participants, educational records, and accessibility infrastructures seriously. We welcome responsible disclosure of any security vulnerabilities found within Bullseye repositories or deployed services.

## Supported Versions

Only the latest active major/minor versions receive security patches. Previous versions are deprecated once a new minor release is stabilized.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please report security vulnerabilities using one of the following methods:

1. **GitHub Private Security Advisory (Preferred):**  
   Navigate to the [Security tab](../../security/advisories) of the repository and click **"New draft security advisory"** to open a confidential report.
2. **Direct Email:**  
   Email the core security response team at **security@bullseye-accessibility.org** (or contact the repository maintainers).

### What to Include in Your Report

To help us triage and resolve the issue quickly, please include:
- A clear description of the vulnerability and its potential impact.
- Step-by-step instructions to reproduce the issue (proof-of-concept code, HTTP requests, or environment details).
- Component(s) affected (e.g., `app/`, `server/`, Docker containers, token generators, or LMS integrations).
- Any proposed remediation or mitigation if available.

### Response Timeframe

- **Initial Acknowledgement:** Within **48 hours** of receiving your report.
- **Triage & Status Assessment:** Within **5 business days** with preliminary severity assessment.
- **Remediation & Release:** Security fixes are developed in private branches and released via security patch advisories with full CVE allocation if applicable.
- **Public Disclosure:** Coordinated disclosure typically occurs after a patch has been merged and published to production, allowing a standard 30-day window for downstream adopters.

## Security Best Practices for Contributors & Deployments

- **No Secrets in Source:** Never commit API keys, LMS tokens (Canvas access tokens, EdStem cookies), database passwords, or JWT secrets. Use `.env` files and environment variable injection.
- **Student Data Privacy (FERPA / GDPR):** Bullseye adheres to zero-retention principles for raw classroom speech, identifying disability notes, and student query history unless explicitly authorized. All data pipelines must sanitize PII.
- **Dependency Auditing:** All dependencies are continuously audited via automated CI tooling (`npm audit`, dependabot alerts).
