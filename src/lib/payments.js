export const start_year = 2015
export const start_month = 0
export const valueA = 1.00
export const valueB = 2.00
export const taxes = 0.00

export function Months(qty = 1, year = 2015, month = 0){

    const start = new Date(year, month), // enero 2015
    today = new Date(),
    monthsCharge = [],
    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    let current = new Date(start), count = 1

    while (
        current.getFullYear() < today.getFullYear() ||
        (current.getFullYear() === today.getFullYear() && current.getMonth() <= today.getMonth())
    ) {
        const year = current.getFullYear()
        const month = current.getMonth(), // 0-11
        item = {
            id: `${year}${String(month + 1).padStart(2, '0')}`,
            detail: `${months[month]} ${year}`,
            month: month + 1,
            year: year
        }
        if(count >= 1 && count <= 36){
            item.value = qty * valueA
        }else{
            item.value = qty * valueB
        }
        monthsCharge.push(item)
        count = count + 1
        current.setMonth(current.getMonth() + 1)
    }

    return monthsCharge

}