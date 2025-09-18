export function christmansEmail(subject: string): string {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .email-header {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .email-body {
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <div class="logo-container">
                <img src="${logoUrl}" alt="Company Logo" style="max-width: 150px; margin-bottom: 20px;">
            </div>
            <div class="message-container">
                <div class="email-header">
                    Feliz dia de Santo Antônio, {{nome}}!
                </div>
                <div class="email-body">
                    <p>Neste dia de Santo Antônio, padroeiro dos pobres e dos que buscam esperança, celebramos a fé a generosidade e a partilha. Que o exemplo de Santo Antônio inspire cada um de nós a espalhar amor e solidariedade.</p>
                    <p>Todo dia um novo futuro!</p>
                </div>
                <div class="email-signature">
                    Com carinho,
                    <br>
                    Fundação O Pão dos Pobres Santo Antônio
                </div>
            </div>
            <div class="footer">
                <p>
                    Pão dos Pobres
                </p>
                <p>
                    <a href="https://www.paodospobres.com.br" target="_blank">www.paodospobres.com.br</a>
                </p>
            </div>
        </body>
        </html>
    `;
}
