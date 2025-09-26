export function santoAntonioTemplate(subject: string, name: string): string {
  return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                    <title>${subject}</title>
                    <style>
                            @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&display=swap');
                            body {
                                    padding: 7% 0 0 4%;
                                    font-family: 'Manrope', Arial, sans-serif;
                                    line-height: 1.6;
                                    color: #2c5aa0;
                                    font-weight: 600;
                            }
                            .email-header {
                                    margin: 5% 0 5% 0;
                            }
                            .message-container {
                                    margin: 0 5% 5% 2%;
                            }
                            .email-body {
                                    font-size: 16px;
                                    text-align: justify;
                            }
                            .email-signature {
                                    margin-top: 10%;
                            }
                            .footer-container {
                                    margin: 0 0 5% 2%;
                                    margin-top: 20%;
                            }
                            .contact-info {
                                    font-size: 14px;
                                    color: #ffa362;
                            }
                            .auto-reply {
                                    font-size: 12px;
                                    color: #999;
                                    margin-top: 5%;
                            }
                    </style>
            </head>
            <body>
                    <div class="header">
                            <img class="logo" src="assets/logo.png" alt="Company Logo" style="max-width: 150px; margin-bottom: 20px;">
                            <h2 class="email-header">Feliz Dia de Santo Antônio, ${name}!</h2>
                    </div>
                 <div class="message-container">
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
                    <div class="footer-container">
                            <p>
                                    Pão dos Pobres
                            </p>
                            <p class="contact-info">
                                    <a href="https://www.paodospobres.com.br" target="_blank" style="color: #ffa362; text-decoration: none;">www.paodospobres.com.br</a><br>
                                    Contato: (51) 3433-6900
                            </p>
                            <p class="auto-reply">
                                    Essa mensagem é gerada automaticamente, por favor não responda.
                            </p>
                    </div>
            </body>
            </html>
    `;
}

export function newYearTemplate(
  subject: string,
  name: string,
  year: number
): string {
  return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                    <title>${subject}</title>
                    <style>
                            @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&display=swap');
                            body {
                                    padding: 7% 0 0 4%;
                                    font-family: 'Manrope', Arial, sans-serif;
                                    line-height: 1.6;
                                    color: #2c5aa0;
                                    font-weight: 600;
                            }
                            .email-header {
                                    margin: 5% 0 5% 0;
                            }
                            .message-container {
                                    margin: 0 5% 5% 2%;
                            }
                            .email-body {
                                    font-size: 16px;
                                    text-align: justify;
                            }
                            .email-signature {
                                    margin-top: 10%;
                            }
                            .footer-container {
                                    margin: 0 0 5% 2%;
                                    margin-top: 20%;
                            }
                            .contact-info {
                                    font-size: 14px;
                                    color: #ffa362;
                            }
                            .auto-reply {
                                    font-size: 12px;
                                    color: #999;
                                    margin-top: 5%;
                            }
                    </style>
            </head>
            <body>
                    <div class="header">
                            <img class="logo" src="assets/logo.png" alt="Company Logo" style="max-width: 150px; margin-bottom: 20px;">
                            <h2 class="email-header">Feliz Ano Novo, ${name}!</h2>
                    </div>
                 <div class="message-container">
                            <div class="email-body">
                                    <p>Um novo ano começa cheio de esperanças e oportunidades. Desejamos que ${year} seja repleto de realizações, prosperidade e momentos felizes. Obrigado por estar conosco nesta caminhada!</p>
                                    <p>Todo dia um novo futuro!</p>
                            </div>
                            <div class="email-signature">
                                    Com carinho,
                                    <br>
                                    Fundação O Pão dos Pobres Santo Antônio
                            </div>
                    </div>
                    <div class="footer-container">
                            <p>
                                    Pão dos Pobres
                            </p>
                            <p class="contact-info">
                                    <a href="https://www.paodospobres.com.br" target="_blank" style="color: #ffa362; text-decoration: none;">www.paodospobres.com.br</a><br>
                                    Contato: (51) 3433-6900
                            </p>
                            <p class="auto-reply">
                                    Essa mensagem é gerada automaticamente, por favor não responda.
                            </p>
                    </div>
            </body>
            </html>
    `;
}

