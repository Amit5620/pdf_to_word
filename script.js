const convertBtn = document.getElementById('convert-btn');
const pdfInput = document.getElementById('pdf');
const resultDiv = document.getElementById('result');

convertBtn.addEventListener('click', () => {
  const pdfFile = pdfInput.files[0];
  if (pdfFile) {
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    resultDiv.innerHTML = 'Converting...';
    fetch('/convert', {
      method: 'POST',
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pdfFile.name.split('.')[0]}.docx`;
      a.innerHTML = 'Download';
      resultDiv.innerHTML = '';
      resultDiv.appendChild(a);
    });
  }
});
