// Initialize Lucide icons on page load
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set default initial requirements for UI/UX Designer
  const uiuxProjects = document.getElementById('uiuxProjects');
  const portfolioUrl = document.getElementById('portfolioUrl');
  
  if (uiuxProjects) uiuxProjects.required = true;
  if (portfolioUrl) portfolioUrl.required = true;
});

// Dynamic role switching function
function selectRole(role) {
  const selectedRoleInput = document.getElementById('selectedRole');
  const btnUiux = document.getElementById('btn-uiux');
  const btnBizdev = document.getElementById('btn-bizdev');
  const uiuxFields = document.getElementById('uiux-fields');
  const bizdevFields = document.getElementById('bizdev-fields');
  const uiuxProjects = document.getElementById('uiuxProjects');
  const portfolioUrl = document.getElementById('portfolioUrl');
  const bizdevStrategy = document.getElementById('bizdevStrategy');

  if (!selectedRoleInput) return;

  selectedRoleInput.value = role;

  if (role === 'uiux') {
    // Styling for active UI/UX tab
    if (btnUiux) {
      btnUiux.className = 'py-3 px-4 rounded-xl border border-indigo-500 bg-indigo-600/20 text-indigo-300 font-medium text-sm flex items-center justify-center gap-2 transition';
    }
    if (btnBizdev) {
      btnBizdev.className = 'py-3 px-4 rounded-xl border border-slate-700 bg-slate-800/40 text-slate-400 font-medium text-sm flex items-center justify-center gap-2 hover:border-slate-600 transition';
    }

    // Toggle field visibility & requirements
    if (uiuxFields) uiuxFields.classList.remove('hidden');
    if (bizdevFields) bizdevFields.classList.add('hidden');
    if (uiuxProjects) uiuxProjects.required = true;
    if (portfolioUrl) portfolioUrl.required = true;
    if (bizdevStrategy) bizdevStrategy.required = false;
  } else {
    // Styling for active Biz Dev tab
    if (btnBizdev) {
      btnBizdev.className = 'py-3 px-4 rounded-xl border border-emerald-500 bg-emerald-600/20 text-emerald-300 font-medium text-sm flex items-center justify-center gap-2 transition';
    }
    if (btnUiux) {
      btnUiux.className = 'py-3 px-4 rounded-xl border border-slate-700 bg-slate-800/40 text-slate-400 font-medium text-sm flex items-center justify-center gap-2 hover:border-slate-600 transition';
    }

    // Toggle field visibility & requirements
    if (bizdevFields) bizdevFields.classList.remove('hidden');
    if (uiuxFields) uiuxFields.classList.add('hidden');
    if (bizdevStrategy) bizdevStrategy.required = true;
    if (uiuxProjects) uiuxProjects.required = false;
    if (portfolioUrl) portfolioUrl.required = false;
  }

  // Refresh icons after DOM updates
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Smooth scroll down to the form
  const applySection = document.getElementById('apply');
  if (applySection) {
    applySection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Handle form submission to Web3Forms API
async function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnContent = submitBtn.innerHTML;

  // Show loading indicator
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Submitting Application...';

  const formData = new FormData(form);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      alert('Application received! We will review your submission shortly.');
      form.reset();
      selectRole('uiux'); // Reset back to default UI/UX view
    } else {
      alert('Submission error: ' + (data.message || 'Please try again.'));
    }
  } catch (error) {
    alert('Network error. Please check your internet connection and try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnContent;
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}