export function christmasTemplate(subject: string, name: string): string {
  return `
<!DOCTYPE html>
            <html lang="en">
            <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                    <title>${subject}</title>
                    <style>
                            @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&display=swap');
                            body {
                                    padding: 7% 0 0 4%;
                                    font-family: 'Manrope', Arial, sans-serif;
                                    line-height: 1.6;
                                    color: #2c5aa0;
                                    font-weight: 600;
                            }
                            .email-header {
                                    margin: 5% 0 5% 0;
                            }
                            .message-container {
                                    margin: 0 5% 5% 2%;
                            }
                            .email-body {
                                    font-size: 16px;
                                    text-align: justify;
                            }
                            .email-signature {
                                    margin-top: 10%;
                            }
                            .footer-container {
                                    margin: 0 0 5% 2%;
                                    margin-top: 20%;
                            }
                            .contact-info {
                                    font-size: 14px;
                                    color: #ffa362;
                            }
                            .auto-reply {
                                    font-size: 12px;
                                    color: #999;
                                    margin-top: 5%;
                            }
                    </style>
            </head>
            <body>
                    <div class="header">
                            <img class="logo" src="assets/logo.png" alt="Company Logo" style="max-width: 150px; margin-bottom: 20px;">
                            <h2 class="email-header">Feliz Natal, ${name}!</h2>
                    </div>
                 <div class="message-container">
                            <div class="email-body">
                                    <p>Que neste Natal o amor e a solidariedade estejam presentes em cada gesto e em cada coração. A Fundação Pão dos Pobres deseja a você e sua família paz saúde e alegria.</p>
                                    <p>Obrigado por apoiar a Fundação e construir novos futuros conosco!</p>
                            </div>
                            <div class="email-signature">
                                    Com carinho,
                                    <br>
                                    Fundação O Pão dos Pobres Santo Antônio
                            </div>
                    </div>
                    <div class="footer-container">
                            <p>
                                    Pão dos Pobres
                            </p>
                            <p class="contact-info">
                                    <a href="https://www.paodospobres.com.br" target="_blank" style="color: #ffa362; text-decoration: none;">www.paodospobres.com.br</a><br>
                                    Contato: (51) 3433-6900
                            </p>
                            <p class="auto-reply">
                                    Essa mensagem é gerada automaticamente, por favor não responda.
                            </p>
                    </div>
            </body>
            </html>
`;
}

export function birthdayTemplate(subject: string, name: string): string {
  return `
<!DOCTYPE html>
            <html lang="en">
            <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                    <title>${subject}</title>
                    <style>
                            @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&display=swap');
                            body {
                                    padding: 7% 0 0 4%;
                                    font-family: 'Manrope', Arial, sans-serif;
                                    line-height: 1.6;
                                    color: #2c5aa0;
                                    font-weight: 600;
                            }
                            .email-header {
                                    margin: 5% 0 5% 0;
                            }
                            .message-container {
                                    margin: 0 5% 5% 2%;
                            }
                            .email-body {
                                    font-size: 16px;
                                    text-align: justify;
                            }
                            .email-signature {
                                    margin-top: 10%;
                            }
                            .footer-container {
                                    margin: 0 0 5% 2%;
                                    margin-top: 20%;
                            }
                            .contact-info {
                                    font-size: 14px;
                                    color: #ffa362;
                            }
                            .auto-reply {
                                    font-size: 12px;
                                    color: #999;
                                    margin-top: 5%;
                            }
                    </style>
            </head>
            <body>
                    <div class="header">
                            <img class="logo" src="assets/logo.png" alt="Company Logo" style="max-width: 150px; margin-bottom: 20px;">
                            <h2 class="email-header">Feliz Aniversário, ${name}!</h2>
                    </div>
                 <div class="message-container">
                            <div class="email-body">
                                    <p>Hoje é um dia de celebração, e a Fundação Pão dos Pobres não poderia deixar de estar com você neste momento especial.</p>
                                    <p>Desejamos um aniversário repleto de saúde, alegrias e conquistas. Que sua vida seja marcada por esperança e realizações. Obrigado por apoiar a Fundação e construir novos futuros conosco!</p>
                            </div>
                            <div class="email-signature">
                                    Com carinho,
                                    <br>
                                    Fundação O Pão dos Pobres Santo Antônio
                            </div>
                    </div>
                    <div class="footer-container">
                            <p>
                                    Pão dos Pobres
                            </p>
                            <p class="contact-info">
                                    <a href="https://www.paodospobres.com.br" target="_blank" style="color: #ffa362; text-decoration: none;">www.paodospobres.com.br</a><br>
                                    Contato: (51) 3433-6900
                            </p>
                            <p class="auto-reply">
                                    Essa mensagem é gerada automaticamente, por favor não responda.
                            </p>
                    </div>
            </body>
            </html>
`;
}
