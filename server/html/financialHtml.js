let financialHtml = (year, earn, cost) => {
  earn = Math.round(earn/1000)
  cost = Math.round(cost/1000)

  return `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Отчет о финансовых показателях</title>
    </head>
    <style>
        body {
            margin: 0;
            padding: 0;
        }
    
        table {
            border-collapse: collapse;
            margin-left: 20px;
        }
    
        td, th {
            border: 1px solid black;
            padding: 10px;
        }
    </style>
    <body>
        <h1>Отчет о финансовых результатах (прибылях и убытках) за ${year} год</h1>
        <table>
            <thead>
                <th>Наименование показателя</th>
                <th>Значение</th>
            </thead>
            <tbody>
                <tr>
                    <td>Выручка</td>
                    <td>${earn}</td>
                </tr>
                <tr>
                    <td>Себестоимость продаж</td>
                    <td>${cost}</td>
                </tr>
                <tr>
                    <td>Валовая прибыль (убыток)</td>
                    <td>${earn - cost}</td>
                </tr>
                <tr>
                    <td>Прибыль (убыток) от продаж</td>
                    <td>${earn - cost}</td>
                </tr>
            </tbody>
        </table>
    </body>
    </html>
  `
}

module.exports = financialHtml
