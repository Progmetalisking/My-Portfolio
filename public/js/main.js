// ==========================================================================
// PORTFOLIO CLIENT-SIDE SCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Copy Email Button with Visual Feedback
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'your.email@example.com';
      
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyText.textContent;
        copyText.textContent = 'Copied to Clipboard! ✓';
        copyBtn.style.borderColor = '#4ade80';
        copyBtn.style.color = '#4ade80';

        setTimeout(() => {
          copyText.textContent = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        copyText.textContent = 'Copied! ✓';
        setTimeout(() => {
          copyText.textContent = 'Copy Email';
        }, 2000);
      }
    });
  }

  // 2. Download Resume Button Notice (Alert if resume.pdf is not yet added)
  const resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      const href = resumeBtn.getAttribute('href');
      if (href === '#' || href === '#contact') {
        // Soft prompt reminding the user to link their file
        console.log('Tip: Place your resume.pdf in the public/ folder and link it in views/index.ejs!');
      }
    });
  }
});
