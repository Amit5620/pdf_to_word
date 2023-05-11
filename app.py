from flask import Flask, render_template, request, send_file
import tempfile
from pdf2docx import Converter

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        pdf_file = request.files['pdf']
        if pdf_file:
            with tempfile.TemporaryDirectory() as tmpdir:
                pdf_path = f'{tmpdir}/input.pdf'
                doc_path = f'{tmpdir}/output.docx'
                pdf_file.save(pdf_path)
                cv = Converter(pdf_path)
                cv.convert(doc_path, start=0, end=None)
                cv.close()
                return send_file(doc_path, attachment_filename='converted.docx', as_attachment=True)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

