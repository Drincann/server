module.exports = function getTodayStr() {
    function getDouble(number) {
        return number <= 9 ? '0' + number : number;
    }
    let today = new Date();
    return '' + today.getFullYear() + getDouble(today.getMonth()) +
        getDouble(today.getDate());
}