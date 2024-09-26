interface IProps {
  user: string;
  title: string;
  date: string;
  value: string;
  paymentMethod: string;
}

export function templateSendMail_1({
  user,
  title,
  value,
  date,
  paymentMethod,
}: IProps) {
  const template = `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        .email-header {
            background-color: #AAD42D;
            padding: 20px;
            color: #ffffff;
            text-align: center;
        }

        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }

        .email-footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #888888;
        }

        @media (max-width: 600px) {
            .email-container {
                width: 100%;
                padding: 10px;
            }

            .email-header,
            .email-body,
            .email-footer {
                padding: 15px;
            }
        }

        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .summary-table th, .summary-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #dddddd;
        }

        .summary-table th {
            background-color: #f4f4f4;
        }

        .summary-table td {
            background-color: #ffffff;
        }

        .highlight {
            color: #3498db;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>Confirmação de Recarga</h1>
        </div>

        <!-- Corpo do email -->
        <div class="email-body">
            <p>Olá ${user},</p>
            <p>Você realizou uma recarga de créditos com sucesso! Abaixo estão os detalhes da sua transação:</p>

            <table class="summary-table">
                <tr>
                    <th>Data da Recarga:</th>
                    <td>${date}</td>
                </tr>
                <tr>
                    <th>Valor da Recarga:</th>
                    <td class="highlight">${value}</td>
                </tr>
                <tr>
                    <th>Método de Pagamento:</th>
                    <td>${paymentMethod}</td>
                </tr>
            </table>

            <p>A recarga foi processada com sucesso, e seus créditos já estão disponíveis em sua conta. Se tiver dúvidas ou problemas com a transação, entre em contato com o suporte.</p>
            <p>Atenciosamente,<br>Equipe Rentskins</p>
        </div>
        <div class="email-footer">
            <p>Este é um e-mail automático, por favor, não responda.</p>
            <p>© 2024 Rentskins, Todos os direitos reservados.</p>
        </div>
    </div>
</body>



  `;

  return template;
}
