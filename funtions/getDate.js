const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const getDate = (now) => {
    const date = new Date(parseInt(now));
    return date.getDate() + ' / ' + months[date.getMonth()] + ' / ' + date.getFullYear();
}

export default getDate;